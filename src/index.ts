import extractKoChar from "./core/extractKoChar";
import createFuzzyMatcher from "./core/createFuzzyMatcher";
import getUnicode from "./tools/getUnicode";

const regex = createFuzzyMatcher("ct");

console.log(regex);

console.log([..."hello"]);

// console.log(extractKoChar("안"));
// console.log(extractKoChar("훟"));
// console.log(extractKoChar("밝"));


console.log(getUnicode("ჷ"))
// console.log(getUnicode("한"))
// console.log(getUnicode("가"))
// console.log(extractKoChar("한"))