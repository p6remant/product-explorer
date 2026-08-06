export const THEME = {
  light: "light",
  dark: "dark",
} as const;

export type ThemeMode = (typeof THEME)[keyof typeof THEME];

const themeModes = new Set<string>(Object.values(THEME));

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return value !== undefined && themeModes.has(value);
}

export function getOppositeTheme(mode: ThemeMode): ThemeMode {
  return mode === THEME.dark ? THEME.light : THEME.dark;
}

export const THEME_COOKIE_KEY = "app-theme";

export function parseThemeCookie(
  rawCookieValue: string | undefined,
): ThemeMode | null {
  return isThemeMode(rawCookieValue) ? rawCookieValue : null;
}

export function setThemeCookie(themeMode: ThemeMode) {
  document.cookie = `${THEME_COOKIE_KEY}=${themeMode};path=/;max-age=31536000;SameSite=Lax`;
}

export function applyThemeToDocument(themeMode: ThemeMode) {
  document.documentElement.classList.remove(THEME.light, THEME.dark);
  document.documentElement.classList.add(themeMode);
  document.documentElement.style.colorScheme = themeMode;
}

export function getResolvedThemeFromDocument(): ThemeMode {
  if (document.documentElement.classList.contains(THEME.dark)) {
    return THEME.dark;
  }

  if (document.documentElement.classList.contains(THEME.light)) {
    return THEME.light;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME.dark
    : THEME.light;
}
