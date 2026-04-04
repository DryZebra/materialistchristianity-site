import fs from 'fs';
import path from 'path';

const SLUG_MAP = {
  'rupture_and_re-entry': 'rupture_reentry',
  'the_dialectic_of_betrayal': 'the_dialectic_betrayal',
  'sub-objects': 'sub_objects',
  'liturgy_as_motion_coordinator': 'liturgy_motion_coordinator',
  '01_the_electrician_creedforensic_testimony': '01_the_electrician_creed',
  '01_the_electrician_creedelectrician': '01_the_electrician_creed',
  '01_the_electrician_creedtestimony_of_the_archive': '01_the_electrician_creed',
  'the_church_as_sub-object': 'the_church_as_sub_object',
  'resurrection_of_structure': 'resurrection_of_structure'
};

function toSlug(text) {
  if (!text) return '';
  let slug = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');
  
  return SLUG_MAP[slug] || slug;
}

const CONTENT_DIRS = ['content/wiki', 'content/essays'];

async function sanitizeDir(dir) {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Handle [[slug|title]] - slugify rawSlug
    content = content.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, rawSlug, title) => {
      return `[[${toSlug(rawSlug)}|${title}]]`;
    });

    // 2. Handle [[slug]] - slugify rawSlug
    content = content.replace(/\[\[(.*?)\]\]/g, (match, rawSlug) => {
      return `[[${toSlug(rawSlug)}]]`;
    });

    // 3. Handle [Title](/wiki/node/Target) or [Title](/essays/Target)
    content = content.replace(/\[(.*?)\]\((?:\/wiki\/node\/|\/essays\/)(.*?)\)/g, (match, title, rawPath) => {
        const isEssay = rawPath.startsWith('01_') || match.includes('/essays/');
        const prefix = isEssay ? '/essays/' : '/wiki/node/';
        return `[${title}](${prefix}${toSlug(rawPath)})`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Sanitized: ${file}`);
    }
  }
}

async function main() {
  for (const dir of CONTENT_DIRS) {
    await sanitizeDir(dir);
  }
  console.log('🏁 Content Sanitization Complete.');
}

main();
