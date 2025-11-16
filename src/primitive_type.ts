// primitive_type.ts

Object.create(2);
// TypeError 발생: Object 프로퍼티는 반드시 Object거나 null이어야 함.
// Funection.create(<anonymous>)의 2

let obj: {}; // Object와 비슷함
obj = 32;
obj = "Hello";
obj = true;
obj = () => { console.log("Helto") };
obj = undefined; // 오류
obj = null; // 오류
obj = { name: "Stefan", age: 40 };
obj = [];
obj = /.*/;

let okObj: {} = {
    toString() {
        return false;
    }
}; // OK

let obj: Object = {
    toString() {
        return false;
    }
//  ^- '() => boolean' 형식은 '() => string' 형식에 할당할 수 없습니다.
//   'boolean' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
};
