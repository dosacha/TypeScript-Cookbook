// type_system.ts

type Dice = 1|2|3|4|5|6;

// 아래 함수로 유효한 값을 확인할 수 있지만 
// 현재 검사로는 형식 시스템이 형식을 바꾸도록 하는 방법이 없다. 
function rollDice1(input: number){
    if([1,2,3,4,5,6].includes(input)){
        // 'input'이 주사위라는 사실을 알지만,
        // ts 입장에서 'input'은 여전히 number이다.
    }
}

// 검사 코드를 헴퍼 함수로 이동시켜 형식 시스템이 좀 더 효과적으로 동작하도록 도울 수 있다.
// boolean 값을 반환하는 함수가 형식 찬반형을 반환하도록 함수 반환 형식 시그니처를 바꿀 수 있다.
    function isDice1(value: number): boolean{
        return [1,2,3,4,5,6].includes(value);
    }
    function isDice2(value: number): value is Dice{
        return [1,2,3,4,5,6].includes(value);
    }

// 이런 방식으로 ts는 값의 실제 형식이 무엇인지 파악해서 값에 수행할 동작을 더 정교하게 제어할 수 있다.
    function rollDice2(input: number){
    if(isDice2(input)){
        // 이제 'input'은 'Dice'임
    }else{
        // 'input'은 여전히 'number'임
    }
}

// ts는 제한적이고, 형식 찬반형에 any 어서션은 허용하지 않으며, 반드시 기존 형식보다 좁은 형식이어야 한다.
// 예를 들어 string 입력을 받아 출력을 number의 하위 집합으로 특정하면 오류가 발생한다.
    function isDice3(value: string): value is Dice{
        // 오류: 형식 조건자의 형식을 해당 매개 변수의 형식에 할당할 수 있어야 합니다.
        // 'number' 형식은 'string' 형식에 할당할 수 없습니다.
        // 'number' 형식은 'string' 형식에 할당할 수 없습니다.ts(2677)
        return [1,2,3,4,5,6].includes(value);
    }