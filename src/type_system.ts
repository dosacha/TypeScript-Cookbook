// type_system.ts

import { futimesSync } from "fs";

// JS의 void
// 1. void는 옆에 등장하는 표현식이 undefined를 반환하도록 평가한다.
// 2. 정의와 동싱에 실행되는 함수를 호출할ㄷ 때 void를 활용한다
// 3. void는 항상 undefined를 반환하며 옆의 식을 평가하므로 값을 반환하지 않고 콜백을 호출하는 함수를 반환하도록 할 수 있다.

// ts의 void는 undefined의 하위 형식이다.
// js의 함수는 항상 무언가를 반환한다. 명시적으로 값을 반환하든지 암묵적으로 undefined를 반환하는 식이다.
    function iHaveNoReturnValue(i){
        console.log(i);
    }

    let check = iHaveNoReturnValue(2);
    // check는 undefined

    type Fn = typeof iHaveNoReturnValue;
    // type Fn = (i: any) => void

// 매개변수나 그 밖의 다른 모든 선언에도 void를 형식으로 사용할 수 있다. 
// 그러면 오직 undefined만을 유효한 값으로 받는다.
    function iTakeNoParameters(x: void): void{
        iTakeNoParameters(); // 동작함
        iTakeNoParameters(undefined) // 동작함
        iTakeNoParameters(void 2) // 동작함
    }

// void와 undefined는 아주 많이 비슷하지만 중요한 차이점이 존재한다.
// 반환 형식으로 사용한 void는 다른 형식으로 치환할 수 있으므로 추가 콜백 패턴읋 활용할 수 있다.
// 예시로 fectch 함수는 숫자 집합을 받아 결과를 콜백 함수의 매개변수로 전달한다.
    function fetchResults(
        callback: (statusCode: number, results: number[]) => void
    ){
        // ...
        callback(200, results);
    }

// callback 함수와 호환되는 인수를 fecthResults의 callback 함수로 설정해 호출할 수 있다.
    function normalHandler(statusCode: number, results: number[]): void{
        // ...
    }

    fetchResults(normalHandler);

// 반환 형식을 void로 설정하면 반환 형식이 조금 더 구체적인 다양한 함수를 이용할 수 있다.
    function handler(statusCode: number): boolean{
        // ...
        return true;
    }

    fetchResults(handler); // 문제없이 컴파일됨

// 코드는 컴파일 되지만 다음처럼 함수 시그니처가 일치하지 않는다.
// 첫째, 시그니처에 더 짧은 인수 목록을 제공할 수 있다.
// : js는 초과 매개변수가 있어도 함수를 호출하는 데 문제가 없으며, 이들을 그저 무시한다. 필요한 매개변수보다 더 많은 매개변수를 유지할 필요가 없기 때문이다.
// 둘째, 반환 형식은 boolean이지만 ts는 여전히 이 함수를 전달한다.
// : 이 상황에 void 형식을 이용하면 조금 더 편리하다. fetchResults는 콜백을 호출할 때 반환값을 기대하지 않는다. 따라서 형식 시스템의 입장에서 콜백의 반환값은 여전히 undefined다.

// 형식 시스템이 반환값을 사용하지 못하게 하는 한 코드는 안전하다.
    function fetchResults2(
        callback: (statusCode: number, results: number[]) => void
    ){
        // ...
        const didItWork = callback(200, results);
        // didItWork는 boolean 'handler'이지만
        // 형식 시스템 입장에서는 'undefined'다
    }

// 덕분에 반환 형식이 다양한 콜백을 전달할 수 있다. 콜백이 무언가를 반환하더라도 이는 사용되지 않으며 void로 전달된다.
// 콜백 함수로부터 반환값이 필요 없는 상황이라면 무엇이든 콜백으로 사용할 수 있다.
// ts는 이를 "대체성"이라 부르며, 의미상 문제가 없다면 무언가를 다른 것으로 대체할 수 있는 능력을 가리킨다.