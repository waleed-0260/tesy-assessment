"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SectionContentPanel } from "@/components/extraction/SectionContentPanel";
import { useExtraction } from "@/components/extraction/ExtractionProvider";

/**
 * Full BOXpad inbox screen (nav, sidebar, conversation list, chat, details)
 * framed for embedding on the marketing homepage. Also the flight
 * destination: once a hero hexagon is picked, its section takes over the
 * content area below the nav until a new one is chosen.
 */
export function InboxScreenPreview() {
  const sequence = useExtraction();
  const activeHoneycomb = sequence.phase !== "idle" ? sequence.honeycomb : null;

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
      <div className="aspect-[2400/1331] w-full">
        <DashboardShell
          className="h-full"
          activeSectionOverride={activeHoneycomb?.sectionId ?? null}
          pulseSectionId={sequence.phase === "landing" ? sequence.activeSectionId : null}
          contentOverride={
            activeHoneycomb ? (
              <SectionContentPanel sectionId={activeHoneycomb.sectionId} phase={sequence.phase} />
            ) : undefined
          }
        />
      </div>
    </div>
  );
}
