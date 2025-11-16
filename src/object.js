// object.js

// 객체 사용
const person = {
    name: "Stefan",
    age: 40,
};

const {name, age} = person;

console.log(name);
console.log(age);

const {anotherName = name, anotheAge = age} = person;
console.log(anotherName);
console.log(anotheAge);