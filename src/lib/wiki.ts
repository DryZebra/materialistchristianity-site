import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CONTENT_MAP } from './content_map';

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
  url: string; // Correctly resolved URL
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
    content: content.trim(),
    url: `${getLinkPath(slug)}${slug}`
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

// Essays (merged into labor-and-torque)
export function getAllEssays(): ContentNode[] {
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
 * by checking the CONTENT_MAP or the filesystem.
 */
export function getLinkPath(slug: string): string {
  const entry = CONTENT_MAP[slug];
  if (entry) {
    return `/${entry.category}/`;
  }

  // Fallback check for Blueprint
  try {
    if (getFilesFromDir('content/wiki/the-blueprint-exegesis').some(f => path.basename(f, '.md') === slug)) {
      return '/wiki/the-blueprint-exegesis/';
    }
  } catch (e) {
    // Silent fail for directory check
  }

  console.warn(`[WIKI] Path resolution failed for slug: ${slug}. Defaulting to structural-proofs.`);
  // Default to structural-proofs if unknown
  return '/wiki/structural-proofs/';
}
