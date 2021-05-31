import fs from "fs";
import path from "path";

import extractKoPhonemes from "./tools/extractKoPhonemes";
import fuzzyEnMatch from "./core/fuzzyEnMatch";
import getUnicode from "./tools/getUnicode";
import exactKoMatch from "./core/exactKoMatch";

fs.readFile(path.join(__dirname, "../example/data/city.json"), "utf8", (err, data) => {
  if (err) throw err;

  let city = JSON.parse(data);
  city
    .filter((elem: any) => {
      return exactKoMatch("붕").test(elem["행정구역"]);
    })
    .map((elem: any) => console.log(elem["행정구역"]));
});

// const a = "서울특별시".search(exactMatch("서우")) !== -1;
// console.log(a); // true

// const regex = createFuzzyMatcher("ct");

// console.log(regex);

// console.log([..."hello"]);

// console.log(exactMatch("블"));
// console.log(exactMatch("블래"));
// console.log(exactMatch("블랙"));

// const movieRegex = exactMatch("블ㄹ");

// console.log(exactMatch("블"));

// console.log(extractKoChar("ㅇ"));
console.log(extractKoPhonemes("안"));
// console.log(extractKoChar("훟"));
// console.log(extractKoChar("밝"));

// console.log(getUnicode("߸"));
// console.log(getUnicode("한"));
// console.log(getUnicode("가"));
// console.log(extractKoChar("한"))
