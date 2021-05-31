import extractKoChar from "./tools/extractKoPhonemes";
import createFuzzyMatcher from "./core/createFuzzyMatcher";
import getUnicode from "./tools/getUnicode";
import exactMatch from "./core/exactMatch";

const regex = createFuzzyMatcher("ct");

// console.log(regex);

// console.log([..."hello"]);

console.log(exactMatch("블랙스와"));
console.log(exactMatch("black"));

// console.log(extractKoChar("ㅇ"));
// console.log(extractKoChar("안"));
// console.log(extractKoChar("훟"));
// console.log(extractKoChar("밝"));

// console.log(getUnicode("߸"));
// console.log(getUnicode("한"))
// console.log(getUnicode("가"))
// console.log(extractKoChar("한"))
