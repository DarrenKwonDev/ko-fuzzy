import escapeRegex from "../tools/escapeRegex";

function fuzzyEnMatch(input: string) {
  const pattern = [...input].map(escapeRegex).join(".*?");
  return new RegExp(pattern);
}

export default fuzzyEnMatch;
