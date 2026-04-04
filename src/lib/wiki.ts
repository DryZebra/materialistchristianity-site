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

  return fs.readdirSync(contentPath)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentPath, f));
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


// Wiki Nodes (Axioms/Mechanics)
export function getAllWikiNodes(): ContentNode[] {
  return getFilesFromDir('content/wiki').map(parseContentFile).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getWikiNodeBySlug(slug: string): ContentNode | null {
  const nodes = getAllWikiNodes();
  return nodes.find(node => node.slug === slug) || null;
}

// Essays (Testimony)
export function getAllEssays(): ContentNode[] {
  return getFilesFromDir('content/essays').map(parseContentFile).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getEssayBySlug(slug: string): ContentNode | null {
  const essays = getAllEssays();
  return essays.find(e => e.slug === slug) || null;
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
