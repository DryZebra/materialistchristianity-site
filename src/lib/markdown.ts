import { toSlug } from './slugs';

/**
 * Transforms internal references into functional markdown links.
 * 1. [[WikiLink]] or [[slug|Title]] -> [Title](/wiki/node/slug)
 * 2. [Title](/wiki/node/Raw Path) -> [Title](/wiki/node/raw_path)
 */
export function transformWikiLinks(content: string): string {
  if (!content) return '';

  // 1. Handle [[slug|title]] - slugified
  let transformed = content.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, rawSlug, title) => {
    const slug = toSlug(rawSlug);
    const isEssay = slug.startsWith('01_');
    const path = isEssay ? '/essays/' : '/wiki/node/';
    return `[${title}](${path}${slug})`;
  });

  // 2. Handle [[slug]] - slugified
  transformed = transformed.replace(/\[\[(.*?)\]\]/g, (match, rawSlug) => {
    const slug = toSlug(rawSlug);
    const isEssay = slug.startsWith('01_');
    const path = isEssay ? '/essays/' : '/wiki/node/';
    const displayTitle = rawSlug.replace(/_/g, ' ');
    return `[${displayTitle}](${path}${slug})`;
  });

  // 3. Sanitize standard markdown links [Title](/wiki/node/Target Name) or [Title](/essays/Target Name)
  transformed = transformed.replace(/\[(.*?)\]\((?:\/wiki\/node\/|\/essays\/)(.*?)\)/g, (match, title, rawPath) => {
    const slug = toSlug(rawPath);
    const isEssay = slug.startsWith('01_');
    const path = isEssay ? '/essays/' : '/wiki/node/';
    return `[${title}](${path}${slug})`;
  });

  return transformed;
}
