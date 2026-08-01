import { toSlug } from './slugs';
import { getLinkPath } from './wiki';

/**
 * Transforms internal references into functional markdown links.
 * 1. [[WikiLink]] or [[slug|Title]] -> Correct canonical path
 * 2. Sanitize standard markdown links to correct canonical paths
 */
export function transformWikiLinks(content: string): string {
  if (!content) return '';

  // 1. Handle [[slug|title]] - slugified
  let transformed = content.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, rawSlug, title) => {
    const slug = toSlug(rawSlug);
    const linkPath = getLinkPath(slug);
    return `[${title}](${linkPath})`;
  });

  // 2. Handle [[slug]] - slugified
  transformed = transformed.replace(/\[\[(.*?)\]\]/g, (match, rawSlug) => {
    const slug = toSlug(rawSlug);
    const linkPath = getLinkPath(slug);
    const displayTitle = rawSlug.replace(/_/g, ' ');
    return `[${displayTitle}](${linkPath})`;
  });

  // 3. Sanitize standard markdown links [Title](/wiki/...) or [Title](slug)
  transformed = transformed.replace(/\[(.*?)\]\((?:\/wiki\/[^)]+?\/|\/)?([a-zA-Z0-9_-]+)\)/g, (match, title, rawSlug) => {
    // If it's an external link or fragment link, don't rewrite
    if (rawSlug.startsWith('http') || rawSlug.startsWith('#')) return match;
    const slug = toSlug(rawSlug);
    const linkPath = getLinkPath(slug);
    return `[${title}](${linkPath})`;
  });

  return transformed;
}
