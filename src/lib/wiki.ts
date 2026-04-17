import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentNode {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  related: string[]; // Slugs of other nodes
  references: string[]; // Slugs of essays
  content: string;
}


function getFilesFromDir(dir: string): string[] {
  const contentPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(contentPath)) return [];

  const walk = (currentDir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(currentDir);

    list.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else if (file.endsWith('.md')) {
        results.push(filePath);
      }
    });

    return results;
  };

  return walk(contentPath);
}

function parseContentFile(fullPath: string): ContentNode {
  const slug = path.basename(fullPath, '.md');
  const rawContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(rawContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || 'A node in the materialist record.',
    category: data.category || 'General',
    tags: data.tags || [],
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    related: data.related || [],
    references: data.references || [],
    content: content.trim()
  };
}


// General Wiki Nodes (Structural Proofs, Mechanical Failures, Labor & Torque, Ideological Resistance)
export function getAllWikiNodes(): ContentNode[] {
  // Scan all folders in content/wiki EXCEPT the-blueprint-exegesis
  const baseDir = path.join(process.cwd(), 'content/wiki');
  if (!fs.existsSync(baseDir)) return [];
  const items = fs.readdirSync(baseDir, { withFileTypes: true });
  
  let allNodes: ContentNode[] = [];
  
  items.forEach(item => {
    if (item.isDirectory() && item.name !== 'the-blueprint-exegesis' && !item.name.startsWith('_')) {
      allNodes = allNodes.concat(getFilesFromDir(`content/wiki/${item.name}`).map(parseContentFile));
    }
  });

  // Return unique slugs only (favoring newer organization if duplicates exist)
  const uniqueNodes = Array.from(new Map(allNodes.map(node => [node.slug, node])).values());

  return uniqueNodes.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getWikiNodeBySlug(slug: string): ContentNode | null {
  const nodes = getAllWikiNodes();
  return nodes.find(node => node.slug === slug) || null;
}

// Essays (deprecated, merged into labor-and-torque)
export function getAllEssays(): ContentNode[] {
  // Returning empty or subset if needed, currently we just point to labor-and-torque as the essay bucket
  return getFilesFromDir('content/wiki/labor-and-torque').map(parseContentFile).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getEssayBySlug(slug: string): ContentNode | null {
  const essays = getAllEssays();
  return essays.find(e => e.slug === slug) || null;
}

// Blueprint Exegesis (formerly Bible Translations)
export function getAllBibleTranslations(): ContentNode[] {
  return getFilesFromDir('content/wiki/the-blueprint-exegesis').map(parseContentFile).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getBibleBySlug(slug: string): ContentNode | null {
  const bibles = getAllBibleTranslations();
  return bibles.find(b => b.slug === slug) || null;
}

export function getNodesByCategory(): Record<string, ContentNode[]> {
  const nodes = getAllWikiNodes();
  const categories: Record<string, ContentNode[]> = {};

  nodes.forEach(node => {
    if (!categories[node.category]) {
      categories[node.category] = [];
    }
    categories[node.category].push(node);
  });

  return categories;
}

/**
 * Returns the correct wiki path prefix
 * by checking the filesystem for the slug's existence.
 */
export function getLinkPath(slug: string): string {
  if (getFilesFromDir('content/wiki/structural-proofs').map(parseContentFile).some(n => n.slug === slug)) return '/wiki/structural-proofs/';
  if (getFilesFromDir('content/wiki/mechanical-failures').map(parseContentFile).some(n => n.slug === slug)) return '/wiki/mechanical-failures/';
  if (getFilesFromDir('content/wiki/labor-and-torque').map(parseContentFile).some(n => n.slug === slug)) return '/wiki/labor-and-torque/';
  if (getFilesFromDir('content/wiki/ideological-resistance').map(parseContentFile).some(n => n.slug === slug)) return '/wiki/ideological-resistance/';
  
  const bibles = getAllBibleTranslations();
  if (bibles.some(b => b.slug === slug)) return '/wiki/the-blueprint-exegesis/';
 
  // Fallback
  return '/wiki/structural-proofs/';
}
