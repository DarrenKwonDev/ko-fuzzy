# ko-fuzzy

## how to install

```
npm i ko-fuzzy
```

## example

```typescript
import { getKoreanRegex, getKoreanUnicode, escapeRegex, extractKoPhonemes } from "ko-fuzzy";


console.log(getKoreanRegex("서우", { consonantMatch: false }).test("서울특별시")); // true.
console.log(getKoreanRegex("ㅅㅇ", { consonantMatch: true }).test("서울특별시")); // 초성 검색 옵션 활성화. true.
console.log(/"서우"/.test("서울특별시")); // false.
```

```typescript
// 그 외의 util 함수들
getKoreanUnicode("가"); // U+ac00
extractKoPhonemes("안"); // {initial: 'ㅇ', medial: 'ㅏ', finale: 'ㄴ', initialOffset: 11, medialOffset: 0, finaleOffset: 4 }
```

## 유니코드 및 관련 작업 설명글

[유니코드와 한글의 영역](https://darrengwon.tistory.com/1425)  
[초중종성 분리작업](https://darrengwon.tistory.com/1426)

### 한글 관련 용어 정리

음소(Phonemes)

초성(初聲, onset)  
중성(中聲, nucleus)  
종성(終聲, coda)

#### Inspired by

[bluewings](https://github.com/bluewings)
