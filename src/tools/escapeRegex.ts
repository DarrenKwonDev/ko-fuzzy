const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

const reHasRegExpChar = RegExp(reRegExpChar.source); // 플래그와 //를 발라낸 source만 전달

function escapeRegex(string: string) {
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string || "";
}

export default escapeRegex;
