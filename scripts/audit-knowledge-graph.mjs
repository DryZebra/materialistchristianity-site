import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const WIKI_DIR = 'content/wiki';
const ESSAY_DIR = 'content/essays';
const DB_PATH = 'docs/sources/forensic_database.json';

function audit() {
  console.log('--- KNOWLEDGE GRAPH AUDIT START ---');

  const wikiFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
  const essayFiles = fs.readdirSync(ESSAY_DIR).filter(f => f.endsWith('.md'));
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const wikiSlugs = wikiFiles.map(f => f.replace('.md', ''));
  const essaySlugs = essayFiles.map(f => f.replace('.md', ''));
  const allSlugs = [...wikiSlugs, ...essaySlugs];

  let errors = 0;

  // 1. Check for Duplicate Slugs (FileSystem)
  const slugCounts = {};
  allSlugs.forEach(s => slugCounts[s] = (slugCounts[s] || 0) + 1);
  Object.keys(slugCounts).forEach(s => {
    if (slugCounts[s] > 1 && !wikiSlugs.includes(s) && !essaySlugs.includes(s)) {
      console.error(`ERROR: Duplicate slug detected: ${s}`);
      errors++;
    }
  });

  // 2. Check Database Coverage
  db.nodes.forEach(node => {
    if (!wikiSlugs.includes(node.slug)) {
      console.warn(`WARNING: Database node '${node.slug}' missing from ${WIKI_DIR}`);
    }
  });

  // 3. Link Integrity (Wiki)
  wikiFiles.forEach(file => {
    const content = fs.readFileSync(path.join(WIKI_DIR, file), 'utf8');
    
    // Check old-style double brackets
    const bracketLinks = content.match(/\[\[(.*?)\]\]/g);
    if (bracketLinks) {
      bracketLinks.forEach(link => {
        const slug = link.slice(2, -2).split('|')[0];
        if (!allSlugs.includes(slug)) {
          console.error(`ERROR in ${file}: Broken link ${link}`);
          errors++;
        }
      });
    }

    // Check new-style relative links
    const relativeLinks = content.match(/\/wiki\/node\/(.*?)[)\s]/g);
    if (relativeLinks) {
      relativeLinks.forEach(link => {
        const slug = link.split('/').pop().replace(')', '').trim();
        if (!wikiSlugs.includes(slug)) {
          console.error(`ERROR in ${file}: Broken route /wiki/node/${slug}`);
          errors++;
        }
      });
    }
  });

  console.log('--- AUDIT COMPLETE ---');
  console.log(`Errors Found: ${errors}`);
  if (errors > 0) process.exit(1);
}

audit();
