import fs from "fs";
import path from "path";

import regexMatch from "./core/regexMatch";

// fs.readFile(path.join(__dirname, "../example/data/city.json"), "utf8", (err, data) => {
//   if (err) throw err;

//   let city = JSON.parse(data);
//   city
//     .filter((elem: any) => {
//       return regexMatch("yok", { consonantMatch: false, fuzzy: true }).test(elem["행정구역"]);
//     })
//     .map((elem: any) => console.log(elem["행정구역"]));
// });

console.log(regexMatch("가누", { consonantMatch: false }));
console.log(regexMatch("후ㄱ도", { consonantMatch: true }));
console.log(regexMatch("후ㄱ도", { consonantMatch: true, fuzzy: true }));
console.log(regexMatch("ㅂㅇ", { consonantMatch: false, fuzzy: true }));
console.log(regexMatch("ㅂㅇbdㅇ", { consonantMatch: true, fuzzy: true }));
// console.log(regexMatch("ㅁㄴㅍ루", { consonantMatch: true })); // /[마-밓][나-닣][파-핗][루-륗]/
// console.log(regexMatch("as안v", { consonantMatch: true })); // /as안v/
