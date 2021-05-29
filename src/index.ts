import extractKoChar from "./extractKoChar";
import createFuzzyMatcher from "./createFuzzyMatcher";

const regex = createFuzzyMatcher("ct");

console.log(regex);

console.log([..."hello"]);

// console.log(extractKoChar("안"));
// console.log(extractKoChar("훟"));
// console.log(extractKoChar("밝"));

console.log("가".charCodeAt(0));
