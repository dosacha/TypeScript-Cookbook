// type_system.ts

// 콘텐츠 관리 시스템에 접근하는 API를 가정.
    type Entry = { /* 개발 중 */ };

    function retrieve(contentType: string): Entry[] {
        // 개발 중
        return [];
    }

// 문자열로 유니온을 만들고 미리 정의한 콘테츠 형식을 포함하는 목록을 보여주는 헬퍼 형식
    type Entry = { /* 개발 중 */ };

    type contentType = "post"|"page"|"asset"|string;

    function retrieve(content: contentType): Entry[] {
        // 개발 중
        return [];
    }

    // post, page, asset등은 string의 하위 형식이므로 넓은 집합으로 삼켜진다
    retrieve("") // retrieve(contentType: string): Entry[]

// 빈 객체 형식 {}과 string의 인터섹션을 통해 자동완성 정보를 유지하고 리터럴 형식을 보존할 수 있다
    type contentType2 = "post"|"page"|"asset"|string & {};
    // 인터섹션은 ContentType과 호환되는 값의 수를 바꾸지 않지만, 
    // ts가 하위 형식을 줄이지 못하게 하고 리터럴 형식을 보존하도록 설정한다

    function retrieve2(content: contentType2): Entry[] {
        // 개발 중
        return [];
    }
    
    retrieve2("") // 이제 ContentType은 string으로 줄어들지 않는다

    // 여전히 모든 문자열은 ContentType의 유효한 값이다.
    // 단지 API를 사용하는 개발자에게 힌트를 제공해서 개발자 경험을 바꾸었을 뿐이다.