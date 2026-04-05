import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const WIKI_DIR = 'content/wiki';
const ESSAY_DIR = 'content/essays';
const BIBLE_DIR = 'content/bible';
const DB_PATH = 'docs/sources/forensic_database.json';

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

function sync() {
  console.log('--- DATABASE SYNC START ---');

  const wikiFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
  const essayFiles = fs.readdirSync(ESSAY_DIR).filter(f => f.endsWith('.md'));
  const bibleFiles = fs.existsSync(BIBLE_DIR) ? getFilesRecursively(BIBLE_DIR) : [];

  const nodes = wikiFiles.map(file => {
    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const slug = file.replace('.md', '');
    
    // Determine volume and type
    let volume = 1;
    let type = 'Axiom';
    if (data.date || [
      'the_machine', 'c_mirroring', 'the_meta_self', 'well_water_principle', 
      'redneck_dictatorship', 'fractal_theory_of_self', '4d_time_snake'
    ].includes(slug)) {
      volume = 2;
      type = 'Forensic';
    }

    return {
      slug,
      title: data.title || slug.replace(/_/g, ' '),
      volume,
      type,
      integration_status: content.includes('## Forensic Alignment') || content.includes('### Axiomatic Root') ? 'Integrated' : 'Tracked'
    };
  });

  const bibleNodes = bibleFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const relativePath = path.relative(BIBLE_DIR, filePath);
    const slug = relativePath.replace(/\\/g, '/').replace('.md', '');

    return {
      slug: `bible/${slug}`,
      title: data.title || slug,
      volume: 3,
      type: 'Verse',
      integration_status: 'Integrated'
    };
  });

  const allNodes = [...nodes, ...bibleNodes];

  const essays = essayFiles.map(file => {
    const filePath = path.join(ESSAY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    const slug = file.replace('.md', '');

    return {
      slug,
      title: data.title || slug.replace(/_/g, ' '),
      volume: 2,
      topic: data.category || 'General'
    };
  });

  const db = {
    project: "Materialist Christianity",
    last_updated: new Date().toISOString().split('T')[0],
    nodes: allNodes,
    essays
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  console.log(`--- DATABASE SYNC COMPLETE: ${allNodes.length} nodes, ${essays.length} essays tracked. ---`);
}

sync();
