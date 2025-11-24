// primitive_type.ts
// function나 const가 js파트에서는 이름을 만들지만, type정의나 interface는 ts계층의 이름에 기여한다.
/*
    // Collection은 ts 영역에 있다 --> 형식
    type Collection = Person[]

    // printCollection운 js 영역에 있다 --> 값
    function printCollection(coll: Collection){
        console.log(...coll.entries)
    }
*/

import { PureComponent } from "react";

// 선언은 형식 네임스페이스나 값 네임스페이스에 기여한도고도 말한다. 형식 계층이 값 계층 위에 존재하므로 형식 계층에서는 값을 소비할 수 있지만, 반대는 불가능하다
    // 값
    const person = {
        name: "Stefan",
    };

    // 형식
    type Person = typeof person; // typeof는 아래의 값 계층을 이용해 형식 계층에서 사용할 수 있는 이름을 만든다

// 형식과 값을 동시에 만드는 형식 정의가 등장하면 당황스러울 것이다. 예를 들어 클래스는 ts에서는 형식으로, js에서는 값으로 동시에 사용할 수 있다.
// 이름 규칙을 알면 코드를 조금 더 이해하기 쉽다. 보통 '클래스, 형식, 인터페이스, 이넘'등은 첫 글자를 대문자로 표기한다.
// 이들은 값을 만드는 상황에서 동시에 형식에도 기여한다.
// 규칙을 그대로 따르자면 리액트 앱의 함수명을 대문자로 구현하는 상황이 발생한다
    // 선언
    class Person2{
        name: string;

        constructor(n: string){
            this.name = n;
        }
    }

    // 값으로 사용
    const person2 = new Person2("Stefan");

    // 형식으로 사용
    type Collection = Person2[];

    function printPersons(coll: Collection){
        // ...
    }

// 형식이란 무엇이며 값은 무엇이고 왜 이 둘을 분리해야 하는가> 왜 이들은 다른 프로그래밍 언어에서처럼 자연스럽게 동작하지 않는가?
// 문득 typeof 호출과 InstanceType 헬퍼 형식을 맞닥뜨리면서 클래스가 실제로는 두 형식에 기여하고 있음을 알게될 것이다. (11장 참고)
    type PersonProps = {
        name: string;
    }

    function Person3({name}: PersonProps){
        // ,,,
    }

    type PrintComponentProps = {
        collection: Person3[];
        //          ^- 'Person3'은(는) 값을 참조하지만, 여기서는 형식으로 사용되고 있습니다. 'typeof Person3'을(를) 사용하시겠습니까?ts(2749)
    }

// 클래스는 형식 네임스페이스의 이름에 기여하는데, ts는 구조적 형식 시스템이므로 모양이 같은 값은 해당 클래스의 인스턴스로 간주한다. 따라서 다음은 유효한 코드다
    class Person4 {
        name: string;

        constructor(n: string){
            this.name = n;
        }
    }

    function printPerson(person: Person4){
        console.log(person.name);
    }

    printPerson(new Person4("Stefan")); // true
    printPerson({name: "stefan"}); // true

// 하지만 값 네임스페이스에서 동작하는 instanceof 검사를 이용하면 객체의 모양과 같은 프로퍼티를 가졌을지 몰라도 클래스의 "실제 인스턴스"가 아니므로 동작하지 않는다
    function checkPerson(person: Person4){
        return person instanceof Person4;
    }

    printPerson(new Person4("Stefan")); // true
    printPerson({name: "stefan"}); // false

// 형식 네임스페이스와 값 네임스페이스 (표 2-1)
/*
    선언 형식 | 형식 | 값
    클래스    |  X  |  X
    이넘     |  X  |  X
    인터페이스 |  X  |  
    형식 별칭 |  X  |  
    함수     |     |  X
    변수     |     |  X
*/