"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printPerson(person) {
    // 말이 되지 않는 코드지만 any로 컴파일을 통과할 수 있다.
    console.log(person.gobbleydegook);
}
// 이 코드도 말이 되지 않지만 any를 사용하면 컴파일은 통과한다.
printPerson(123);
//# sourceMappingURL=1-4_1.js.map