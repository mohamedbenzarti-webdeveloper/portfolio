import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projectNumber, projects } from "@/data/projects";
import { isLocale, languageAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { rich } from "@/lib/rich";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectLinks, ProjectStatus } from "@/components/projects/ProjectLinks";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/projects/[slug]">,
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  const text = project.text[locale];
  const path = `/projects/${project.slug}`;
  return {
    title: text.title,
    description: text.summary,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { title: text.title, description: text.summary, url: `/${locale}${path}` },
  };
}

export default async function ProjectPage(props: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await props.params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const t = dict.project;
  const text = project.text[locale];
  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const hasNext = projects.length > 1;

  return (
    <article aria-labelledby="project-title" className="pt-28 md:pt-36">
      <div className="container-page">
        <Reveal>
          <Link
            href={`/${locale}#work`}
            className="eyebrow inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            {t.allProjects}
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                <span className="text-fg">{projectNumber(project.slug)}</span>
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                {text.category}
                <ProjectStatus project={project} t={dict.work} />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                id="project-title"
                className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-semibold tracking-tighter text-balance"
              >
                {text.title}
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">{text.summary}</p>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="group mt-14 md:mt-20">
          <ProjectCover project={project} locale={locale} labels={dict.covers} priority />
        </Reveal>

        <div className="grid gap-16 pt-20 pb-24 md:pt-28 md:pb-32 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <h2 className="eyebrow text-muted">{t.overview}</h2>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="max-w-4xl font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
                {text.description}
              </p>
            </Reveal>

            <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-12">
              <Reveal>
                <h2 className="eyebrow mb-6 text-muted">{t.keyFeatures}</h2>
                <ol className="border-t border-line">
                  {text.highlights.map((highlight, i) => (
                    <li key={highlight} className="flex items-baseline gap-5 border-b border-line py-4 text-lg">
                      <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                      {highlight}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="eyebrow mb-6 text-muted">{t.stack}</h2>
                <ul className="flex flex-wrap gap-2" dir="ltr">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line-strong px-4 py-2 font-mono text-xs tracking-wide"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ProjectLinks project={project} t={dict.work} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          {hasNext ? (
            <Link href={`/${locale}/projects/${next.slug}`} className="group block">
              <span className="eyebrow flex items-center gap-2 text-muted">
                {t.nextProject}
                <ArrowRight
                  className="size-3.5 transition-transform rtl:-scale-x-100 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span
                className="mt-4 block font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] transition-colors group-hover:text-muted"
              >
                {next.text[locale].title}
              </span>
            </Link>
          ) : (
            <p className="font-display text-[clamp(2rem,5vw,4rem)] leading-none font-semibold tracking-[-0.04em]">
              {rich(t.moreSoon)}
            </p>
          )}
          <ButtonLink href={`/${locale}#contact`} variant="secondary">
            {t.discuss}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
