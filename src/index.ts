// index.ts
/* 
    ts의 import 구문으로 파일을 가리킬 때는 보통 확장자를 표시하지 않는다. 하지만 브라우저에서 해당 js파일을 찾으려면 확장자가 필요하다. 
    .ts 파일을 가리키는 상황이지만, 개발 시 .js 확장자를 추가하는 방법으로 이 문제를 해결할 수 있다. ts는 이를 영리하게 인식한다.
*/
import { obj } from "./module.js"; // 'module.ts'에서 형긱을 불러오면서 컴파일 시 확장자를 그대로 유지한다.
console.log(obj.name);