"use client";

import { motion } from "motion/react";
import { journeyStatus, type JourneyStatus } from "@/data/content";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const statusStyles: Record<JourneyStatus, string> = {
  completed: "border-line-strong text-muted",
  inProgress: "border-purple/60 text-fg",
  ongoing: "border-pink/60 text-fg",
};

const dotColors = ["bg-purple", "bg-pink", "bg-blue"];

export function Journey({ t }: { t: Dictionary["journey"] }) {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading index="05" label={t.label} id="journey-title" title={t.title} />

        <div className="relative">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 start-1.25 w-px bg-line lg:inset-x-0 lg:top-1.25 lg:bottom-auto lg:h-px lg:w-auto"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
            className="absolute top-2 bottom-2 start-1.25 w-px origin-top bg-linear-to-b from-purple via-pink to-blue lg:inset-x-0 lg:top-1.25 lg:bottom-auto lg:h-px lg:w-auto lg:origin-left lg:bg-linear-to-r rtl:lg:origin-right rtl:lg:bg-linear-to-l"
          />

          <ol className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {t.steps.map((step, i) => {
              const status = journeyStatus[i] ?? "ongoing";
              return (
                <li key={step.phase} className="relative ps-10 lg:ps-0 lg:pt-14">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 start-0 size-2.75 rounded-full border-2 border-ink lg:top-0",
                      dotColors[i % dotColors.length],
                    )}
                  />
                  <Reveal delay={0.12 * i} y={20}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-dim">
                        {String(i + 1).padStart(2, "0")} · {step.phase}
                      </span>
                      <span
                        className={cn(
                          "eyebrow rounded-full border px-2.5 py-1 text-[0.625rem]!",
                          statusStyles[status],
                        )}
                      >
                        {t.status[status]}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-fg/90">{step.detail}</p>
                    <p className="mt-4 max-w-sm leading-relaxed text-muted">{step.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
