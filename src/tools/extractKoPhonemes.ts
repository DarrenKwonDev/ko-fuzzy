import { BASE, FINALES, INITIALS, MEDIALS } from "../constants";

function extractKoPhonemes(char: string) {
  // 한글이 아니면 false
  if (!char.match(/[ㄱ-ㅎ가-힣]/)) {
    return false;
  }

  let initial = "";
  let medial = "";
  let finale = "";

  let initialOffset = -1;
  let medialOffset = -1;
  let finaleOffset = -1;

  // 초성만 존재하는 경우
  if (char.match(/[ㄱ-ㅎ]/)) {
    initial = char;
    initialOffset = INITIALS.join("").search(char);
  } else if (char.match(/[가-힣]/)) {
    const tmp = char.charCodeAt(0) - BASE;

    finaleOffset = tmp % FINALES.length; // 종성
    medialOffset = ((tmp - finaleOffset) / FINALES.length) % MEDIALS.length; // 중성
    initialOffset = ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length; //초성

    initial = INITIALS[initialOffset];
    medial = MEDIALS[medialOffset];
    finale = FINALES[finaleOffset];
  }
  return { initial, medial, finale, initialOffset, medialOffset, finaleOffset };
}

export default extractKoPhonemes;
