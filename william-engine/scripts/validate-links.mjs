import fs from 'fs';
import path from 'path';

const CONTENT_DIRS = ['content/wiki', 'content/essays'];

function toSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');
}

async function validate() {
  const allSlugs = new Set();
  const allLinks = [];

  // 1. Collect all valid slugs
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    files.forEach(f => allSlugs.add(path.basename(f, '.md')));
  }

  // 2. Scan for links
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Detect [[slug]] / [[slug|title]]
      const wikiRegex = /\[\[(.*?)\]\]/g;
      let match;
      while ((match = wikiRegex.exec(content)) !== null) {
        const rawSlug = match[1].split('|')[0];
        allLinks.push({ file, target: toSlug(rawSlug), original: match[0] });
      }

      // Detect [Title](/path/Target)
      const mdRegex = /\[.*?\]\((?:\/wiki\/node\/|\/essays\/)(.*?)\)/g;
      while ((match = mdRegex.exec(content)) !== null) {
        allLinks.push({ file, target: toSlug(match[1]), original: match[0] });
      }
    }
  }

  // 3. Verify links
  const deadLinks = allLinks.filter(link => !allSlugs.has(link.target));

  if (deadLinks.length > 0) {
    console.error(`❌ Found ${deadLinks.length} Dead Links:`);
    deadLinks.forEach(link => {
      console.error(`   - In ${link.file}: "${link.original}" -> target "${link.target}" (NOT FOUND)`);
    });
    process.exit(1);
  } else {
    console.log('✅ All internal links verified. Connectivity 100%.');
  }
}

validate();
