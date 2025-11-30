// type_system.ts

// 아래 상황에서는 area함수는 어려움 없이 형식을 구별한다.
type Circle = {
    radius: number;
};

type Square = {
    x: number;
};

type Triangle = {
    x: number;
    y: number;
};

type Shape = Circle | Square | Triangle;

function area(shape: Shape){
    if("radius" in shpae){
        // ...
    }else if("y" in shape){
        // ...
    }else{
        // ...
    }
}

// 하지만  Rectangle에 필요한 프로퍼티가 Trinanlge의 프로퍼티와 같아서 문제가 발생한다.
// 이런 상황에서는 유니온의 구성요소를 특정하기가 어렵다.
type Circle2 = {
    radius: number;
};

type Square2 = {
    x: number;
};

type Triangle2 = {
    x: number;
    y: number;
};

type Rectangle = {
    x: number;
    y: number;
};

type Shape2 = Circle2 | Square2 | Triangle2 | Rectangle;

// 다음처럼 kind 프로퍼티를 모델에 추가하고 구성요소를 식별하는 "명확한" 리터럴 형식을 할당한다
// 이 기법을 '구별된 유니온 형식'이라 부르며, 이를 활용해 유니온 형식의 각 구성요소를 명확하게 구별할 수 있다.
type Circle3 = {
    radius: number;
    kind: "Circle";
};

type Square3 = {
    x: number;
    kind: "Square";
};

type Triangle3 = {
    x: number;
    y: number;
    kind: "Triangle";
};

type Rectangle2 = {
    x: number;
    y: number;
    kind: "Retangle";
};

type Shape3 = Circle3 | Square3 | Triangle3 | Rectangle2;

function area2(shape: Shape3){
    switch(shape.kind){
        case "Circle":
            // ...
            break;
        case "Square":
            // ...
            break;
        case "Triangle":
            // ...
            break;
        case "Retangle":
            // ...
            break;
        default:
            throw Error("not possible");
    }
}