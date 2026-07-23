const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content', 'wiki');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getFiles(contentDir);
const summaries = files.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(contentDir, file).replace(/\\/g, '/');
  
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');
  
  const charCount = content.length;
  const wordCount = content.split(/\s+/).length;
  
  return { relPath, title, wordCount, charCount };
});

// Sort by category (relPath)
summaries.sort((a, b) => a.relPath.localeCompare(b.relPath));

const outputPath = path.join(__dirname, 'wiki_files_summary.json');
fs.writeFileSync(outputPath, JSON.stringify(summaries, null, 2), 'utf8');
console.log('Found ' + summaries.length + ' wiki files. Summary written to ' + outputPath);
