/**
 * @param {string} text
 * @param {number} maxLength
 * @return {string}
 */
export function truncate(text, maxLength = 300) {
  const truncatedText = text.substring(0, maxLength).trimEnd();

  return `${truncatedText}...`;
}
