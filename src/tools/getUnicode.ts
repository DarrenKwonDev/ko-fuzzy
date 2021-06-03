function getUnicode(word: string) {
  let base = word.charCodeAt(0).toString(16);
  if (base.length < 4) {
    base = base.padStart(4, "0");
  }
  return "U+" + base;
}

export default getUnicode;
