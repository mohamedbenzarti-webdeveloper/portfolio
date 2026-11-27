import Link from "next/link";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCover } from "./ProjectCover";
import { ProjectLinks, ProjectStatus } from "./ProjectLinks";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  locale: Locale;
  t: Dictionary["work"];
  covers: Dictionary["covers"];
};

/** Large asymmetric project feature. Alternates cover/text sides on desktop. */
export function ProjectShowcase({ project, index, locale, t, covers }: ProjectShowcaseProps) {
  const number = String(index + 1).padStart(2, "0");
  const reversed = index % 2 === 1;
  const href = `/${locale}/projects/${project.slug}`;
  const titleId = `project-${project.slug}`;
  const text = project.text[locale];

  return (
    <article aria-labelledby={titleId} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <Reveal className={cn("lg:col-span-7", reversed && "lg:order-2")}>
        {/* The cover duplicates the "View project" link, so keep it out of the tab order. */}
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <ProjectCover project={project} locale={locale} labels={covers} />
        </Link>
      </Reveal>

      <Reveal delay={0.08} className={cn("lg:col-span-5", reversed && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          <span className="text-fg">{number}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span>{text.category}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h3
            id={titleId}
            className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
          >
            {text.title}
          </h3>
          <ProjectStatus project={project} t={t} />
        </div>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{text.summary}</p>

        <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 text-[0.9375rem] sm:grid-cols-2">
          {text.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="bg-signal mt-[0.6em] h-px w-3 shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <p className="sr-only">{t.technologies}</p>
          <ul className="flex flex-wrap gap-2" dir="ltr">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={href}>
            {t.viewProject}
            <span className="sr-only">: {text.title}</span>
          </ButtonLink>
          <ProjectLinks project={project} t={t} />
        </div>
      </Reveal>
    </article>
  );
}
