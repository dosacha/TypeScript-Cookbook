// type_system.ts
type Circle = {
    radius: number;
    kind: "Circle";
};

type Square = {
    x: number;
    kind: "Square";
};

type Triangle = {
    x: number;
    y: number;
    kind: "Triangle";
};

type Shape = Circle | Square | Triangle;

// ts에서 리터럴 형식은 특정 값을 가리킬 수 있을 뿐 아니라 형식 시스템의 기능에 중요한 기여를 한다.
// let이나 const로 기본 형식의 값을 할당할 때 이 점이 명확하게 드러난다.

// let, const로 선언한 변수에 값을 두 번 할당하면 ts는 이를 두 가지 다른 형식으로 추론한다.
// let을 사용했다면 ts는 기본형을 넓히는 방향으로 추론한다.
    let name = "Stefan"; // name은 문자열
// const를 사용했다면 ts는 정확히 해당 리터럴 형식을 추론한다.
    const name2 = "Stefan"; // name은 "Stefan"

// 객체 형식에서는 상황이 조금 달라진다.
// let과 const 모두 넓히는 방향으로 형식을 추론한다.
    let person = {name: "Stefan"}; // {name: string}
    const perason2 = {name: "Stefan"}; // {name: string}

// 이는 js의 동장 방식과 관련이 있다. js는 객체를 상수로 바인딩했으며 이는 person을 다시 할당할 수 없는 의미다.
// 하지만 여전히 객체의 프로퍼티는 바꿀 수 있다.
    const perason3 = {name: "Stefan"};
    perason3.name = "Not Stefan"; // 동작함

// js가 어떻게 동작하는지를 생각해보면 이는 이치에 맞는다. 
// 다만, 데이터 모델을 정교하게 처리하고 싶은 상황에서 문제가 야기될 수 있다.
// 데이터에 리터럴을 사용하면 ts는 넓은 집합을 추론하는데, 그러면 정의한 형식과 호환되지 않는 값을 허용하게 된다.
    function area(shpae: Shape){
        // ...
    }

    const Circle = {
        radius: 2,
        kind: "Circle",
    };

    area(Circle);
    //   ^- '{ radius: number; kind: string; }' 형식의 인수는 'Shape' 형식의 매개 변수에 할당될 수 없습니다.
    //      '{ radius: number; kind: string; }' 형식은 'Circle' 형식에 할당할 수 없습니다.
    //      'kind' 속성의 형식이 호환되지 않습니다.
    //      'string' 형식은 '"Circle"' 형식에 할당할 수 없습니다.ts(2345)

// 문제 해결 방법
// 1. 형식을 식별하도록 명시적으로 애너테이션을 사용
    // 정확한 형식
    const circle2: Circle = {
        radius: 2,
        kind: "Circle",
    };
    area(circle2);

    // 넓힌 집합
    const circle3: Shape = {
        radius: 2,
        kind: "Circle",
    };
    area(circle3);
// 2. 형식 애너테이션 대신 할당문 끝에 형식 어서션을 추가
    // 형식 어서션
    const circle4 = {
        radius: 2,
        kind: "Circle",
    } as Circle;
    area(circle4);

    // 하지만 더 많은 정보를 포함하는 리터럴을 서로 다른 장소애서 다른 의미로 사용할 때 애너테이션으로는 제한이 생길 수 있다.
    // 그럴 때 어서션을 더 정교하게 활용하여 전체 객체가 아닌 각 프로퍼티를 특정 형식으로 특정한다.
    const circle5 = {
        radius: 2,
        kind: "Circle" as "Circle",
    };
    area(circle5);
// 3. const 컨텍스트를 이용해 정확한 값을 특정
    const circle6 = {
        radius: 2,
        kind: "Circle" as const,
    };
    area(circle6);
    // 이 떄 const 컨텍스트를 전체 객체에 사용하면 객체는 읽기 전용이 되므로 바꿀 수 없게 되므로 주의해야 한다.

