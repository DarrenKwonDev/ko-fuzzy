import escapeRegex from "./escapeRegex";

function createFuzzyMatcher(input: string) {
  const pattern = [...input].map(escapeRegex).join(".*?");
  return new RegExp(pattern);
}

export default createFuzzyMatcher;
