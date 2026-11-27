"use client";

import { useState } from "react";
import { levelDots, skillGroups, type SkillLevel } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const levelOrder = Object.keys(levelDots) as SkillLevel[];

function Dots({ count }: { count: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn(
            "size-1.5 rounded-full transition-colors",
            n <= count ? "bg-signal" : "bg-contrast/12",
          )}
        />
      ))}
    </span>
  );
}

const deepening = skillGroups
  .flatMap((group) => group.skills)
  .filter((skill) => skill.level === "deepening")
  .map((skill) => skill.name);

export function Skills({ t }: { t: Dictionary["skills"] }) {
  const [focus, setFocus] = useState<SkillLevel | null>(null);

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading index="02" label={t.label} id="skills-title" title={t.title} intro={t.intro} />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Legend / filter */}
          <Reveal className="mb-12 lg:col-span-3 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p id="skills-legend" className="eyebrow mb-4 text-dim">
                {t.legendTitle}
              </p>
              <div
                role="group"
                aria-labelledby="skills-legend"
                className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col"
              >
                {levelOrder.map((level) => {
                  const info = t.levels[level];
                  const pressed = focus === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setFocus(pressed ? null : level)}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-start transition-colors",
                        pressed
                          ? "border-contrast/35 bg-contrast/5"
                          : "border-line hover:border-line-strong",
                      )}
                    >
                      <Dots count={levelDots[level]} />
                      <span>
                        <span className="block text-sm font-medium text-fg">{info.label}</span>
                        <span className="block text-xs text-dim">{info.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Groups */}
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-4">
            {skillGroups.map((group, gi) => {
              const groupText = t.groups[group.id];
              return (
                <Reveal key={group.id} delay={gi * 0.06}>
                  <div>
                    <div className="border-b border-line-strong pb-4">
                      <p className="font-mono text-[0.6875rem] text-dim" dir="ltr">
                        {String.fromCharCode(65 + gi)} / {String(group.skills.length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">
                        {groupText.title}
                      </h3>
                      <p className="mt-1 text-sm text-dim">{groupText.note}</p>
                    </div>
                    <ul>
                      {group.skills.map((skill) => {
                        const dimmed = focus !== null && focus !== skill.level;
                        return (
                          <li
                            key={skill.name}
                            className={cn(
                              "flex items-center justify-between gap-4 border-b border-line py-3 transition-opacity duration-300",
                              dimmed && "opacity-25",
                            )}
                          >
                            <span className="text-[0.9375rem]" dir="ltr">
                              {skill.name}
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="sr-only">{t.levels[skill.level].label}</span>
                              <Dots count={levelDots[skill.level]} />
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {deepening.length > 0 ? (
          <Reveal className="mt-16 lg:grid lg:grid-cols-12 lg:gap-8">
            <p className="flex flex-col gap-2 border-s-2 border-purple/70 ps-5 text-lg leading-relaxed text-muted sm:flex-row sm:items-baseline sm:gap-4 lg:col-span-9 lg:col-start-4">
              <span className="eyebrow shrink-0 text-dim">{t.deepening}</span>
              <span className="text-fg" dir="ltr">
                {deepening.join(" · ")}
              </span>
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
