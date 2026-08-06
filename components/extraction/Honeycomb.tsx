"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { Honeycomb as HoneycombData } from "@/components/extraction/Types";

interface HoneycombProps {
  honeycomb: HoneycombData;
  isSelected: boolean;
  disabled: boolean;
  onSelect: (honeycomb: HoneycombData, el: HTMLButtonElement) => void;
}

/**
 * A single hero hexagon. Native <button> so Enter/Space activate it for
 * free. Visual "selected" state is keyed off honeycomb id, not animation
 * phase, so it stays lit through loading/flying/landing/ready.
 */
export function Honeycomb({ honeycomb, isSelected, disabled, onSelect }: HoneycombProps) {
  return (
    <motion.button
      type="button"
      aria-label={`Load ${honeycomb.label}`}
      aria-pressed={isSelected}
      disabled={disabled}
      data-selected={isSelected || undefined}
      onClick={(event) => onSelect(honeycomb, event.currentTarget)}
      animate={{ scale: isSelected ? 1.06 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "icons-bg absolute cursor-pointer disabled:cursor-not-allowed"
      )}
      style={{
        top: honeycomb.position.top,
        left: honeycomb.position.left,
        right: honeycomb.position.right,
      }}
    >
      <span className="text-white">{honeycomb.icon}</span>
    </motion.button>
  );
}
