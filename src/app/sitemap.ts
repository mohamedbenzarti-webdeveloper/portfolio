import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((project) => `/projects/${project.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
