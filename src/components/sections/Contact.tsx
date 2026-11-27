import type { Dictionary } from "@/i18n/dictionaries/en";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { Em } from "@/components/ui/Em";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionHeading";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-pad relative isolate overflow-hidden border-t border-line"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[10%] left-1/2 h-120 w-240 -translate-x-1/2 rounded-full bg-purple/12 blur-[140px]" />
      </div>

      <div className="container-page">
        <Reveal>
          <SectionLabel index="06" label={t.label} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="contact-title"
            className="mt-8 max-w-6xl font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            {t.titleA} <span className="block">{t.titleB}</span>
            <Em>{t.titleEm}</Em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="max-w-md text-lg leading-relaxed text-muted">{t.intro}</p>
            <div className="mt-10">
              <ContactChannels t={t.channels} />
            </div>
            <p className="eyebrow mt-8 text-dim">{t.basedIn}</p>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7" delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8 md:p-10">
              <ContactForm t={t.form} errors={t.errors} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
