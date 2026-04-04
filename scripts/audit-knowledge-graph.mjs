import fs from 'fs';
import path from 'path';

const WIKI_DIR = 'content/wiki';
const ESSAY_DIR = 'content/essays';
const DB_PATH = 'docs/sources/forensic_database.json';

const CORE_NODES = [
  'behavioral_gravity',
  'sub_objects',
  'resurrection_of_structure',
  'the_machine',
  'well_water_principle',
  'c_mirroring'
];

function audit() {
  console.log('--- AGGRESSIVE KNOWLEDGE AUDIT START ---');

  const wikiFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
  const essayFiles = fs.readdirSync(ESSAY_DIR).filter(f => f.endsWith('.md'));
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const wikiSlugs = wikiFiles.map(f => f.replace('.md', ''));
  const essaySlugs = essayFiles.map(f => f.replace('.md', ''));
  const allFileSlugs = [...wikiSlugs, ...essaySlugs];

  const dbSlugs = [
    ...db.nodes.map(n => n.slug),
    ...db.essays.map(e => e.slug)
  ];

  let errors = 0;

  // 1. Untracked File Detection
  allFileSlugs.forEach(slug => {
    if (!dbSlugs.includes(slug)) {
      console.error(`CRITICAL ERROR: Untracked file detected: ${slug}.md (Not in forensic_database.json)`);
      errors++;
    }
  });

  // 2. Integration Block Verification
  CORE_NODES.forEach(slug => {
    const filePath = path.join(WIKI_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasVol1Alignment = content.includes('## Forensic Alignment');
      const hasVol2Root = content.includes('### Axiomatic Root');
      
      if (!hasVol1Alignment && !hasVol2Root) {
        console.error(`CRITICAL ERROR: Core node '${slug}' is missing an integration block.`);
        errors++;
      }
    } else {
      console.error(`CRITICAL ERROR: Core node '${slug}' is missing from the filesystem.`);
      errors++;
    }
  });

  // 3. Link Integrity
  wikiFiles.forEach(file => {
    const content = fs.readFileSync(path.join(WIKI_DIR, file), 'utf8');
    const relativeLinks = content.match(/\/wiki\/node\/(.*?)[)\s]/g);
    if (relativeLinks) {
      relativeLinks.forEach(link => {
        const slug = link.split('/').pop().replace(/[)\s]/g, '').trim();
        if (!wikiSlugs.includes(slug)) {
          console.error(`ERROR in ${file}: Broken route /wiki/node/${slug}`);
          errors++;
        }
      });
    }
  });

  console.log('--- AUDIT COMPLETE ---');
  console.log(`Critical Errors: ${errors}`);
  if (errors > 0) {
    console.error('SYSTEM SHUTDOWN: FORCED INTEGRITY FAILURE');
    process.exit(1);
  }
}

audit();
