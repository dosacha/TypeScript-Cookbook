// 1-4_2.ts
import type { Person } from "../@types/person";

function printPerson(person: Person){
    console.log(person.name);
}

// 다음 오류는 생략
// #ts-expect-error
printPerson(123);

function printNumber(nr: number){
    console.log(nr);
}

// v- Unused '@ts-expect-error' directive.ts(2578)
// @ts-expect-error
printNumber(123);
