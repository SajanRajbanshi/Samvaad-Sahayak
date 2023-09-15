
export async function translateText(text, targetLang) {
    const encodeText=encodeURIComponent(text);
    const response = await fetch("https://lingva.garudalinux.org/api/v1/auto/" + targetLang + "/" + encodeText)
    const obj = await response.json();
    console.log(obj);
    return obj['translation']
}
