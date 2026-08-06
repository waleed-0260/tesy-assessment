import type { ReactNode } from "react";

export type SectionId =
  | "inbox"
  | "contacts"
  | "ai-employees"
  | "workflows"
  | "campaigns";

export interface Honeycomb {
  id: string;
  sectionId: SectionId;
  icon: ReactNode;
  label: string;
  /** Existing hero positions, expressed as CSS offsets. */
  position: { top: string; left?: string; right?: string };
}

/**
 * Sequence phases, in order. Only one flight can be in progress at a time;
 * clicks during 'flying' or 'landing' are ignored (see useFlightSequence).
 */
export type Phase =
  | "idle"
  | "selected"
  | "loading"
  | "flying"
  | "landing"
  | "ready";
