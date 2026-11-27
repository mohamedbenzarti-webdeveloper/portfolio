import { Fragment } from "react";
import { Em } from "@/components/ui/Em";

/**
 * Renders the small inline markup used in dictionaries:
 *   **text** → highlighted (text-fg)      _text_ → gradient serif emphasis
 */
export function rich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-fg">
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
      return <Em key={i}>{part.slice(1, -1)}</Em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Replaces {name} placeholders. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
