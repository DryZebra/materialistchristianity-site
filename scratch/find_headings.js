const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'volume_ii_text.txt');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const headings = [];
lines.forEach((line, idx) => {
  const trimmed = line.trim();
  // Match headings like "Chapter X:", "Introduction:", "Epilogue:", "Part X:", "§ X.X"
  if (
    trimmed.startsWith('Chapter ') ||
    trimmed.startsWith('Introduction:') ||
    trimmed.startsWith('Epilogue:') ||
    trimmed.startsWith('Part ') ||
    trimmed.startsWith('VOLUME II') ||
    trimmed.startsWith('MATERIALIST') ||
    trimmed.startsWith('§ ')
  ) {
    headings.push({ lineNum: idx + 1, content: trimmed });
  }
});

const outputPath = path.join(__dirname, 'volume_ii_headings.json');
fs.writeFileSync(outputPath, JSON.stringify(headings, null, 2), 'utf8');
console.log('Found ' + headings.length + ' headings. Saved to ' + outputPath);
