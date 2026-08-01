/**
 * Converts a string into a forensic, lower_snake_case slug.
 * Removes non-alphanumeric characters and replaces spaces with underscores.
 */
export function toSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')      // Replace spaces with underscores
    .replace(/[^\w-]/g, '');  // Remove non-alphanumeric characters (except underscores and hyphens)
}
