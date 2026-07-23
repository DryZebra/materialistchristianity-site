const fs = require('fs');
const path = require('path');

const summaryPath = path.join(__dirname, 'wiki_files_summary.json');
if (!fs.existsSync(summaryPath)) {
  console.error("Error: summary not found");
  process.exit(1);
}

const files = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

// 1. Identify stubs
const stubs = files.filter(f => f.wordCount < 400);
console.log('Total files:', files.length);
console.log('Stubs (< 400 words):', stubs.length);

// Group stubs by category directory
const categories = {};
stubs.forEach(s => {
  const dir = s.relPath.split('/')[0];
  if (!categories[dir]) categories[dir] = [];
  categories[dir].push(s);
});

console.log('\nStubs by Category:');
Object.keys(categories).forEach(cat => {
  console.log(`- ${cat}: ${categories[cat].length} stubs`);
});

// Write stubs report
const report = {
  total: files.length,
  stubCount: stubs.length,
  stubsByCategory: categories,
  allStubs: stubs.map(s => ({
    path: s.relPath,
    title: s.title,
    words: s.wordCount
  }))
};

fs.writeFileSync(path.join(__dirname, 'stubs_report.json'), JSON.stringify(report, null, 2), 'utf8');
console.log('\nReport written to stubs_report.json');
