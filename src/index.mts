// index.mts
import person = require("./person.cjs"); // 확장자 추가로 CommonJS와 SCMAScript 두 모듈 모두에서 동작.
person.printPerson({name: "Stefan", age: 40});