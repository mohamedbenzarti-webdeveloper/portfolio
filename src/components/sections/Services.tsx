import { serviceIcons } from "@/data/content";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading index="04" label={t.label} id="services-title" title={t.title} intro={t.intro} />

        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {t.items.map(({ title, text }, i) => {
              const Icon = serviceIcons[i];
              return (
                <li
                  key={title}
                  className="group relative flex flex-col bg-ink p-7 transition-colors duration-500 hover:bg-surface md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="relative grid size-12 place-items-center rounded-full border border-line-strong transition-colors group-hover:text-white">
                      <span className="bg-signal absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {Icon ? <Icon className="relative size-5" strokeWidth={1.6} aria-hidden="true" /> : null}
                    </span>
                    <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight md:mt-14">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{text}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
