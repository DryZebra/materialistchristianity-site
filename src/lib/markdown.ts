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
      return `/${entry.category}/`;
    }
    
    // Fallback heuristic if not in map
    const isEssay = slug.startsWith('01_') || slug.includes('ch');
    return isEssay ? '/wiki/labor-and-torque/' : '/wiki/structural-proofs/';
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

  // 3. Sanitize standard markdown links [Title](/wiki/...)
  // This covers all old and new prefixes to ensure consistency
  transformed = transformed.replace(/\[(.*?)\]\((?:\/wiki\/node\/|\/wiki\/nodes\/|\/essays\/|\/wiki\/essays\/|\/wiki\/bible\/|\/wiki\/mechanics\/|\/wiki\/testimonies\/|\/wiki\/structural-proofs\/|\/wiki\/mechanical-failures\/|\/wiki\/labor-and-torque\/|\/wiki\/ideological-resistance\/|\/wiki\/the-blueprint-exegesis\/)(.*?)\)/g, (match, title, rawPath) => {
    const slug = toSlug(rawPath);
    const path = getPath(slug);
    return `[${title}](${path}${slug})`;
  });

  return transformed;
}
