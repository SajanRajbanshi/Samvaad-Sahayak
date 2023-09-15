import { createWorker } from 'tesseract.js';
// Convert 1st import statement to

// import { createworks } from required("tesseract")
const fs = require('fs');
const pdf = require('pdf-parse');

async function recognizeText() {
    let imgPath = "./image/test_image.png"
    const worker = await createWorker({
        logger: m => console.log(m)
    });


    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imgPath);
    await worker.terminate();
    console.log(text);
    return text;
}



async function translateText(text, targetLang) {
    const encodeText=encodeURIComponent(text);
    const response = await fetch("https://lingva.garudalinux.org/api/v1/auto/" + targetLang + "/" + encodeText)
    const obj = await response.json();
    console.log(obj);
    return obj['translation']
}

async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
  
    // Extracted text is available in the `text` property of the data object
    const text = data.text;
  
    // Clean up the text by removing extra whitespace
    const cleanedText = text.replace(/\s+/g, ' ').trim();
  
    return cleanedText;
  }
  