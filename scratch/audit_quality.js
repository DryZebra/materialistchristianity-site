const fs = require('fs');
const path = require('path');

const summaryPath = path.join(__dirname, 'wiki_files_summary.json');
const files = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

const categories = {
  batchFiles: [],
  stubs: [],
  longForm: [],
  blueprint: [],
  other: []
};

files.forEach(f => {
  if (f.relPath.includes('final_node_overwrites_batch')) {
    categories.batchFiles.push(f);
  } else if (f.relPath.startsWith('the-blueprint-exegesis/')) {
    categories.blueprint.push(f);
  } else if (f.wordCount < 400) {
    categories.stubs.push(f);
  } else if (f.wordCount >= 1000) {
    categories.longForm.push(f);
  } else {
    categories.other.push(f);
  }
});

console.log('--- WIKI AUDIT SUMMARY ---');
console.log('Total Files:', files.length);
console.log('Redundant Batch Files:', categories.batchFiles.length);
console.log('Blueprint Exegesis Nodes:', categories.blueprint.length);
console.log('Tiny Stubs (<400 words):', categories.stubs.length);
console.log('High-Quality Long-Form (>=1000 words):', categories.longForm.length);
console.log('Medium Nodes (400-1000 words):', categories.other.length);

// Let's write a detailed mapping to scratch/detailed_audit.json
fs.writeFileSync(
  path.join(__dirname, 'detailed_audit.json'),
  JSON.stringify(categories, null, 2),
  'utf8'
);
console.log('\nDetailed audit saved to detailed_audit.json');
