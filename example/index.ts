import fs from "fs";
import path from "path";
import getKoreanRegex from "../src/core/getKoreanRegex";

console.log(getKoreanRegex("가누", { consonantMatch: false }));
console.log(getKoreanRegex("후ㄱ도", { consonantMatch: true }));
console.log(getKoreanRegex("후ㄱ도", { consonantMatch: true, fuzzy: true }));
console.log(getKoreanRegex("ㅂㅇ", { consonantMatch: false, fuzzy: true }));
console.log(getKoreanRegex("ㅂㅇbdㅇ", { consonantMatch: true, fuzzy: true }));
console.log(getKoreanRegex("ㅂㅇbd", { consonantMatch: true, fuzzy: true }));
console.log(getKoreanRegex("ㅁㄴㅍ루", { consonantMatch: true })); // /[마-밓][나-닣][파-핗][루-륗]/
console.log(getKoreanRegex("as안v", { consonantMatch: true })); // /as안v/

fs.readFile(path.join(__dirname, "../example/data/city.json"), "utf8", (err, data) => {
  if (err) throw err;

  let city = JSON.parse(data);
  city
    .filter((elem: any) => {
      return getKoreanRegex("yok", { consonantMatch: false, fuzzy: true }).test(elem["행정구역"]);
    })
    .map((elem: any) => console.log(elem["행정구역"]));
});
