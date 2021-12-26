interface getKoreanRegexOptions {
    consonantMatch?: boolean;
    fuzzy?: boolean;
}
declare function getKoreanRegex(searchWord: string, { consonantMatch, fuzzy }: getKoreanRegexOptions): RegExp;

declare function getKoreanUnicode(word: string): string;

declare function escapeRegex(string: string): string;

declare function extractKoPhonemes(char: string): false | {
    initial: string;
    medial: string;
    finale: string;
    initialOffset: number;
    medialOffset: number;
    finaleOffset: number;
};

export { escapeRegex, extractKoPhonemes, getKoreanRegex, getKoreanUnicode };
