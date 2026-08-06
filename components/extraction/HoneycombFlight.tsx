"use client";

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

import { useTargetRegistry } from "@/components/extraction/TargetRegistry";
import { FLIGHT_DURATION } from "@/components/extraction/UseFlightSequence";
import type { Honeycomb, Phase } from "@/components/extraction/Types";

interface HoneycombFlightProps {
  phase: Phase;
  honeycomb: Honeycomb | null;
  hexEl: HTMLElement | null;
  onLanded: () => void;
}

interface FlipRects {
  from: { top: number; left: number; width: number; height: number };
  dx: number;
  dy: number;
}

const FLIGHT_SECONDS = FLIGHT_DURATION / 1000;

/**
 * Renders the flying clone as a fixed-position portal on document.body.
 * Rects are derived with useMemo, recomputed the moment `active` flips to
 * true — i.e. read fresh off the DOM when the flight starts, never a rect
 * cached from mount time ("measure late").
 */
export function HoneycombFlight({ phase, honeycomb, hexEl, onLanded }: HoneycombFlightProps) {
  const registry = useTargetRegistry();
  const active = phase === "flying" && Boolean(honeycomb && hexEl);
  const targetEl = active && honeycomb && registry ? registry.get(honeycomb.sectionId) : null;

  const rects = useMemo<FlipRects | null>(() => {
    if (!active || !hexEl || !targetEl) return null;

    const from = hexEl.getBoundingClientRect();
    const to = targetEl.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    return {
      from: { top: from.top, left: from.left, width: from.width, height: from.height },
      dx,
      dy,
    };
  }, [active, hexEl, targetEl]);

  useEffect(() => {
    // Nav item isn't mounted (e.g. collapsed layout) — don't get stuck flying forever.
    if (active && hexEl && !targetEl) onLanded();
  }, [active, hexEl, targetEl, onLanded]);

  useEffect(() => {
    if (!rects) return;
    // Scroll lock (not scroll-tracking): the flyer is position:fixed and the
    // rects above are viewport-relative, so a mid-flight scroll would desync
    // the endpoint. Locking scroll for the ~650ms flight is simpler than
    // recalculating every frame and the window is short enough not to be felt.
    // Compensate for the scrollbar's width so hiding it doesn't reflow the
    // page (which reads as the whole page nudging sideways and back).
    const { body } = document;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPaddingRight = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [rects]);

  if (!active || !honeycomb || !rects) return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="icons-bg"
      data-selected="true"
      style={{
        position: "fixed",
        top: rects.from.top,
        left: rects.from.left,
        width: rects.from.width,
        height: rects.from.height,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x: rects.dx, y: rects.dy, scale: 0.25, opacity: 0 }}
      transition={{
        x: { duration: FLIGHT_SECONDS, ease: [0.4, 0, 0.2, 1] },
        y: { duration: FLIGHT_SECONDS, ease: [0.55, 0, 0.65, 1] },
        scale: { duration: FLIGHT_SECONDS, ease: [0.4, 0, 1, 1] },
        opacity: { duration: 0.26, delay: 0.39, ease: "easeIn" },
      }}
      onAnimationComplete={onLanded}
    >
      <span className="text-white">{honeycomb.icon}</span>
    </motion.div>,
    document.body
  );
}
