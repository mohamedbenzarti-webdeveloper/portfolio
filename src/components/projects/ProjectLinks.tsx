import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { GithubIcon } from "@/components/ui/BrandIcons";

/** Optional external links (live site / repository). Renders nothing when neither is set. */
export function ProjectLinks({ project, t }: { project: Project; t: Dictionary["work"] }) {
  const { live, github } = project.links;
  if (!live && !github) return null;

  const linkClass =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-contrast/40 hover:bg-contrast/4";

  return (
    <>
      {live ? (
        <a href={live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t.live}
          <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
          <span className="sr-only">{t.newTab}</span>
        </a>
      ) : null}
      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GithubIcon className="size-4" />
          {t.github}
          <span className="sr-only">{t.newTab}</span>
        </a>
      ) : null}
    </>
  );
}

/** "In progress" / "Completed" badge. */
export function ProjectStatus({ project, t }: { project: Project; t: Dictionary["work"] }) {
  const inProgress = project.status === "in-progress";
  return (
    <span
      className={
        "eyebrow inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.625rem]! " +
        (inProgress ? "border-purple/60 text-fg" : "border-line-strong text-muted")
      }
    >
      <span
        aria-hidden="true"
        className={"size-1.5 rounded-full " + (inProgress ? "animate-pulse bg-purple" : "bg-live")}
      />
      {inProgress ? t.status.inProgress : t.status.completed}
    </span>
  );
}
