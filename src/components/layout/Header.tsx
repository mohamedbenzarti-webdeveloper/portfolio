"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navIds, siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Tracks which homepage section is currently in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  tagline: string;
};

export function Header({ locale, nav, tagline }: HeaderProps) {
  const pathname = usePathname();
  const home = `/${locale}`;
  const isHome = pathname === home;
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const active = useActiveSection(isHome);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Mobile menu: lock scroll, close on Escape, manage focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
          <Link
            href={home}
            onClick={close}
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name}, ${nav.home}`}
          >
            <span
              dir="ltr"
              className="relative grid size-9 place-items-center rounded-md border border-line-strong font-display text-sm font-semibold tracking-tight transition-colors group-hover:border-contrast/40"
            >
              {siteConfig.initials}
              <span className="bg-signal absolute -right-0.5 -bottom-0.5 size-2 rounded-full" />
            </span>
            <span className="hidden font-display text-[0.9375rem] font-medium tracking-tight sm:block xl:block lg:hidden">
              {siteConfig.name}
            </span>
          </Link>

          <nav aria-label={nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navIds.map((id, i) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <Link
                      href={`${home}#${id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "group relative flex items-baseline gap-1.5 rounded-full px-3 py-2 text-sm transition-colors",
                        isActive ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      <span className="font-mono text-[0.625rem] text-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {nav.items[id]}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="bg-signal absolute inset-x-3 -bottom-px h-px"
                          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher current={locale} label={nav.language} className="hidden sm:block" />
            <ThemeToggle labels={{ toLight: nav.toLight, toDark: nav.toDark }} />
            <Link
              href={`${home}#contact`}
              className="hidden items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-contrast/40 hover:bg-contrast/4 xl:inline-flex"
            >
              {nav.letsTalk}
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-contrast/40 lg:hidden"
            >
              <span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span>
              {open ? (
                <X className="size-[18px]" aria-hidden="true" />
              ) : (
                <Menu className="size-[18px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="bg-signal absolute inset-x-0 -bottom-px h-px origin-left rtl:origin-right"
        />
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become
          the containing block for this fixed overlay. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink md:top-18 lg:hidden"
          >
            <nav aria-label={nav.mobile} className="container-page flex min-h-full flex-col pt-8 pb-10">
              <ul className="border-t border-line">
                {navIds.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.04 * i }}
                    className="border-b border-line"
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`${home}#${id}`}
                      onClick={close}
                      className="flex items-baseline justify-between py-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
                    >
                      {nav.items[id]}
                      <span className="font-mono text-xs font-normal text-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-6 pt-10">
                <LanguageSwitcher current={locale} label={nav.language} size="lg" />
                <p className="eyebrow text-muted">{tagline}</p>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
