const fs = require('fs');
const path = require('path');

const contentBase = path.join(process.cwd(), 'content');
const mapFile = path.join(process.cwd(), 'william-engine/lab/content_map.json');

function toSlug(text) {
  if (!text) return '';
  const clean = text.split('#')[0].split('?')[0];
  return clean
    .toLowerCase()
    .trim()
    .replace(/\.md$/, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');
}

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const map = {};
const allFiles = getFilesRecursively(contentBase);

allFiles.forEach(f => {
  const slug = toSlug(path.basename(f, '.md'));
  const relative = path.relative(contentBase, f);
  const category = path.dirname(relative).replace(/\\/g, '/');
  map[slug] = category;
});

fs.writeFileSync(mapFile, JSON.stringify(map, null, 4));
console.log(`✅ Content map generated with ${Object.keys(map).length} entries.`);
