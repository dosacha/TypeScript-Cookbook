// primitive_type.ts
type CallbackFn = () => void;

// 형식 시스템의 형식
/*
    function task (name: string, dependencies: string[]): void;
    function task (name: string, callback: CallbackFn): void;
    function task (name: string, dependencies: string[], callback: CallbackFn): void;
*/

// 실제 구현
function task(
    name: string, param2: string[] | CallbackFn, param3: CallbackFn
): void{

    // ...
}

// ---

// 오버로드 선언
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// 실제 구현
function add(a: any, b: any) {
    return a + b;
}
add(1, 2);