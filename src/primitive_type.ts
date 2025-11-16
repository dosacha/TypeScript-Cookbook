// primitive_type.ts

// 형식 추론
let aNumber = 2;
// aNumver: number

// 형식 애너테이션
let anotherNumber: number = 3;
// anotherNumber: number

type Person = {
    name: string;
    age: number;
};

type User = {
    name: string;
    age: number;
    id: number;
};

// 추론됨!
// 반환 형식은 { name: string, age: number };
function createPerson(): Person {
    return{ name: "Stefan", age: 39};
}

// 애너테이션 사용! 형식이 호환되는지 검사해야 함
function printPerson(person: Person){
    console.log(person.name, person.age);
}

const user: User = {
    name: "Stefan",
    age: 40,
    id: 815,
};

// 추론됨!
const me: Person = createPerson();

// 모두 동작함
printPerson(me);
printPerson(user);

