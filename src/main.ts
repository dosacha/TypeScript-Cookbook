// main.ts
// charting.js 를 import 할 때 charting.d.ts 타입을 사용해라
// @deno-types="./charting.d.ts"
import * as charting from "./charting.js";

charting.draw();
console.log(charting.sum(10, 20));

