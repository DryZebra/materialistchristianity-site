import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';

const STAGING_DIRS = ['docs/testimony/axioms', 'docs/testimony/essays'];
const WIKI_DIR = 'content/wiki';
const ESSAY_DIR = 'content/essays';

function toSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');
}

async function publish() {
  console.log('🏛️ Starting Forensic Ingestion Engine...');

  const publishedSlugs = [];

  for (const stagingDir of STAGING_DIRS) {
    const dirPath = path.join(process.cwd(), stagingDir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);

      const slug = toSlug(frontmatter.title || path.basename(file, '.md'));
      const type = frontmatter.type; // 'Axiom' or 'Essay'
      const targetDir = type === 'Axiom' ? WIKI_DIR : ESSAY_DIR;
      const targetPath = path.join(process.cwd(), targetDir, `${slug}.md`);

      console.log(`\n📄 Processing Testimony: ${frontmatter.title} [${type}]`);

      // 1. Move/Write the file to production
      // We overwrite existing files in production with the sanitized staging version
      fs.writeFileSync(targetPath, fileContent);
      publishedSlugs.push({ slug, title: frontmatter.title, tags: frontmatter.tags || [], type });

      // 2. Structural Re-Alignment (Deepening existing nodes)
      if (type === 'Axiom' || type === 'Essay') {
        alignKnowledgeHub(slug, frontmatter);
      }
    }
  }

  // 3. Finalize
  console.log('\n⚙️ Running Forensic Sanitization...');
  execSync('node scripts/sanitize-content.mjs', { stdio: 'inherit' });

  console.log('⚙️ Running Final Connectivity Audit...');
  execSync('node scripts/validate-links.mjs', { stdio: 'inherit' });

  console.log('\n✅ Forensic Ingestion Complete. Hub Logic Re-Aligned.');
}

function alignKnowledgeHub(newSlug, newMeta) {
  const wikiFiles = fs.readdirSync(path.join(process.cwd(), WIKI_DIR)).filter(f => f.endsWith('.md'));
  const newTags = newMeta.tags || [];

  for (const wikiFile of wikiFiles) {
    const wikiPath = path.join(process.cwd(), WIKI_DIR, wikiFile);
    const fileContent = fs.readFileSync(wikiPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    const wikiSlug = path.basename(wikiFile, '.md');

    if (wikiSlug === newSlug) continue; // Don't deepen yourself

    let deepeningRequired = false;

    // Check for Tag Overlap
    const wikiTags = frontmatter.tags || [];
    const hasTagOverlap = newTags.some(tag => wikiTags.includes(tag));

    // Check for Keyword overlap in description or title
    const hasKeywordOverlap = frontmatter.title.toLowerCase().includes(newMeta.title.toLowerCase()) || 
                             content.toLowerCase().includes(newMeta.title.toLowerCase());

    if (hasTagOverlap || hasKeywordOverlap) {
      deepeningRequired = true;
    }

    if (deepeningRequired) {
      console.log(`   -> Deepening Node: ${frontmatter.title}`);
      
      // Update Related Frontmatter
      if (!frontmatter.related) frontmatter.related = [];
      if (!frontmatter.related.includes(newSlug)) {
        frontmatter.related.push(newSlug);
      }

      // Append Forensic Expansion Block
      let newContent = content;
      const expansionMarker = `<!-- FORENSIC_EXPANSION_${newSlug} -->`;
      
      if (!content.includes(expansionMarker)) {
        const expansionBlock = `\n\n${expansionMarker}\n## Forensic Expansion: ${newMeta.title}\n\nThis node has been deepened by the testimony of [[${newSlug}]]. The structural logic of this archive now reflects the following discovery:\n\n> "${newMeta.description || 'Forensic coordinates locked.'}"\n\n---\n`;
        newContent = content.trim() + expansionBlock;
      }

      const updatedFile = matter.stringify(newContent, frontmatter);
      fs.writeFileSync(wikiPath, updatedFile);
    }
  }
}

publish().catch(err => {
  console.error('❌ Ingestion Failed:', err);
  process.exit(1);
});
