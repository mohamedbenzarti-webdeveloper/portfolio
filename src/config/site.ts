/**
 * Global, language-independent site configuration.
 * Translated text (role, location, descriptions…) lives in src/i18n/dictionaries.
 *
 * While a value still contains a placeholder marker, the UI renders it as
 * non-clickable text tagged "placeholder" so the site never ships a broken link.
 */
/**
 * Production URL, in order of priority:
 * 1. NEXT_PUBLIC_SITE_URL (set it once you have a custom domain),
 * 2. the production domain Vercel provides automatically,
 * 3. localhost for local development.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Mohamed Benzarti",
  initials: "MB",
  timeZone: "Africa/Tunis",
  // Public site URL (SEO, sitemap, Open Graph). See resolveSiteUrl() above.
  url: resolveSiteUrl(),
  contact: {
    email: "mohamed.benzarti@esen.tn",
    linkedin: "https://www.linkedin.com/in/mohamed-benzarti-a1208b2a6",
    github: "https://github.com/mohamedbenzarti-webdeveloper",
  },
} as const;

export const navIds = ["about", "skills", "work", "services", "journey", "contact"] as const;
export type NavId = (typeof navIds)[number];

const PLACEHOLDER_MARKERS = ["example.com", "your-profile", "your-username", "your-domain"];

/** True while a config value still holds placeholder content. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return PLACEHOLDER_MARKERS.some((marker) => value.includes(marker));
}
