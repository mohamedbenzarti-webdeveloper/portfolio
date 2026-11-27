export type Theme = "dark" | "light";
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script run before paint so the stored theme applies without a flash.
 * Falls back to dark, the site's signature look.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})()`;

/** Theme saved by the visitor, or dark by default. */
export function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}
