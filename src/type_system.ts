// type_system.ts

type Settings = {
    language: "en"|"de"|"fr";
    theme?: "dracula"|"monokai"|"github";
};

// strictNullChecks를 활성화한 다음 ("exactOptionalPropertyTypes": false, "strictNullChecks": false,)
// theme을 다른 코드에서 접근하면 가능한 값의 수가 증가한다. 즉, undefined가 추가된다.
    function applySettings(settings: Settings) {
        // theme은 "dracula"|"monokai"|"github"|undefined
        const theme = settings.theme;
    }

// 이는 프로퍼티를 설정했는지 확인할 때 아주 도움이 되는 동작이다. 프로퍼티를 설정하지 않았다면 런타임 오류가 발생할 수 있기 때문이다
// ts가 undefined를 추가한 건 좋지만, js와 정확히 일치하지 않는다는 문제점이 존재한다
// "선택형 프로퍼티"란 객체에서 이 키가 존재하지 않을 수 있음을 의미한다.
// 이는 사소한 부분 같지만 중요하다. 예를 들어 키가 존재하지 않으면 프로퍼티 검사 시 false를 반환한다.
    function getTheme(settings: Settings) {
        if ('theme' in settings) { 
            return settings.theme;
        } 
        return 'default';
    }

    const settings: Settings = {
        language: "de",
    };

    const settingsUndefinedTheme: Settings = {
        language: "de",
        theme: undefined,
    };

    console.log(getTheme(settings)) // "default"
    console.log(getTheme(settingsUndefinedTheme)) // undefined

// "널 병합" 연산자를 이용하여 값이 올바른지 더 편하게 확인할 수 있다
    function getTheme2(settings: Settings) {
        return settings.theme ?? "default";
    }

    type Fn = typeof getTheme2;
    // type Fn = (settings: Settings) => "dracula" | "monokai" | "github" | "default"

// 선택형 프로퍼티에서 undefined를 읽는 동작 자체는 문제가 없지만, undefined로 설정하는 것은 사실 올바른 행동이 아니다.
// ("exactOptionalPropertyTypes": true, "strictNullChecks": true,) 설정을 바꾸면 ts의 동작도 달라진다.
    const settingsUndefinedTheme2: Settings = {
        language: "de",
        theme: undefined,
    };
    // '{ language: "de"; theme: undefined; }' 유형은 'exactOptionalPropertyTypes: true'가 있는 'Settings' 유형에 할당할 수 없습니다.
    // 대상 속성의 유형에 'undefined'를 추가하는 것을 고려하세요.
    // 'theme' 속성의 형식이 호환되지 않습니다.
    // 'undefined' 형식은 '"dracula" | "monokai" | "github"' 형식에 할당할 수 없습니다.ts(2375)