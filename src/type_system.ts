// type_system.ts
type Circle = {
    radius: number;
    kind: "Circle";
};

type Square = {
    x: number;
    kind: "Square";
};

type Triangle = {
    x: number;
    y: number;
    kind: "Triangle";
};

type Rectangle = {
    x: number;
    y: number;
    kind: "Retangle";
};

type Shape = Circle | Square | Triangle | Rectangle;

// 모든 가능한 옵션을 확인한 다음에 default 케이스에서 오류를 던지는데, 코드의 형식이 제대로 동작한다면 이 오류가 발생하지 않는다.
// 형식 시스템조차도 default 케이스는 불가능함을 알려준다. default케이스에 shape를 추가한 다음 그 위로 마우스를 대보면 ts는 shpae의 형식이 never라고 알려준다.
// never는 흥미로운 형식이다. never는 ts의 '바닥 형식'으로, 형식 계층의 가장 아래에 위치한다.
// 어떤 값이 never라면 이는 오류가 발생했다는 의미다.
    function area(shape: Shape){
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
                console.error("Shape not defined:", shape); // shape는 never
                throw Error("not possible");
        }
    }

// ts는 모든 시점에 특정 값의 형식을 정확하게 파악한다.
// default 분기에서 shpae는 Rectangle 형식일 수밖에 없다.
    function area2(shape: Shape){
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
            default:
                console.error("Shape not defined:", shape); // shape는 Rectangle
                throw Error("not possible");
        }
    }


// 여러 장소에서 완전 검사 패턴을 사용하기 시작하면 상황이 악화된다.
// 특정 케이스 검사를 쉽게 놓칠 수 있으며 이는 소프트웨어 충돌로 이어질 수 있기 때문이다.
// 모든 선택 사항을 완벽하게 검사했는지 확인하는 헬퍼 함수를 만들어 이 문제를 해결할 수 있다.

// 보통 never는 일어나지 말아야 할 상황이 발생했음을 암시한다.
// 위에서는 never를 함수의 형식 에너테이션으로 사용했다. '대체 어떤 값을 함수 인수로 전달해야 하는 걸까?'라는 궁금증이 생길 것이다.
// 이 함수에는 어떤 값도 인수로 전달할 수 없다. 이 함수를 호출하지 않는 것이 정상이다.
// 하지만 기존의 default 케이스를 assertNever로 바꾸어 형식 시스템이 모든 호환 가능한 값을 확인하도록 강제할 수 있다.
function assertNever(value: never){
    console.error("Unknown value", value);
    throw Error("Not possible");
};

// 사용할 수 있는 모든 선택 사항을 완벽하게 검사하지 않으면 물결선이 나타난다.
    function area3(shape: Shape){
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
            default:
                assertNever(shape);
            //  ^- 'Rectangle' 형식의 인수는 'never' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
        }
    }

// ts가 모든 상황을 검사하도록 강제하므로 Retangle이라는 새로운 클래스를 추가할 때 함께 바꿔야 할 모든 코드를 쉽게 확인할 수 있다.
function area4(shape: Shape){
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
                /// ...
                break;
            default: // shpae는 never
                assertNever(shape); // shpae를 assertNever로 전달할 수 있음!!
        }
    }

// 이 함수는 코드의 품질을 높이는 데 도움을 준다.