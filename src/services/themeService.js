const THEME_LOCAL_STORAGE_KEY = 'theme';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

const APP_THEMES = [DARK_THEME, LIGHT_THEME];

/**
 * Retrieve the current set app theme if it has been previously set
 * @returns {string}
 */
export function getTheme() {
  try {
    const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (!theme) {
      return DARK_THEME;
    }

    if (!APP_THEMES.includes(theme)) {
      return DARK_THEME;
    }

    return theme;
  } catch (e) {
    console.error('Local storage is not supported');
  }
}

/**
 * Set current app theme
 * @param {string} theme
 */
export function setTheme(theme) {
  if (!theme || !APP_THEMES.includes(theme)) {
    console.error('Could not set theme');

    return;
  }

  try {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
  } catch (e) {
    console.error('Local storage is not supported');
  }
}
