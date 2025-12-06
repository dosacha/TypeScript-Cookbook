// type_system.ts

// js와 ts의 catch 구문을 지정하는 방법에는 큰 차이가 있다.
// 예를 들어, 특정 오류를 잡으려 하면 ts는 오류를 일으킨다.

// Axios를 사용해서 어떻게 이런 문제가 발생하는지 알아보자
import { rejects } from 'assert';
import axios, { AxiosError } from 'axios';
import { platform } from 'os';
    try{
        // Axios 같은 유명한 라브러리로 필요한 작업 수행
    }catch(e: AxiosError){
        //    ^^^^^^^^^^^ 지정한 경우 catch 절 변수 형식 주석은 'any' 또는 'unknown'이어야 합니다.ts(1196)
    }

// 이처럼 동작하는 몇 가지 이유가 있다

// 1. 모든 형식을 던질 수 있음(js에서는 모든 표현식을 던질 수 있다.)
// 모든 유효한 값을 던질 수 있으므로 catch에서 받을 수 있는 값은 이미 Error의 하위 형식보다 넓게 설정된다.
    throw "What a weird error"; // 동작함
    throw 404; // 동작함
    throw new Error("What a weird error"); // 동작함

// 2. js에서는 오직 한 개의 catch 구문만 추가할 수 있음
// js에서는 try구문 하나에 오직 한 개의 catch 구문을 추가할 수 있다,
// 모든 가능한 값을 던질 수 있으며 try 구문당 한 개의 catch 구문만 추가할 수 있으므로 e의 형식 범위는 정말 넓다.
    try{
        myroutine(); // 다양한 오류가 여기서 발생
    } catch (e) {
        if (e instanceof TypeError) {
            // TypeError
        } else if (e instanceof RangeError) {
            // RangeError
        } else if (e instanceof EvalError) {
            // EvalError
        } else if (typeof e === "string") {
            // 문자열 오류
        } else if (axios.isAxiosError(e)) {
            // axios가 자동으로 오류 검사를 해주지는 않는다
        } else {
            // 그 밖의 조건
            logMyErrors(e);
        }
    }

// 3. 어떤 예외든 발생할 수 있음
// 어떤 오류든 발생할 수 있다면 '던질 수 있는' 모든 값의 유니온 형식을 만들면 어떨끼? >> 이론적으론 가능하지만, 사실 현재로서 예외의 형식을 알 수 없다.
// 사용자 정의 예외와 오류 이외에 시스템이 던지는 오류도 있다. (형식이 불일치하거나 한 함수가 undefined일 때)
// 가능한 값은 많고 catch 구문은 하나뿐이며 발생할 수 있는 오류도 많으므로 e의 형식은 any와 unknown 두 가지 후보로 좁혀진다.
// Promise를 거절할 때는 모든 이유가 적용된다. ts에서는 Promise가 실현되었을 때만 형식을 지정할 수 있다.
    const somePromise = () =>
        new Promise((fulfil, reject) => {
            if(someConditionIsValid()) {
                fulfil(42);
            } else {
                reject("Oh no!");
            }
        });
    
    somePromise()
    .then((val) => console.log(val)) // val은 number
    .catch((e) => console.log(e)); // 어떤 형식이든 가능함

// 같은 Promise를 async/wait 흐름에서 호출하면 조금 더 명확해진다
        try {
            const z = await somePromise(); // z는 number
        } catch(e) {
            // 마찬가지로 e는 어떤 형식이든 가능함
        }

// 자신만의 오류를 정의해서 잡고 싶다면 오류 클래스를 구현한 다음 instanceof 검사를 수행하거나 특정 프로퍼티를 검사하는 헬퍼 함술르 만들어 형식 찬반형으로 올바른 형식을 확인할 수 있다.
// Axios의 좋은 예
        function isAxiosError(payload: any): payload is AxiosError {
            return payload !== null && typeof payload === 'object' && payload.isAxiosError;
        }