// type_system.ts
type Dice = 1|2|3|4|5|6;

// 아래 함수의 연산 결과는 number인데 이는 범위가 넓다
    function rollDice(): Dice{
        let num = Math.floor(Math.random()*6) + 1;
        return num;
    // ^ 'number' 형식은 'Dice' 형식에 할당할 수 없습니다.ts(2322)
    }

// number는 Dice에서 허용하는 것보다 더 많은 수를 포함하므로 함수 시그니처에 애너테이션을 추가한다고 해서 형식이 좁혀지진 않는다.
// 이 방법은 형식 넓히기(즉, 상위형식)에만 적용되기 때문이다
    function asNumber(dice: Dice): number{
        return dice;
    }

// 대신 형식 찬반형에서처럼 어서션으로 예상보다 형식을 좁힐 수 있다
    function rollDice2(): Dice {
        let num = Math.floor(Math.random() * 6) +1;
        return num as Dice;
    }

// 형식 찬반형과 마찬가지로 형식 어서션은 추론된 형식의 상위 형식으로만 동작한다.
// 값은 더 넓은 사우이 형식이나 좁은 하위 형식으로 설정할 수 있으나 ts는 집합을 바꾸도록 허용하진 않는다.
    function asString(num: number): string{
        return num as string;
    //        ^- 'number' 형식을 'string' 형식으로 변환한 작업은 실수일 수 있습니다. 두 형식이 서로 충분히 겹치지 않기 때문입니다. 의도적으로 변환한 경우에는 먼저 'unknown'으로 식을 변환합니다.ts(2352)
    }

// 객체의 프로퍼티를 모을 때도 어서션이 등장한다.
    type Person = {
        name: string;
        age: number;
    };

    function createDemoPerson(name: string) {
        const person = {} as Person;
        person.name = name; person.age = Math.floor(Math.random() * 95);
        return person;
    }

// 프로퍼티를 설정하는 일은 잊어버릴 수 있으며 이런 일이 일어나도 ts는 아무 경고도 하지 못하므로 이는 "안전하지 않은" 동작이다.
// 심지어 Person이 바뀌고 더 많은 프로퍼ㅏ티가 생겨도 이와 관련한 아무 소식도 듣지 못한다.
    type Person2 = {
        name: string;
        age: number;
        profession: string;
    };

    function createDemoPerson2(name: string) {
        const person = {} as Person;
        person.name = name; person.age = Math.floor(Math.random() * 95);
        // progession은 어디에?
        return person;
    }

// 이런 상황에서는 "안전하게" 객체를 만드는 방법을 선택하는 편이 좋다.
// 모든 것에 애너테이션을 추가할 수 ㅇ맀으므로 모든 필수 프로퍼티를 설정하도록 강제한다.
    function createDemoPerson3(name: string) {
        const person: Person = {
            name,
            age: Math.floor(Math.random() * 95),
        };
        return person;
    }

// 형식 어서션보다 형식 애너테이션이 더 안전하지만 rollDice처럼 어쩔 수 없는 상황도 있다.
// 다른 ts 시나리오에서는 다른 선택을 할 수 있겠지만, 애너테이션을 할 수 있는 상황에도 형식 어서션을 선호할 수 있다.
// 예를 들어, fetch API를 사용해 JSON 데이터를 가져오는 상황에서 fetch를 호출한 다음 애너테이션된 형식에 결과를 할당한다.
    const ppl: Person[] = await fetch("/api/people").then((res) => res.json());

// res.json()의 결과는 any이며, any는 형식 애너테이션을 이용해 다른 모든 형식으로 바꿀 수 있다.
// 결과가 Person[]라는 보장은 할 수 없다. 결과를 Person[]으로 어서션해 형식을 구체화하도록 이 코드를 다시 구현한다
    const ppl2 = await fetch("/api/people").then((res) => res.json()) as Person[];

// 형식 시스템의 입장에서는 같은 의미지만 문제가 생겼을 때 이 코드를 이용하면 더 쉽게 문제의 위치를 파악할 수 있다.
// "/api/people"의 모델이 바뀌면 어떻게 될까? 애너테이션만 이용했다면 이런 상황에서 발생하는 문제를 빨리 파악하기 어렵다.
// 여기서 어서션은 "안전하지 않은" 동작이 있음을 가리킨다.