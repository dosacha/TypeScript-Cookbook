"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printPerson(person) {
    console.log(person.name);
}
// 다음 오류는 생략
// #ts-expect-error
printPerson(123);
function printNumber(nr) {
    console.log(nr);
}
// v- Unused '@ts-expect-error' directive.ts(2578)
// @ts-expect-error
printNumber(123);
//# sourceMappingURL=1-4_2.js.map