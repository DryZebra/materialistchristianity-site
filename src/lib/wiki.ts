import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WikiNode {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  related: string[];
  content: string;
}

export function getAllWikiNodes(): WikiNode[] {
  const contentPath = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentPath)) return [];

  const files = fs.readdirSync(contentPath);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      const fullPath = path.join(contentPath, file);
      const rawContent = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(rawContent);
      
      return {
        slug,
        title: data.title || slug,
        description: data.description || 'A node in the materialist record.',
        category: data.category || 'General',
        tags: data.tags || [],
        related: data.related || [],
        content: content.trim()
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getWikiNodeBySlug(slug: string): WikiNode | null {
  const nodes = getAllWikiNodes();
  return nodes.find(node => node.slug === slug) || null;
}

export function getNodesByCategory(): Record<string, WikiNode[]> {
  const nodes = getAllWikiNodes();
  const categories: Record<string, WikiNode[]> = {};

  nodes.forEach(node => {
    if (!categories[node.category]) {
      categories[node.category] = [];
    }
    categories[node.category].push(node);
  });

  return categories;
}
