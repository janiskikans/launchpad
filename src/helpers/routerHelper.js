const DEFAULT_TITLE = 'Launchpad';

/**
 * Build document title
 * @param {string|null} title
 * @return {string}
 */
export function buildPageTitle(title) {
  if (!title) {
    return DEFAULT_TITLE;
  }

  return `${title} - ${DEFAULT_TITLE}`;
}
