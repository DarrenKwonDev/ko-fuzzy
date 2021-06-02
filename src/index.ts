import fs from "fs";
import path from "path";

import extractKoPhonemes from "./tools/extractKoPhonemes";
import fuzzyEnMatch from "./core/fuzzyEnMatch";
import getUnicode from "./tools/getUnicode";
import exactMatch from "./core/exactMatch";

// fs.readFile(path.join(__dirname, "../example/data/city.json"), "utf8", (err, data) => {
//   if (err) throw err;

//   let city = JSON.parse(data);
//   city
//     .filter((elem: any) => {
//       return exactKoMatch("n", { consonantMatch: true }).test(elem["행정구역"]);
//     })
//     .map((elem: any) => console.log(elem["행정구역"]));
// });

// console.log(fuzzyEnMatch("ct"));
// console.log(fuzzyEnMatch("cta"));

console.log(exactMatch("ㅁㄴㅍ루", { consonantMatch: true })); // /[마-밓][나-닣][파-핗][루-륗]/
console.log(exactMatch("as안v", { consonantMatch: true })); // /as안v/

// const FUZZY = `__${parseInt("fuzzy", 36)}__`;
// const IGNORE_SPACE = `__${parseInt("ignorespace", 36)}__`;

// const fuzzy = true;
// const ignoreSpace = true;
// const glue = fuzzy ? FUZZY : ignoreSpace ? IGNORE_SPACE : "";

// console.log(glue);

// console.log(RegExp(FUZZY, "g"));
