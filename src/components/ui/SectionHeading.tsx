import { rich } from "@/lib/rich";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  id: string;
  /** Supports inline markup: _emphasis_ and **highlight**. */
  title: string;
  intro?: string;
};

/**
 * Editorial section header: a narrow mono label column at the start and a
 * large display title, sharing the 12-column page grid.
 */
export function SectionHeading({ index, label, id, title, intro }: SectionHeadingProps) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-3 lg:pt-3">
        <SectionLabel index={index} label={label} />
      </Reveal>
      <div className="lg:col-span-9">
        <Reveal delay={0.05}>
          <h2
            id={id}
            className="max-w-4xl font-display text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance"
          >
            {rich(title)}
          </h2>
        </Reveal>
        {intro ? (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="eyebrow flex items-center gap-3 text-muted">
      <span className="text-fg">({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      {label}
    </p>
  );
}
