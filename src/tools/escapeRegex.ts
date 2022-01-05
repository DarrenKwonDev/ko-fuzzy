const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

function escapeRegex(string: string) {
  if (!string) {
    return "";
  }

  return string.replace(reRegExpChar, "\\$&");
}

export default escapeRegex;
