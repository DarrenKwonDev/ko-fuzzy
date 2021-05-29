const BASE = 44032; // 한글 코드 시작: '가'.charCodeAt(0)

function extractKoChar(char: string) {
  const INITIALS = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const MEDIALS = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
  const FINALES = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

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

    finaleOffset = tmp % FINALES.length; // 종성
    medialOffset = ((tmp - finaleOffset) / FINALES.length) % MEDIALS.length; // 중성
    initialOffset = ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length; //초성

    initial = INITIALS[initialOffset];
    medial = MEDIALS[medialOffset];
    finale = FINALES[finaleOffset];
  }
  return { initial, medial, finale, initialOffset, medialOffset, finaleOffset };
}

export default extractKoChar;
