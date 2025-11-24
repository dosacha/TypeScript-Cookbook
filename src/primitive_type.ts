// primitive_type.ts
const ACADEMIC_TITLE = Symbol("title")
const ARTICLE_TITLE = Symbol("title")

if (ACADEMIC_TITLE === ARTICLE_TITLE){
    // 이 조건은 절대 참이 성립하지 않는다
}

// descriptions은 개발 시 심볼 정보를 제공하는 데 도움을 준다
    console.log(ACADEMIC_TITLE.description) // title
    console.log(ACADEMIC_TITLE.toString) // symbol(title)

// 상호 배타적이고 고유한 값을 비교할 때 심볼을 유용하게 활용한다
    // 아주 나쁜 로깅 프레임워크
    const LEVEL_INFO = Symbol('INFO')
    const LEVEL_DEBUG = Symbol('DEBUG')
    const LEVEL_WARN = Symbol('WARN')
    const LEVEL_ERROR = Symbol('ERROR')

    function log(msg: unknown, level: any){
        switch(level){
            case LEVEL_WARN:
                console.warn(msg); break
            case LEVEL_ERROR:
                console.log(msg); break
            case LEVEL_DEBUG:
                console.log(msg); 
                debugger; break
            case LEVEL_INFO:
                console.log(msg);
        }
    }

// 반복할 수 없는 프로퍼티, 즉 직렬화할 수 있는 프로퍼티에도 심볼을 사용한다.
    const print = Symbol('print')

    const user = {
        name: `Stefan`,
        age: 40,
        [print]: function() {
            console.log(`${this.name} is ${this.age} years old`)
        }
    }

    JSON.stringify(user) // { name: `Stefan, age: 40}
    user[print]() // Stefan is 40 years old

// 전역 심볼 레지스트리를 이용해 전ㅇ체 에플리케이션에서 토큰을 접근한다.
    Symbol.for(`print2`) // 전역 심볼 만들기

    const user2 = {
        name: `Stefan`,
        age: 37,
        // 전역 심볼 사용
        [Symbol.for(`print2`)]: function() {
            console.log(`${this.name} is ${this.age} years old`)
        }
    }

// Symbol.for 호출 코드로 심볼을 만들고 두 번째 호출은 같은 심볼을 사용한다.
    // 변수에 저장된 심볼값의 키를 알고 싶으면 Symbol.keyFor()를 사용한다
    const usedSymbolKeys = []

    function extendObject(obj, symbol, value){
        // 무슨 심볼?
        const key = Symbol.keyFor(symbol)
        // 심볼을 저장하는 것이 좋겠다
        if(!usedSymbolKeys.includes(key)){
            usedSymbolKeys.push(key)
        }
        obj[symbol] = value
    }

    // 모두 가져오기
    function printAllValues(obj){
        usedSymbolKeys.forEach(key => {
            console.log(obj[Symbol.for(key)])
        })
    }

// 어떤 객체를 모든 심볼로 확장할 수 있도록 하는 코드에 symbol 형식을 사용한다
    const sym = Symbol('foo')

        function extendObject2(obj: any, sym: symbol, value: any){
            obj[sym] = value
        }

    extendObject2({}, sym, 42) // 모든 심볼과 동작함