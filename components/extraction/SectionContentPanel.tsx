"use client";

import { motion, type Variants } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import { SECTION_DATA } from "@/data/Sections";
import type { Phase, SectionId } from "@/components/extraction/Types";

const SKELETON_ROW_COUNT = 6;

interface SectionContentPanelProps {
  sectionId: SectionId;
  phase: Phase;
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

/**
 * Generic content area driven entirely by the flight sequence's phase.
 * Skeleton fades in the instant a section is chosen (loading/flying/landing)
 * and swaps to real, staggered rows once the sequence reaches 'ready'.
 */
export function SectionContentPanel({ sectionId, phase }: SectionContentPanelProps) {
  const section = SECTION_DATA[sectionId];
  const isReady = phase === "ready";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <div className="shrink-0 border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">{section.label}</h2>
        <p className="text-sm text-muted-foreground">{section.description}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {isReady ? (
          <motion.ul
            className="flex flex-col gap-1"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {section.rows.map((row) => (
              <motion.li
                key={row.id}
                variants={rowVariants}
                className="flex items-center gap-3 rounded-xl px-2.5 py-3 hover:bg-muted/60"
              >
                <ToneAvatar initials={row.initials} tone={row.tone} className="shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {row.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {row.subtitle}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{row.meta}</span>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key={`skeleton-${sectionId}`}
            className="flex flex-col gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 rounded-xl px-2.5 py-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <Skeleton className="h-3.5 w-2/3 max-w-64 rounded-full" />
                <Skeleton className="ml-auto h-3.5 w-10 shrink-0 rounded-full" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
