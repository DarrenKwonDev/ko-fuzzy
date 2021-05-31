import fs from "fs";
import path from "path";

import extractKoChar from "./tools/extractKoPhonemes";
import fuzzyEnMatch from "./core/fuzzyEnMatch";
import getUnicode from "./tools/getUnicode";
import exactKoMatch from "./core/exactKoMatch";

console.log(exactKoMatch("서우").test("서울특별시")); // true.
console.log(/"서우"/.test("서울특별시")); // false.

// const fuzzyEnregex = fuzzyEnMatch("ct");
// console.log(fuzzyEnregex); // /c.*?t/

// console.log(getUnicode("߸"));
// console.log(getUnicode("한"))
// console.log(getUnicode("가"))
// console.log(extractKoChar("한"))
