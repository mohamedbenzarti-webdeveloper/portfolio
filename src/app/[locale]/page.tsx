import { notFound } from "next/navigation";
import { isPlaceholder, siteConfig } from "@/config/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

const sameAs = [siteConfig.contact.linkedin, siteConfig.contact.github].filter(
  (url) => !isPlaceholder(url),
);

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: dict.site.role,
    url: `${siteConfig.url}/${locale}`,
    address: { "@type": "PostalAddress", addressCountry: "TN" },
    knowsAbout: ["Web Development", "React", "Next.js", "TypeScript", "Node.js", "IoT", "E-commerce"],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero t={dict.hero} site={dict.site} />
      <About t={dict.about} />
      <Skills t={dict.skills} />
      <Projects locale={locale} t={dict.work} covers={dict.covers} />
      <Services t={dict.services} />
      <Journey t={dict.journey} />
      <Contact t={dict.contact} />
    </>
  );
}
