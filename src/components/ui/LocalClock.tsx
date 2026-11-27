"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: siteConfig.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "--:--";

/** Live local time in Tunisia. Renders a neutral placeholder during SSR. */
export function LocalClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <time suppressHydrationWarning>{time}</time>;
}
