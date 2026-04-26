const fs = require('fs');
const PDFParser = require("pdf2json");

function extract(file, outputFile) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFileSync(outputFile, pdfParser.getRawTextContent());
            console.log(`Extracted to ${outputFile}`);
            resolve();
        });

        pdfParser.loadPDF(file);
    });
}

async function run() {
    const p1 = "C:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\Put new stuff here\\Materialist Christianity and Entropic Dance.pdf";
    const p2 = "C:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\Put new stuff here\\The Entropic Dance.pdf";
    
    try {
        await extract(p1, "pdf1.txt");
        await extract(p2, "pdf2.txt");
    } catch(e) {
        console.error(e);
    }
}

run();
