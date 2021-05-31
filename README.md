# autoFuzzy

_on developing..._

## how to use

```typescript
...
```

## example

```typescript
console.log(exactKoMatch("서우").test("서울특별시")); // true.
console.log(/"서우"/.test("서울특별시")); // false.
```

```typescript
// 그 외의 util 함수들
getUnicode("가"); // U+ac00

extractKoPhonemes("안");
// {initial: 'ㅇ', medial: 'ㅏ', finale: 'ㄴ', initialOffset: 11, medialOffset: 0, finaleOffset: 4 }
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

https://github.com/bluewings
