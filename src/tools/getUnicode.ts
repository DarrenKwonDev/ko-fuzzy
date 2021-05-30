function getUnicode(word:string) {
    return "U+" + word.charCodeAt(0).toString(16)
}

export default getUnicode