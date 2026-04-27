const fs = require('fs');

const raw = fs.readFileSync('scratch/pdf3.txt', 'utf-8');
const pages = raw.split(/----------------Page \(\d+\) Break----------------/);

let reconstructed = '';

for (const page of pages) {
    const lines = page.split('\n').filter(l => l.trim() !== '');
    lines.reverse();
    reconstructed += lines.join('\n') + '\n\n';
}

fs.writeFileSync('scratch/pdf_fixed.txt', reconstructed);
console.log("Fixed!");
