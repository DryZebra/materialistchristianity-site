/**
 * Transforms [[WikiLink]] or [[slug|Title]] into markdown links [Title](/path/slug).
 * Differentiates between Essays (starting with 01_) and Wiki Nodes.
 */
export function transformWikiLinks(content: string): string {
  if (!content) return '';

  // Handle [[slug|title]]
  const withTitles = content.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, slug, title) => {
    const isEssay = slug.startsWith('01_'); // Essays follow the 01_ prefix convention
    const path = isEssay ? '/essays/' : '/wiki/node/';
    return `[${title}](${path}${slug})`;
  });

  // Handle [[slug]]
  const simple = withTitles.replace(/\[\[(.*?)\]\]/g, (match, slug) => {
    const isEssay = slug.startsWith('01_');
    const path = isEssay ? '/essays/' : '/wiki/node/';
    const displayTitle = slug.replace(/_/g, ' ');
    return `[${displayTitle}](${path}${slug})`;
  });

  return simple;
}
