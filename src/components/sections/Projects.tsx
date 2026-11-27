import { projects, SHOWCASE_SLOTS } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectSlot } from "@/components/projects/ProjectSlot";

type ProjectsProps = { locale: Locale; t: Dictionary["work"]; covers: Dictionary["covers"] };

export function Projects({ locale, t, covers }: ProjectsProps) {
  const showSlot = projects.length < SHOWCASE_SLOTS;

  return (
    <section id="work" aria-labelledby="work-title" className="section-pad border-t border-line">
      <div className="container-page">
        <SectionHeading index="03" label={t.label} id="work-title" title={t.title} intro={t.intro} />

        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {projects.map((project, i) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={i}
              locale={locale}
              t={t}
              covers={covers}
            />
          ))}
          {showSlot ? <ProjectSlot index={projects.length} t={t.slot} /> : null}
        </div>
      </div>
    </section>
  );
}
