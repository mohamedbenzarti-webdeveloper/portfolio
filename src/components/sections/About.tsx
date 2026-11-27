import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { rich } from "@/lib/rich";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionHeading";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad border-t border-line">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3 lg:pt-3">
            <SectionLabel index="01" label={t.label} />
          </Reveal>

          <div className="lg:col-span-9">
            <Reveal>
              <h2
                id="about-title"
                className="max-w-5xl font-display text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
              >
                {rich(t.title)}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
              <Reveal delay={0.05}>
                <p className="text-lg leading-relaxed text-muted">{rich(t.p1)}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted">{rich(t.p2)}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="mt-14 grid grid-cols-2 border-t border-line md:mt-16 lg:grid-cols-4">
                {t.facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={cn(
                      "border-b border-line py-5 pe-4",
                      i % 2 === 1 && "border-s ps-4",
                      i > 0 && "lg:border-s lg:ps-5",
                    )}
                  >
                    <dt className="eyebrow text-dim">{fact.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-snug text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* What I bring */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="eyebrow mb-8 text-muted">{t.bringTitle}</h3>
          </Reveal>
          <ol className="border-t border-line">
            {t.strengths.map((item, i) => (
              <li key={item.title} className="border-b border-line">
                <Reveal y={16} delay={i * 0.04}>
                  <div className="group relative grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
                    <span
                      aria-hidden="true"
                      className="bg-signal absolute -bottom-px start-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100 rtl:origin-right"
                    />
                    <span className="font-mono text-xs text-dim md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-2xl font-medium tracking-[-0.02em] transition-transform duration-500 ease-out-expo md:col-span-5 md:text-3xl ltr:md:group-hover:translate-x-2 rtl:md:group-hover:-translate-x-2">
                      {item.title}
                    </p>
                    <p className="max-w-xl leading-relaxed text-muted md:col-span-6">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
