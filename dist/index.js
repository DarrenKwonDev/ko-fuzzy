var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  regexMatch: () => regexMatch_default
});

// src/constants/index.ts
var INITIALS = ["\u3131", "\u3132", "\u3134", "\u3137", "\u3138", "\u3139", "\u3141", "\u3142", "\u3143", "\u3145", "\u3146", "\u3147", "\u3148", "\u3149", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
var MEDIALS = ["\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3158", "\u3159", "\u315A", "\u315B", "\u315C", "\u315D", "\u315E", "\u315F", "\u3160", "\u3161", "\u3162", "\u3163"];
var FINALES = ["", "\u3131", "\u3132", "\u3133", "\u3134", "\u3135", "\u3136", "\u3137", "\u3139", "\u313A", "\u313B", "\u313C", "\u313D", "\u313E", "\u313F", "\u3140", "\u3141", "\u3142", "\u3144", "\u3145", "\u3146", "\u3147", "\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
var BASE = "\uAC00".charCodeAt(0);
var MIXED = {
  \u3132: ["\u3131", "\u3131"],
  \u3133: ["\u3131", "\u3145"],
  \u3135: ["\u3134", "\u3148"],
  \u3136: ["\u3134", "\u314E"],
  \u313A: ["\u3139", "\u3131"],
  \u313B: ["\u3139", "\u3141"],
  \u313C: ["\u3139", "\u3142"],
  \u313D: ["\u3139", "\u3145"],
  \u313E: ["\u3139", "\u314C"],
  \u313F: ["\u3139", "\u314D"],
  \u3140: ["\u3139", "\u314E"],
  \u3144: ["\u3142", "\u3145"],
  \u3146: ["\u3145", "\u3145"],
  \u3158: ["\u3157", "\u314F"],
  \u3159: ["\u3157", "\u3150"],
  \u315A: ["\u3157", "\u3163"],
  \u315D: ["\u315C", "\u3153"],
  \u315E: ["\u315C", "\u3154"],
  \u315F: ["\u315C", "\u3163"],
  \u3162: ["\u3161", "\u3163"]
};
var MEDIAL_RANGE = {
  \u3157: ["\u3157", "\u315A"],
  \u315C: ["\u315C", "\u315F"],
  \u3161: ["\u3161", "\u3162"]
};

// src/tools/escapeRegex.ts
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegex(string) {
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string || "";
}
var escapeRegex_default = escapeRegex;

// src/tools/extractKoPhonemes.ts
function extractKoPhonemes(char) {
  if (!char.match(/[ㄱ-ㅎ가-힣]/)) {
    return false;
  }
  let initial = "";
  let medial = "";
  let finale = "";
  let initialOffset = -1;
  let medialOffset = -1;
  let finaleOffset = -1;
  if (char.match(/[ㄱ-ㅎ]/)) {
    initial = char;
    initialOffset = INITIALS.join("").search(char);
  } else if (char.match(/[가-힣]/)) {
    const tmp = char.charCodeAt(0) - BASE;
    finaleOffset = tmp % FINALES.length;
    medialOffset = (tmp - finaleOffset) / FINALES.length % MEDIALS.length;
    initialOffset = ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length;
    initial = INITIALS[initialOffset];
    medial = MEDIALS[medialOffset];
    finale = FINALES[finaleOffset];
  }
  return { initial, medial, finale, initialOffset, medialOffset, finaleOffset };
}
var extractKoPhonemes_default = extractKoPhonemes;

// src/tools/initialToEndKoPhonemes.ts
var initialToEndKoPhonemes = (initial) => {
  const initialOffset = INITIALS.indexOf(initial);
  if (initialOffset !== -1) {
    const baseUniCode = initialOffset * MEDIALS.length * FINALES.length + BASE;
    const startChar = String.fromCharCode(baseUniCode);
    const endChar = String.fromCharCode(baseUniCode + MEDIALS.length * FINALES.length - 1);
    return `[${startChar}-${endChar}]`;
  }
  return initial;
};
var initialToEndKoPhonemes_default = initialToEndKoPhonemes;

// src/core/regexMatch.ts
var fuzzyStr = ".*";
function regexMatch(searchWord, { consonantMatch = false, fuzzy = false }) {
  let wordArr = [...searchWord];
  let frontChars = wordArr.slice(0, -1);
  let regexPattern;
  let lastChar = wordArr[wordArr.length - 1];
  const phonemes = extractKoPhonemes_default(lastChar);
  if (phonemes) {
    const { initial, medial, finale, initialOffset, medialOffset, finaleOffset } = phonemes;
    const baseUniCode = initialOffset * FINALES.length * MEDIALS.length + BASE;
    const patterns = [];
    switch (true) {
      case finale !== "":
        patterns.push(lastChar);
        if (INITIALS.includes(finale)) {
          const wordWithoutCoda = String.fromCharCode(baseUniCode + medialOffset * FINALES.length);
          const CodaToRange = initialToEndKoPhonemes_default(finale);
          patterns.push(`${wordWithoutCoda}${CodaToRange}`);
        }
        if (MIXED[finale]) {
          const [first, second] = MIXED[finale];
          const wordwithSigleCoda = String.fromCharCode(baseUniCode + medialOffset * FINALES.length + FINALES.join("").search(first) + 1);
          const CodaToRange = initialToEndKoPhonemes_default(second);
          patterns.push(`${wordwithSigleCoda}${CodaToRange}`);
        }
        break;
      case medial !== "": {
        let from, to;
        if (MEDIAL_RANGE[medial]) {
          const [first, second] = MEDIAL_RANGE[medial];
          from = baseUniCode + MEDIALS.join("").search(first) * FINALES.length;
          to = baseUniCode + MEDIALS.join("").search(second) * FINALES.length + FINALES.length - 1;
        } else {
          from = baseUniCode + medialOffset * FINALES.length;
          to = from + FINALES.length - 1;
        }
        patterns.push(`[${String.fromCharCode(from)}-${String.fromCharCode(to)}]`);
        break;
      }
      case initial !== "":
        patterns.push(initialToEndKoPhonemes_default(initial));
      default:
        break;
    }
    regexPattern = patterns.length > 1 ? `(${patterns.join("|")})` : patterns[0];
  }
  if (consonantMatch) {
    frontChars = frontChars.map((char) => char.search(/[ㄱ-ㅎ]/) !== -1 ? initialToEndKoPhonemes_default(char) : escapeRegex_default(char));
  }
  if (!phonemes) {
    if (fuzzy)
      return new RegExp(frontChars.join(fuzzyStr) + fuzzyStr + lastChar);
    return new RegExp(searchWord);
  }
  if (fuzzy)
    return new RegExp(frontChars.join(fuzzyStr) + fuzzyStr + regexPattern);
  return new RegExp(frontChars.join("") + regexPattern);
}
var regexMatch_default = regexMatch;
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  regexMatch
});
