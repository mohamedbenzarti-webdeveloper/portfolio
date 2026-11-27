import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { isLocale, languageAlternates, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--ff-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--ff-mono", display: "swap" });
// Fallback face for Arabic glyphs; only downloaded when Arabic text is on screen.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-arabic",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s · ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].og,
      url: `/${locale}`,
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true },
    // The site ships its own EN/FR/AR versions: hide Chrome's "Translate this page" prompt.
    other: { google: "notranslate" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      translate="no"
      dir={localeMeta[locale].dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body id="top">
        {/* Applies the saved theme before first paint (no flash). */}
        <ThemeScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-200 focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          {dict.nav.skip}
        </a>
        <MotionProvider>
          <Header locale={locale} nav={dict.nav} tagline={`${dict.site.role} · ${dict.site.location}`} />
          <main id="main" tabIndex={-1} className="outline-none">
            {props.children}
          </main>
          <Footer dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
