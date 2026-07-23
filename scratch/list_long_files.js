const fs = require('fs');
const path = require('path');

const summary = JSON.parse(fs.readFileSync(path.join(__dirname, 'wiki_files_summary.json'), 'utf8'));
const longFiles = summary.filter(f => f.wordCount >= 1000);

console.log('High Wordcount Files (>= 1000 words):', longFiles.length);
longFiles.forEach(f => {
  console.log(`- [${f.wordCount} words] ${f.relPath}: "${f.title}"`);
});
