import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Cable,
  Database,
  MonitorSmartphone,
  PanelsTopLeft,
  ShoppingBag,
} from "lucide-react";

/** Icons for the six services, in the same order as `services.items` in the dictionaries. */
export const serviceIcons: LucideIcon[] = [
  MonitorSmartphone,
  PanelsTopLeft,
  AppWindow,
  Cable,
  Database,
  ShoppingBag,
];

/** Status of each journey step, in the same order as `journey.steps` in the dictionaries. */
export const journeyStatus = ["completed", "inProgress", "ongoing"] as const;
export type JourneyStatus = (typeof journeyStatus)[number];
