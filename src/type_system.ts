// type_system.ts

// 선택형 never 기법은 유니온의 각 영역에서 겹치지 않는 프로퍼티를 가져다가 선택형 프로퍼티 형식 never로 반대편 영역에 추가하는 기법이다.
    type SelectBase = {
        options: string[];
    };

    type SingleSelect = SelectBase & {
        value: string;
        values?: never;
    };

    type MultipleSelect = SelectBase & {
        value?: never;
        values: string[];
    };

    type SelectProperties = SingleSelect | MultipleSelect;

    function selectCallback(params: SelectProperties) {
        if("value" in params) {
            // 한 개의 값 처리
        } else if ("values" in params) {
            // 여러 값 처리
        }
    }

    selectCallback({
        options: ["dracula", "monokai", "vscode"],
        values: ["dracula", "vscode"],
        value: "dracula",
    });
    // ^ '{ options: string[]; values: string[]; value: string; }' 형식의 인수는 'SelectProperties' 형식의 매개 변수에 할당될 수 없습니다.
    //   'value' 속성의 형식이 호환되지 않습니다.
    //   'string' 형식은 'undefined' 형식에 할당할 수 없습니다.ts(2345)

// 이렇게 kind 프로퍼티를 사용하지 않고 유니온 형식을 분리했다.
// 구별하는 프로퍼티가 많지 않다면 유효하게 이 기법을 사용할 수 있다.