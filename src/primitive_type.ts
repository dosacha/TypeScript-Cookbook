// primitive_type.ts
const me: any = "Stefan"; // 좋음!
const name: string = me; // 시스템상 문제는 없지만 나쁨.
const age: number = me;

type Person = {
    name: string;
    age: number;
};

function printPerson(person: Person){
    for(let key in person){
        console.log(`${key}: ${person[key]}`);
        // 'string'형식은 'Perosn'의 ----^
        // 인덱스 형식으로 사용할 수 없으므로, key는 암묵적으로 'any' 형식임. (7053)
    }
}

// any로 형식 검사를 잠시 중단.
function printPerson2(person: any){
    for(let key in person){
        console.log(`${key}: ${person[key]}`);
    }
}

// ts의 제한과 형식 어서션을 이용해 올바른 형식을 추가.
function printPerson3(person: Person){
    for(let key in person){
        console.log(`${key}: ${person[key as keyof Person]}`);
    }
}