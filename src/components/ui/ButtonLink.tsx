import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Icon shown in the trailing chip. Defaults to an arrow. */
  icon?: React.ReactNode;
  external?: boolean;
};

const base =
  "group/button relative inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 ps-6 pe-1.5 text-[0.9375rem] font-medium transition-[background-color,border-color,opacity] duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-ink hover:opacity-90",
  secondary: "border border-line-strong text-fg hover:border-contrast/35 hover:bg-contrast/4",
};

const chip: Record<Variant, string> = {
  primary: "bg-ink text-fg",
  secondary: "bg-contrast/6 text-fg",
};

/** Pill link with a trailing icon chip that reacts to hover. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon,
  external = false,
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-9 place-items-center overflow-hidden rounded-full",
          chip[variant],
        )}
      >
        <span className="bg-signal absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-out-expo group-hover/button:scale-100" />
        <span className="relative transition-transform duration-500 ease-out-expo group-hover/button:text-white rtl:-scale-x-100 ltr:group-hover/button:rotate-45 rtl:group-hover/button:-rotate-45">
          {icon ?? <ArrowUpRight className="size-4" strokeWidth={2} />}
        </span>
      </span>
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
