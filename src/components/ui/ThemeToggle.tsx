"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** Live current theme, re-rendering whenever data-theme changes. */
export function useTheme() {
  return useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");
}

type ThemeToggleProps = { labels: { toLight: string; toDark: string } };

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice simply isn't remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-contrast/40"
    >
      <span className="sr-only">{theme === "dark" ? labels.toLight : labels.toDark}</span>
      {theme === "dark" ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
