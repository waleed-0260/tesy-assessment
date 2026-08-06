"use client";

import { createContext, useContext, type ReactNode } from "react";

import { TargetRegistryProvider } from "@/components/extraction/TargetRegistry";
import { useFlightSequence, type FlightSequence } from "@/components/extraction/UseFlightSequence";
import { HoneycombFlight } from "@/components/extraction/HoneycombFlight";
import { SECTION_DATA } from "@/data/Sections";

const ExtractionContext = createContext<FlightSequence | null>(null);

/** Wires the hero hexagons and the dashboard nav together for the flight sequence. */
export function ExtractionProvider({ children }: { children: ReactNode }) {
  return (
    <TargetRegistryProvider>
      <ExtractionInner>{children}</ExtractionInner>
    </TargetRegistryProvider>
  );
}

function ExtractionInner({ children }: { children: ReactNode }) {
  const sequence = useFlightSequence();

  return (
    <ExtractionContext.Provider value={sequence}>
      {children}
      <HoneycombFlight
        phase={sequence.phase}
        honeycomb={sequence.honeycomb}
        hexEl={sequence.hexEl}
        onLanded={sequence.reportFlightLanded}
      />
      <LiveAnnouncer sequence={sequence} />
    </ExtractionContext.Provider>
  );
}

function LiveAnnouncer({ sequence }: { sequence: FlightSequence }) {
  const message =
    sequence.phase === "ready" && sequence.honeycomb
      ? (() => {
          const section = SECTION_DATA[sequence.honeycomb.sectionId];
          return `${section.label} loaded, ${section.rows.length} items`;
        })()
      : "";

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>
  );
}

export function useExtraction() {
  const ctx = useContext(ExtractionContext);
  if (!ctx) {
    throw new Error("useExtraction must be used within an ExtractionProvider");
  }
  return ctx;
}
