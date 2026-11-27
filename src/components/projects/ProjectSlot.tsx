import { Plus } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rich } from "@/lib/rich";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Placeholder for a future project. Shown while fewer projects exist than
 * SHOWCASE_SLOTS. It describes an open slot and does not invent any work.
 */
export function ProjectSlot({ index, t }: { index: number; t: Dictionary["work"]["slot"] }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <div className="relative grid gap-10 overflow-hidden rounded-2xl border border-dashed border-line-strong px-6 py-12 sm:px-10 md:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-14">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[0.22em] -end-[0.04em] font-display text-[clamp(8rem,22vw,20rem)] leading-none font-semibold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
        >
          {number}
        </span>

        <div className="relative lg:col-span-7">
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span className="text-fg">{number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>{t.label}</span>
          </div>
          <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.035em] text-balance">
            {rich(t.title)}
          </h3>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{t.text}</p>
        </div>

        <div className="relative flex items-center gap-5 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <span
            aria-hidden="true"
            className="hidden size-14 place-items-center rounded-full border border-dashed border-line-strong text-muted sm:grid"
          >
            <Plus className="size-5" />
          </span>
          <ButtonLink href="#contact" variant="secondary">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
