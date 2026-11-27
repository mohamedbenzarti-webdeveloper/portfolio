"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { isPlaceholder, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const { email, linkedin, github } = siteConfig.contact;
const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

type Labels = Dictionary["contact"]["channels"];

/**
 * Direct contact links. Placeholder values (see src/config/site.ts) render as
 * plain text so the site never ships a broken link.
 */
export function ContactChannels({ t }: { t: Labels }) {
  const [copied, setCopied] = useState(false);

  const channels = [
    { key: "email", label: t.email, value: email, href: `mailto:${email}`, icon: <Mail className="size-4" aria-hidden="true" />, external: false },
    { key: "linkedin", label: t.linkedin, value: strip(linkedin), href: linkedin, icon: <LinkedinIcon className="size-4" />, external: true },
    { key: "github", label: t.github, value: strip(github), href: github, icon: <GithubIcon className="size-4" />, external: true },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context); the mailto link still works.
    }
  };

  return (
    <ul className="border-t border-line">
      {channels.map((channel) => {
        const placeholder = isPlaceholder(channel.href);
        const body = (
          <>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors group-hover:text-fg">
              {channel.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-dim">{channel.label}</span>
              <span className="mt-1 flex flex-wrap items-center text-[0.9375rem] break-all text-fg">
                <bdi dir="ltr">{channel.value}</bdi>
                {placeholder ? (
                  <span className="ms-2 rounded border border-dashed border-line-strong px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wider text-dim uppercase">
                    {t.placeholder}
                  </span>
                ) : null}
              </span>
            </span>
          </>
        );

        return (
          <li key={channel.key} className="flex items-center gap-2 border-b border-line">
            {placeholder ? (
              <div className="flex flex-1 items-center gap-4 py-4">{body}</div>
            ) : (
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-1 items-center gap-4 py-4"
              >
                {body}
                <ArrowUpRight
                  className="size-4 text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-fg rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </a>
            )}

            {channel.key === "email" && !isPlaceholder(email) ? (
              <button
                type="button"
                onClick={copyEmail}
                className="grid size-11 place-items-center rounded-full text-dim transition-colors hover:bg-contrast/5 hover:text-fg"
              >
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                <span className="sr-only">{copied ? t.copied : t.copy}</span>
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
