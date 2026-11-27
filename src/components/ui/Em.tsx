import { cn } from "@/lib/cn";

/** Serif italic emphasis carrying the signature gradient (upright bold in Arabic). */
export function Em({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <em
      className={cn(
        "em-signal text-signal pe-[0.08em] font-serif font-normal tracking-[-0.01em] italic",
        className,
      )}
    >
      {children}
    </em>
  );
}
