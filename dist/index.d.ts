interface regexMatchOptions {
    consonantMatch?: boolean;
    fuzzy?: boolean;
}
declare function regexMatch(searchWord: string, { consonantMatch, fuzzy }: regexMatchOptions): RegExp;

export { regexMatch };
