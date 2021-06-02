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
      return exactKoMatch("ㅇㅈ", { consonantMatch: true }).test(elem["행정구역"]);
    })
    .map((elem: any) => console.log(elem["행정구역"]));
});

// console.log(fuzzyEnMatch("ct"));
// console.log(fuzzyEnMatch("cta"));

// console.log(exactKoMatch("ㅁㄴㅍㄹ"));

// const FUZZY = `__${parseInt("fuzzy", 36)}__`;
// const IGNORE_SPACE = `__${parseInt("ignorespace", 36)}__`;

// const fuzzy = true;
// const ignoreSpace = true;
// const glue = fuzzy ? FUZZY : ignoreSpace ? IGNORE_SPACE : "";

// console.log(glue);

// console.log(RegExp(FUZZY, "g"));
