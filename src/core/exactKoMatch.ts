import { BASE, INITIALS, FINALES, MEDIALS, MIXED, MEDIAL_RANGE } from "../constants";
import escapeRegex from "../tools/escapeRegex";
import extractKoPhonemes from "../tools/extractKoPhonemes";
import initialToEndKoPhonemes from "../tools/initialToEndKoPhonemes";

interface exactMatchOptions {
  consonantMatch?: boolean; // 초성 찾기
}

function exactKoMatch(searchWord: string, { consonantMatch = false }: exactMatchOptions): RegExp {
  let wordArr = [...searchWord];
  let lastChar = wordArr[wordArr.length - 1]; // 검색어 중 마지막 문자를 찾아내서 초, 중, 종성 걸러내기
  let frontChars: string[] = [];
  let regexPattern;
  const phonemes = extractKoPhonemes(lastChar); // 영어거나 공백이면 false 반환

  if (phonemes) {
    const { initial, medial, finale, initialOffset, medialOffset, finaleOffset } = phonemes;
    frontChars = wordArr.slice(0, -1); // 마지막 문자를 제외한 나머지 문자

    // 마지막 문자의 초성으로 시작하는 첫 문자 => 가, 나, 다, 라, ...
    const baseUniCode = initialOffset * FINALES.length * MEDIALS.length + BASE;

    const patterns = [];

    switch (true) {
      // 종성이 있는 경우. 한 => (한|하[나-닣]) 꼴이어야 함. 겹받침의 경우 않 => (않|안[하-힣]) 꼴
      case finale !== "":
        // 우선 검색어의 마지막 문자 넣기
        patterns.push(lastChar);

        // 종성이 홑받침인 경우
        if (INITIALS.includes(finale)) {
          // 입력한 마지막 글자의 종성을 제외한 문자. 즉, 완 => 와
          const wordWithoutCoda = String.fromCharCode(baseUniCode + medialOffset * FINALES.length);

          // 종성을 시작으로 처음부터 끝까지 반환하는 함수 즉, 완 => 받침이 ㄴ => [나-닣]
          const CodaToRange = initialToEndKoPhonemes(finale);

          patterns.push(`${wordWithoutCoda}${CodaToRange}`);
        }
        // 종성이 겹받침인 경우 분리하기
        if (MIXED[finale]) {
          const [first, second] = MIXED[finale];

          // 왆 => 완
          const wordwithSigleCoda = String.fromCharCode(baseUniCode + medialOffset * FINALES.length + FINALES.join("").search(first) + 1);

          // 겹받침 2번째 자음의 범위. 왆 => ㅎ => [하-힣]
          const CodaToRange = initialToEndKoPhonemes(second);

          patterns.push(`${wordwithSigleCoda}${CodaToRange}`);
        }
        break;

      // 중성으로 끝나는 경우 녀 => [녀-녛] 까지. 단, ㅗ/ㅜ/ㅡ는 각각 ㅚ, ㅟ, ㅢ 가 될 수도 있음.
      // let 변수를 썼으므로 스코프 내부에서만 존재하게 {}로 묶어주자.
      case medial !== "": {
        let from: number, to: number;

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

      // 초성으로 끝나면 ㅎ => [하-힣]으로 모두 잡으면 됨
      case initial !== "":
        patterns.push(initialToEndKoPhonemes(initial));

      default:
        break;
    }

    regexPattern = patterns.length > 1 ? `(${patterns.join("|")})` : patterns[0];
  }

  // 만약 초성 찾기가 활성화 되어 있다면 맨 뒤의 음절을 제외한 앞의 단어들의 전체 range를 추가해야 함
  // 말이 어려운데, 예를 들어 ㄱㅅ충 => [가-깋][사-싷][충|아-앟]이 되어야 하므로, frontChars에 따로 initialToEndKoPhonemes 함수를 써줘야 한다.
  if (consonantMatch) {
    frontChars = frontChars.map((char) => (char.search(/[ㄱ-ㅎ]/) !== -1 ? initialToEndKoPhonemes(char) : escapeRegex(char)));
  }

  return new RegExp(frontChars.join("") + regexPattern);
}

export default exactKoMatch;
