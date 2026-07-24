const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

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

const baseDir = path.join(__dirname, '../content/wiki');
const files = getFilesRecursively(baseDir);

const validSlugs = new Set();
const fileMap = {};

files.forEach(f => {
  const slug = path.basename(f, '.md');
  validSlugs.add(slug);
  const raw = fs.readFileSync(f, 'utf8');
  const { data } = matter(raw);
  fileMap[slug] = data.category || 'general';
});

console.log('Valid Slugs count:', validSlugs.size);

let brokenCount = 0;
files.forEach(f => {
  const slug = path.basename(f, '.md');
  const raw = fs.readFileSync(f, 'utf8');
  const { data } = matter(raw);

  const related = data.related || [];
  related.forEach(rel => {
    if (!validSlugs.has(rel)) {
      console.log(`[BROKEN RELATED LINK] In ${slug}.md -> related: "${rel}" does not exist!`);
      brokenCount++;
    } else {
      console.log(`[OK LINK] ${slug} -> /wiki/${fileMap[rel]}/${rel}`);
    }
  });
});

console.log(`Total broken links found: ${brokenCount}`);
