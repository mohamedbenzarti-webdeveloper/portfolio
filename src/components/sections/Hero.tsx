"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";
import { SignalField } from "@/components/hero/SignalField";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LocalClock } from "@/components/ui/LocalClock";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
});

type HeroProps = {
  t: Dictionary["hero"];
  site: Dictionary["site"];
};

export function Hero({ t, site }: HeroProps) {
  const meta = [
    { term: t.basedIn, value: site.location },
    { term: t.role, value: site.role },
    {
      term: t.localTime,
      value: (
        <span dir="ltr">
          <LocalClock /> <span className="text-dim">GMT+1</span>
        </span>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 pb-10 md:pt-32 lg:pb-12"
    >
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-48 -end-[12%] size-168 rounded-full bg-purple/16 blur-[140px]" />
        <div className="absolute -start-[15%] -bottom-[25%] size-136 rounded-full bg-blue/8 blur-[140px]" />
      </div>

      {/* Generative visual */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
        className="pointer-events-none absolute top-14 -end-[38%] -z-10 aspect-square w-[118vw] opacity-55 sm:-end-[22%] sm:w-[86vw] md:top-10 md:opacity-75 lg:top-1/2 lg:-end-[3%] lg:w-[min(54vw,800px)] lg:-translate-y-[54%] lg:opacity-100"
      >
        <SignalField className="size-full" />
        <span className="eyebrow absolute top-[12%] end-[10%] hidden text-dim lg:block">{t.fig}</span>
      </motion.div>

      <div className="container-page flex flex-1 flex-col">
        <motion.p
          {...fadeUp(0)}
          className="eyebrow inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-ink/60 py-2 ps-3 pe-4 text-fg backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-live" />
            <span className="relative size-2 rounded-full bg-live" />
          </span>
          {t.badge}
        </motion.p>

        <h1
          id="hero-title"
          className="mt-8 max-w-[15ch] font-display text-[clamp(3rem,7.2vw,7.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] md:mt-9"
        >
          <HeadlineLine delay={0.1}>{rich(t.line1)}</HeadlineLine>
          <HeadlineLine delay={0.22}>{rich(t.line2)}</HeadlineLine>
        </h1>

        <div className="mt-auto grid gap-12 pt-14 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.div {...fadeUp(0.45)} className="lg:col-span-6 xl:col-span-5">
            <p className="max-w-136 text-lg leading-relaxed text-muted md:text-xl">{t.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#work">{t.ctaWork}</ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                {t.ctaContact}
              </ButtonLink>
            </div>
          </motion.div>

          <motion.dl
            {...fadeUp(0.6)}
            className="grid grid-cols-1 border-t border-line text-sm sm:grid-cols-3 lg:col-span-5 lg:col-start-8 lg:grid-cols-1 xl:col-span-4 xl:col-start-9"
          >
            {meta.map((row) => (
              <div
                key={row.term}
                className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 sm:flex-col sm:justify-start sm:gap-1 sm:pe-4 lg:flex-row lg:justify-between lg:pe-0"
              >
                <dt className="eyebrow text-dim">{row.term}</dt>
                <dd className="text-end text-fg sm:text-start lg:text-end">{row.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.a
          {...fadeUp(0.8)}
          href="#about"
          className="eyebrow mt-10 hidden w-fit items-center gap-3 text-dim transition-colors hover:text-fg lg:inline-flex"
        >
          <ArrowDown className="size-3.5" aria-hidden="true" />
          {t.scroll}
        </motion.a>
      </div>
    </section>
  );
}
