// type_system.ts

import { findPackageJSON } from "module";

// 장난감 가게의 데이터 모델을 만든다고 가정
    type BoardGame = {
        name: string;
        price: number;
        quantity: number;
        minimumAge: number;
        players: number;
    };

    type Puzzle = {
        name: string;
        price: number;
        quantity: number;
        minimumAge: number;
        players: number;
    };

    type Doll = {
        name: string;
        price: number;
        quantity: number;
        minimumAge: number;
        meterial: string;
    };

    type ToyBase = {
        name: string;
        price: number;
        quantity: number;
        minimumAge: number;
    };

    function printToy(toy: ToyBase){
        // ...
    }

    const doll: Doll = {
        name: "Mickey Mouse",
        price: 9.99,
        quantity: 1000,
        minimumAge: 2,
        meterial: "plush",
    };

    printToy(doll); // 동작함

// 47 - printToy(doll) 에서 일부 정보를 잃어버린 채 오직 공통 프로퍼티만 출력된다.
// 유니온 형식으로 모든 장난감을 대표할 수 있다.
// 애너테이션이 있든 없든 ts는 각 값이 특정 형식과 호환되는지 확인한다. 객체라면 객체 형식에 정의된 추가 프로퍼트이 값도 여기에 포함된다.
// 추론 기능을 통해 추가 프로퍼티ㅇ값은 구조적 형식 시스템의 하위 형식으로 할당된다. 하위 형식의 값은 상위 형식 집합의 일부이기도 하다.
    // 유니온 Toy
    type Toy = Doll | BoardGame | Puzzle;

    function pruntToy2(toy: Toy){
        // ...
    }

// 기본형으로 어디에서나 유니온 형식을 만들 수 있다.
    function takesNumberOrString(value: number | string){
        //  ...
    }

    takesNumberOrString(2); // 동작
    takesNumberOrString("Hello"); // 동작

// 장난감 가게 코드에 ToyBase 프로퍼티가 반복되고 있다. 이를 각 유니온 파트의 기본으로 삼으면 더 좋을 것이다.
// 인터섹션 형식을 사용해 이를 해결한다.
    type ToyBase2 = {
        name: string;
        price: number;
        quantity: number;
        minimumAge: number;
    };

    type BoardGame2 = ToyBase2 & {
        players: number;
    };

    type Puzzle2 = ToyBase2 & {
        pieces: number;
    };

    type Doll2 = ToyBase2 & {
        meterial: string;
    };

// 유니온 형식이 합집합이라면 인터섹션 형식은 교집랍에 해당한다.
// 인터섹션 형식은 두 형식 모두에 있는 프로퍼티만 포함(하위 형식 포함)하므로 더 좁은 값의 집합이다.

// 이처럼 ts를 이용해 효과적인 데이터 모델을 만들 수 있을 뿐 아니라 ts는 추가 기능도 제공한다.
// ts에서는 리터럴값을 리터럴 형식으로 표현할 수 있다.
// 예를 들어 숫자 1이라는 형식을 정의할 수 있는데, 이는 오직 1이라는 값과 호환되는 방식이다.
    type One = 1;
    const one: One = 1;
    const two: One = 2; // 다른 값은 할당할 수 없음

// 여러 리터럴 형식을 유니온으로 만들 때 유니온 형식을 활용할 수 있다
// 예를 들어 Doll3 형식이 있다고 가정할 때 명시적으로 meterail 값을 설정할 수 있다.
    type Doll3 = ToyBase2 &{
        material: "plush" | "plastic";
    };

    function checkDoll(doll: Doll3){
        if(doll.material === "plush"){
            /// ...
        }else{
            /// ...
        }
    }