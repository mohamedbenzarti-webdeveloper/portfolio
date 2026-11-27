"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Same page in another language: swaps the first path segment. */
export function localizedPath(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

/** Remembers the choice so "/" redirects to it next time (read by src/proxy.ts). */
function rememberLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
  size?: "sm" | "lg";
};

export function LanguageSwitcher({ current, label, className, size = "sm" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          "flex items-center rounded-full border border-line-strong p-1",
          size === "lg" && "w-fit",
        )}
      >
        {locales.map((locale) => {
          const active = locale === current;
          const meta = localeMeta[locale];
          return (
            <li key={locale}>
              <Link
                href={localizedPath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "page" : undefined}
                onClick={() => rememberLocale(locale)}
                className={cn(
                  "grid place-items-center rounded-full font-mono transition-colors",
                  size === "sm" ? "h-8 min-w-9 px-2 text-[0.6875rem]" : "h-11 min-w-14 px-4 text-sm",
                  active ? "bg-fg text-ink" : "text-muted hover:text-fg",
                )}
              >
                <span aria-hidden="true">{meta.short}</span>
                <span className="sr-only">{meta.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
