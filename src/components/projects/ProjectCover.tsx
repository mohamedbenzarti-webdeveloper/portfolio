"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { BocaroCover } from "./covers/BocaroCover";
import { IotCover } from "./covers/IotCover";

type ProjectCoverProps = {
  project: Project;
  locale: Locale;
  labels: Dictionary["covers"];
  className?: string;
  priority?: boolean;
};

/**
 * Framed 16:10 project visual with a pointer-following spotlight.
 * The parent should carry the `group` class to drive hover states.
 */
export function ProjectCover({ project, locale, labels, className, priority = false }: ProjectCoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const { cover } = project;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      role={cover.kind === "image" ? undefined : "img"}
      aria-label={
        cover.kind === "bocaro" ? labels.bocaroAlt : cover.kind === "iot" ? labels.iotAlt : undefined
      }
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong md:rounded-2xl",
        className,
      )}
    >
      {cover.kind === "bocaro" ? <BocaroCover labels={labels} /> : null}
      {cover.kind === "iot" ? <IotCover labels={labels} /> : null}
      {cover.kind === "image" ? (
        <Image
          src={cover.src}
          alt={cover.alt[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
        />
      ) : null}

      {/* Pointer spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.07), transparent 60%)",
        }}
      />
    </div>
  );
}
