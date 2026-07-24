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
  related: string[];
  references: string[];
  content: string;
  url: string;
}

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      if (!file.startsWith('_') && !file.includes('archive')) {
        results = results.concat(getFilesRecursively(filePath));
      }
    } else if (file.endsWith('.md') && file !== 'index.md' && file !== 'README.md') {
      results.push(filePath);
    }
  });

  return results;
}

function parseContentFile(fullPath: string): ContentNode {
  const slug = path.basename(fullPath, '.md');
  const rawContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(rawContent);

  const relativePath = path.relative(path.join(process.cwd(), 'content/wiki'), fullPath);
  const pathParts = relativePath.split(path.sep);
  const derivedCategory = pathParts.length > 1 ? pathParts[0] : 'general';

  const category = data.category || derivedCategory;

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' ').toUpperCase(),
    description: data.description || 'A forensic node in the Materialist Christianity Knowledge Base.',
    category,
    tags: data.tags || [],
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    related: data.related || [],
    references: data.references || [],
    content: content.trim(),
    url: `/wiki/${category}/${slug}`
  };
}

export function getAllWikiNodes(): ContentNode[] {
  const baseDir = path.join(process.cwd(), 'content/wiki');
  const files = getFilesRecursively(baseDir);
  
  const nodes = files.map(parseContentFile);
  const uniqueNodes = Array.from(new Map(nodes.map(node => [node.slug, node])).values());

  return uniqueNodes.sort((a, b) => a.title.localeCompare(b.title));
}

export function getWikiNodeBySlug(slug: string): ContentNode | null {
  const nodes = getAllWikiNodes();
  return nodes.find(node => node.slug === slug) || null;
}

export function getAllEssays(): ContentNode[] {
  return getAllWikiNodes().filter(n => n.category === '03-labor-and-torque');
}

export function getEssayBySlug(slug: string): ContentNode | null {
  return getWikiNodeBySlug(slug);
}

export function getAllBibleTranslations(): ContentNode[] {
  return getAllWikiNodes().filter(n => n.category === '04-verse-forensics');
}

export function getBibleBySlug(slug: string): ContentNode | null {
  return getWikiNodeBySlug(slug);
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

export function getLinkPath(slug: string, category?: string): string {
  const node = getWikiNodeBySlug(slug);
  if (node) {
    return `/wiki/${node.category}/${node.slug}`;
  }
  if (category) {
    return `/wiki/${category}`;
  }
  return '/wiki';
}
