// primitive_type.ts

// 인터페이스와 형식 별칭의 표기법 차이
/*
    interface PersonAsInterface {
        name: string;
        age: number;
        address: string[];
        greet(): string;
    }
    type PersonAsType = {
        name: string;
        age: number;
        address: string[];
        greet(): string;
    };
*/

// 인터페이스는 선언 합치기를 지원하지만, 형식 별칭은 지원하지 않는다.
// 선언 합치기를 이용하면 인터페이스를 선언한 이후에도 프로퍼티를 추가할 수 있다.
// Person은 {name: string; age: number;}
/*
    interface Person {
        name: string;
    };

    interface Person {
        age: number;
    };    
*/

// 하지만 어떤 
// 웹 폼에서 수집한 데이터
interface FormData{
    name: string;
    age: number;
    address: string[];
}

// 이 데이터를 백엔드로 전송하는 함수
function send(data: FormData) {
    console.log(data.entries()); // 컴파일됨!
    // 하지만 런타임에 예상치 못한 충돌 발생
}