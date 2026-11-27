import { ArrowUp } from "lucide-react";
import { isPlaceholder, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const socials = [
  { label: "GitHub", href: siteConfig.contact.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.contact.linkedin, Icon: LinkedinIcon },
].filter((social) => !isPlaceholder(social.href));

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-base font-medium tracking-tight">{siteConfig.name}</p>
          <p className="text-sm text-dim">
            © {year} · {dict.site.role} · {dict.site.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-contrast/40 hover:text-fg"
            >
              <Icon className="size-4" />
              <span className="sr-only">
                {label} {dict.work.newTab}
              </span>
            </a>
          ))}
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-muted transition-colors hover:border-contrast/40 hover:text-fg"
          >
            {dict.footer.backToTop}
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
