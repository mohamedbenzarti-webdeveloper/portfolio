"use client";

import { useParams } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import ar from "@/i18n/dictionaries/ar";
import en from "@/i18n/dictionaries/en";
import fr from "@/i18n/dictionaries/fr";
import { rich } from "@/lib/rich";
import { ButtonLink } from "@/components/ui/ButtonLink";

const texts = { en: en.notFound, fr: fr.notFound, ar: ar.notFound };

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = texts[locale];

  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <title>{t.label}</title>
      <meta name="robots" content="noindex" />
      <p className="eyebrow text-muted">{t.label}</p>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
        {rich(t.title)}
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">{t.text}</p>
      <div className="mt-10">
        <ButtonLink href={`/${locale}`}>{t.home}</ButtonLink>
      </div>
    </section>
  );
}
