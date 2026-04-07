import { toSlug } from './slugs';
import { CONTENT_MAP } from './content_map';

/**
 * Transforms internal references into functional markdown links.
 * 1. [[WikiLink]] or [[slug|Title]] -> Correct categorical path
 * 2. Sanitize standard markdown links to correct categories
 */
export function transformWikiLinks(content: string): string {
  if (!content) return '';

  const getPath = (slug: string) => {
    const entry = CONTENT_MAP[slug];
    if (entry) {
      if (entry.category === 'wiki/mechanics') return '/wiki/mechanics/';
      if (entry.category === 'wiki/testimonies') return '/wiki/testimonies/';
      if (entry.category === 'wiki/bible') return '/wiki/bible/';
    }
    
    // Fallback heuristic if not in map
    const isEssay = slug.startsWith('01_') || slug.includes('ch');
    return isEssay ? '/wiki/testimonies/' : '/wiki/mechanics/';
  };

  // 1. Handle [[slug|title]] - slugified
  let transformed = content.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, rawSlug, title) => {
    const slug = toSlug(rawSlug);
    const path = getPath(slug);
    return `[${title}](${path}${slug})`;
  });

  // 2. Handle [[slug]] - slugified
  transformed = transformed.replace(/\[\[(.*?)\]\]/g, (match, rawSlug) => {
    const slug = toSlug(rawSlug);
    const path = getPath(slug);
    const displayTitle = rawSlug.replace(/_/g, ' ');
    return `[${displayTitle}](${path}${slug})`;
  });

  // 3. Sanitize standard markdown links [Title](/wiki/mechanics/Target Name) or [Title](/wiki/testimonies/Target Name)
  transformed = transformed.replace(/\[(.*?)\]\((?:\/wiki\/node\/|\/wiki\/nodes\/|\/essays\/|\/wiki\/essays\/|\/wiki\/bible\/|\/wiki\/mechanics\/|\/wiki\/testimonies\/)(.*?)\)/g, (match, title, rawPath) => {
    const slug = toSlug(rawPath);
    const path = getPath(slug);
    return `[${title}](${path}${slug})`;
  });

  return transformed;
}
