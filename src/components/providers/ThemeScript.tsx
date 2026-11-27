"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useRef } from "react";
import { readStoredTheme, themeInitScript } from "@/lib/theme";

/**
 * Inserts the theme init script into the server HTML only, so the saved theme
 * applies before first paint without React's "script tag" dev warning.
 * It runs on the initial document; the data-theme attribute it sets on <html>
 * persists across client-side navigations. Switching language swaps the root
 * layout and rebuilds <html>, so the effect below re-applies the saved theme.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function ThemeScript() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
  });

  useEffect(() => {
    const theme = readStoredTheme();
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, []);

  return null;
}
