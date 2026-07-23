const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dir = path.join(root, 'content', 'wiki', 'ideological-resistance');

for (let i = 1; i <= 5; i++) {
  const file = path.join(dir, `final_node_overwrites_batch_${i}.md`);
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const titles = [];
    const regex = /title:\s*["']?([^"'\n]+)["']?/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      titles.push(match[1]);
    }
    console.log(`\nBatch ${i} (${path.basename(file)}):`);
    titles.forEach(t => console.log(`  - "${t}"`));
  }
}
