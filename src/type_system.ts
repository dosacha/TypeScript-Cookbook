// type_system.ts

import type { Dir } from "fs";

// 열거형은 js의 문법적 확장이다.
// 즉, 열거형은 형식 시스템 수준에서 동작할 뿐 아니라 js코드도 추가한다
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));

// enum을 const enum으로 정의하면 ts는 이를 실젯값으로 대치하며, 코드가 생성되지 않도록 한다.
    const enum Direction{
        Up,
        Down,
        Left,
        Right,
    };
    // const enum을 사용하면 ts는 move(Direction.Up)를 다음처럼 변환한다
    move(0 /*Direction.Up*/);

// 기본적으로 ts의 열거형은 숫자이며 0부터 시작하는 숫자를 자동으로 할당받는다
    // 기본값
    enum Direction{
        Up, // 0
        Down, // 1
        Left, // 2
        Right, // 3
    };

    enum Direction{
        Up = 1, // 1
        Down, // 2
        Left, // 3
        Right = 5, // 5
    };

// 숫자 열거형은 숫자 유니온 형식과 같은 집합을 정의한다
    type Direction = 0|1|2|3;

// 하지만 유니온 형식은 오직 정의된 숫자만 허용하지만, 숫자 열거형은 '모든' 값을 할당하도록 허용한다
    function move(direction: Direction){ /* ... */ }
    move(30); // 문제없음

// 이런 특징을 이용해 숫자 열거형으로 플래그를 구현할 수 있다
    enum Traits {
        None,
        Friendly = 1,
        Mean = 1 << 1,
        Funny = 1 << 2,
        Boring = 1 << 3,
    }

    let aPersonsTraits = Traits.Mean | Traits.Funny;

    if((aPersonsTraits & Traits.Mean) === Traits.Mean) { /* ... */ }
    // 이런 상황에서 컴파일러가 허용된 값을 쉽게 확인할 수 있도록 ts는 숫자 열거형의 호환값을 number 전체로 확장한다

// 문자열 열거형을 정의할 때는 각 항목을 문자열로 직접 정의해야 하며 자동으로 값을 할당할 수 없다
    enum Status {
        Admin = "Admin",
        User = "User",
        Moderator = "Moderator",
    };

// 문자 열거형에서는 모든 문자열 집합을 허용할 수 없다
    function closeThread(threadId: number, status: Status){ /* ... */ }
    closeThread(10, "Admin");
    //               ^-- '"Admin"' 형식의 인수는 'Status' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
    closeThread(10, Status.Admin) // 동작함

// ts의 다른 형식과 달리 문자 열거형은 '명목상 형식'이다. 따라서 값 집합이 같은 두 열거형은 호환되지 않는다
    enum Status {
        Admin = "Admin",
        User = "User",
        Moderator = "Moderator",
    };

    enum Roles {
        Admin = "Admin",
        User = "User",
        Moderator = "Moderator",
    }

    function closeThread(threadId: number, status: Status){ /* ... */ }

    closeThread(10, Roles.Admin);
    //              ^- 'Roles.Admin' 형식의 인수는 'Status' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)

// 객체와 이름을 갖는 식별자를 포함한 열거형으로 코드를 구현할 때는 
// 'const'객체와 'Values'헬퍼 형식을 사용하면 "훨씬" js와 비슷한 결과를 만들 수 있다
    const Direction = {
        Up: 0,
        Down: 1,
        Left: 2, 
        Right: 3,
    } as const;

    // Direction의 상숫값 얻기
    type Direction = (typeof Direction)[keyof typeof Direction];

    // (typeof Direction)[keyof typeof Direction]는 0|1|2|3 값 방출
    function move(direction: Direction) { /* ... */ }

    move(30); // 오류
    move(0); // 동작함
    move(Direction.Left); // 동작함

    // type Direction = (typeof Direction)[keyof typeof Direction];
    // 위의 이 행은 조금 특이한 동작이 일어난다.
        // - 이름과 같은 값으로 형식을 선언했다. ts에서는 값과 형식 네임스페이스가 구분된다
        // - typeof를 이용해 Direction의 형식을 얻는다. Direction은 const컨텍스트에 존재하므로 리터럴 형식을 얻는다.
        // - Direction의 형식 자체 키로 Direction에 인덱스를 추가했는데, 이때 객체의 오른쪽 값은 0,1,2,3이 된다. 이는 숫자 유니온 형식이다.

    // 유니온 형식을 이용하면 깜짝 놀랄 일은 일어나지 않는다.
        // - 출력 결과 코드가 무엇인지 알 수 있다
        // - 누군가 문자열 열거형을 숫자 열거형으로 바꾼다고 해서 동작까지 바뀌지 않는다
        // - 필요한 곳에 형식 안정성을 갖췄다
        // - 열거형으로 제공했던 것과 같은 규칙을 동료와 사용자에게 제공한다

/*
    열거형을 현명하게 사용하고 한계를 이해하자. 
    열거형은 기능 플래그를 정의하거나 값 대신 이름을 가진 상수 집합을 사용하도록 유도하는 상황에서 유용하다
    const를 붙이지 않은 열거형은 중복 코드의 크기를 늘릴 수 있으므로, const 열거형을 사용하는 편이 좋다
 */