// type_system.ts

// 관리하는 모든 웹사이트의 성능을 평가한다고 가정하자.
// 다음처럼 성능 지표를 모은 다음 도메인명으로 그룹화한다
    const timings = {
        "fettblog.eu": {
            ttfb: 300,
            fcp: 1000,
            si: 1200,
            lcp: 1500,
            tti: 1100,
            tbt: 10,
        },
        "typescript-cookbook.com": {
            ttfb: 400,
            fcp: 1100,
            si: 1100,
            lcp: 2200,
            tti: 1100,
            tbt: 0,
        }
    }

// 주어진 지표에서 타이밍값이 가장 작은 도메인을 찾으려면 모든 키를 루프로 반복하면서 각 지표 항목을 비교하는 함수를 만들어야 한다.
    function findLowestTiming(collection, metric) {
        let result = {
            domain: "",
            value: Number.MAX_VALUE,
        };
        for (const domain in collection) {
            const timing = collection[domain];
            if(timing[metric] < result.value) {
                result.domain = domain;
                result.value = timing[metric];
            }
        }
        return result.domain;
    }

// 적절하게 함수에 형식을 추가해 불필요한 지표 자료를 전달하지 않도록 한다
    type Metrics = {
        // 최초 바이트까지 걸린 시간
        ttfb: number;
        // 최초의 만족스러운 페인트
        fcp: number;
        // 속도 인덱스
        si: number;
        // 가장 큰 페인트
        lcp: number;
        // 상호 동작 시간
        tti: number;
        // 총 블록 시간
        tbt: number;
    };

// 키 집합으로 구성된 자료의 모양을 정의하기는 쉽지 않으므로 ts는 "인덱스 시그니처"라는 도구를 제공한다
// ts에 어떤 프로퍼티명이 있는지 모르지만, string 형식이 존재한다고 알리며 이는 Metrics를 가리킴을 지시한다.
    type MetricCollection = {
        [domain: string]: Timings;
    };

// 이제 findLowestTiming의 형식을 지정한다. 컬렉션의 형식을 MetricCollection으로 지정했으며 Metrics의 키를 두 번째 매개변수로 전달한다
    function findLowestTiming2(
        collection: MetricCollection,
        key: keyof Metrics
    ): string {
        let result = {
            domain: "",
            value: Number.MAX_VALUE,
        };
        for (const domain in collection) {
            const timing = collection[domain];
            if(timing[key] < result.value) {
                result.domain = domain;
                result.value = timing[key];
            }
        }
        return result.domain;
    }

// 코드는 잘 동작하지만 약간 문제가 있다.
// ts는 모든 문자열의 프로파티를 읽도록 허용하지만 프로퍼티를 실제 이용할 수 있는지는 검사해주지 않으므로 주의하자.
    const emptySet: MetricCollection = {};
    let timing = emptySet["typescript-cookbook.com"].fcp * 2; // 형식 오류 발생하지 않음!

// 인덱스 시그니처를 Metrics나 undefined로 정의하는 편이 더 현실적인 표현 방법이다.
// 이는 모든 가능한 문자열을 인덱스하지만 이때 값이 없을 수도 있음을 가리키기 때문이다.
    type MetricCollection2 = {
        [domain: string]: Metrics | undefined;
    };

    function findLowestTiming3(
        collection: MetricCollection2,
        key: keyof Metrics
    ): string {
        let result = {
            domain: "",
            value: Number.MAX_VALUE,
        };
        for (const domain in collection) {
            const timing = collection[domain]; // Metrics | undefined
            // undefined 값에 대응한 추가 검사
            if(timing && timing[key] < result.value) {
                result.domain = domain;
                result.value = timing[key];
            }
        }
        return result.domain;
    }

// Metrics나 unedfined 값은 사라진 프로퍼티와는 다르지만 상황이 완전 다르지는 않다.
// domain을 string으로 설정하지 말고 "매핑된 형식"이라 불리는 일종의 string 하위 집합으로 설정하므로 ts에 키가 선택형임을 지시할 수 있다
    type MetricCollection3 = {
        [domain in string]?: Metrics;
    };

// string, number, symbol, 매핑된 형식을 포함한 이들의 모든 하위 형식을 "인덱스 시그니처" 정의에 사용할 수 있다.
    type Thorws = {
        [x in 1|2|3|4|5|6]: number;
    }

// 형식에 프로퍼티도 추가할 수 있다.
    type ElementCollection = {
        [y: number]: HTMLElement | undefined;
        get(index: number): HTMLElement | undefined;
        length: number;
        filter(csllback: (element: HTMLElement) => boolean): ElementCollection;
    }

// 인덱스 시그니처와 다른 프로퍼티를 합쳤다면 인덱스 시그니처를 넓힌 집합이 특정 프로퍼티의 형식을 포함해야 한다.
// 앞선 예제에서 number 시그니처와 다른 프로퍼티 string 키 사이에 겹치는 부분이 없다.
// 하지만 문자열을 string으로 매핑하는 인덱스 시그니처를 정의한 다음 number 형식의 count 프로퍼티를 정의하면 오류가 일어난다.
// >>> 'count' 자체가 string 형식이기에 string키로써 취급이 된다. 따라서 count키에 :string값이 와야만 한다.
    type StringDictionary = {
        [index: string]: string;
        count: number;
    //  ^- 'count' 형식의 'number' 속성을 'string' 인덱스 유형 'string'에 할당할 수 없습니다.ts(2411)
    }

// 이 오류를 없애려면 모든 프로퍼터이의 형식을 허용하도록 인덱스 시그니처의 형식을 넓혀야 한다.
// 이렇게 count는 인덱스 시그니처와 프로퍼티 형식 모두의 하위 집합이다.
type StringDictionary2 = {
        [index: string]: string|number;
        count: number; // 동작함.
    };

// 인덱스 시그니처 [index: number] 는 “number 키뿐 아니라 string 키도 포함”한다.
// 왜냐하면 JS 객체는 결국 숫자 키도 string 으로 저장되기 때문이다.
// 즉, TS 입장에서 다음 두 가지는 둘 다 number 인덱스 시그니처의 대상이다:

    type StringDictionary3 = {
        [index: number]: string;
        "1": string;
    }

    type StringDictionary4 = {
        [index: number]: string;
        1: string;
    }

// JS 객체는 숫자 키도 string으로 저장되기에 아래 타입도 정상적으로 작동한다.
    type StringDictionary5 = {
        [index: string]: string;
        1: string;
    }

    type StringDictionary6 = {
        [index: string]: string;
        "1": string;
    }

    // 요약
    // - string 인덱스 시그니처: 숫자 키 + 모든 string 키 포함  ( TS는 JS의 “숫자 키는 내부적으로 string으로 저장된다”는 규칙을 알고 있기 때문 )
    // - number 인덱스 시그니처: 숫자 키 + 숫자 모양의 string 키 포함 ( number 인덱스로 접근 가능한 string 키는 number 인덱서 규칙에 포함 )