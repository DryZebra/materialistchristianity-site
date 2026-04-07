const fs = require('fs');
const path = require('path');

const contentBase = path.join(process.cwd(), 'content');
const mapFile = path.join(process.cwd(), 'william-engine/lab/content_map.json');

if (!fs.existsSync(mapFile)) {
  console.error('❌ Missing content map.');
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

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

const allFiles = getFilesRecursively(contentBase);
let repairCount = 0;

allFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Regex to match [Title](/wiki/nodes/slug) or [Title](/wiki/essays/slug) etc.
  const mdRegex = /\[(.*?)\]\((?:\/wiki\/node\/|\/wiki\/nodes\/|\/essays\/|\/wiki\/essays\/|\/wiki\/bible\/)(.*?)\)/g;

  content = content.replace(mdRegex, (match, title, rawPath) => {
    const slug = toSlug(rawPath);
    const category = map[slug];
    
    if (category) {
      let correctPrefix = '';
      if (category === 'wiki/nodes') correctPrefix = '/wiki/nodes/';
      else if (category === 'wiki/essays') correctPrefix = '/wiki/essays/';
      else if (category === 'wiki/bible') correctPrefix = '/wiki/bible/';
      else {
          // Keep as is if we don't know the category
          return match;
      }

      const newMatch = `[${title}](${correctPrefix}${slug})`;
      if (newMatch !== match) {
        changed = true;
        repairCount++;
        return newMatch;
      }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(f, content);
  }
});

console.log(`✅ Categorical Repair Complete. Repaired ${repairCount} links across the corpus.`);
