import { BASE, FINALES, INITIALS, MEDIALS } from "../constants";
import escapeRegex from "./escapeRegex";

// 해당 자음으로 시작하는 모든 문자의 범위를 출력합니다. 예를 들어 ㄱ을 넣으면 [가-깋]을 반환합니다.
const initialToEndKoPhonemes = (initial: string) => {
  const initialOffset = INITIALS.indexOf(initial); // 일단 초성에 있는 자음인지 체크

  if (initialOffset !== -1) {
    const baseUniCode = initialOffset * MEDIALS.length * FINALES.length + BASE;
    const startChar = String.fromCharCode(baseUniCode); // ㄱ이 들어왔따면, 가
    const endChar = String.fromCharCode(baseUniCode + MEDIALS.length * FINALES.length - 1); // ㄱ이 들어왔다면 깋

    return `[${startChar}-${endChar}]`;
  }
  return escapeRegex(initial);
};

export default initialToEndKoPhonemes;
