"use client";

import { HONEYCOMBS } from "@/components/extraction/Honeycombs";
import { Honeycomb } from "@/components/extraction/Honeycomb";
import type { Honeycomb as HoneycombData } from "@/components/extraction/Types";
import type { FlightSequence } from "@/components/extraction/UseFlightSequence";

interface HoneycombHeroProps {
  sequence: FlightSequence;
}

export function HoneycombHero({ sequence }: HoneycombHeroProps) {
  const disabled = sequence.phase === "flying" || sequence.phase === "landing";

  const handleSelect = (honeycomb: HoneycombData, el: HTMLButtonElement) => {
    sequence.select(honeycomb, el);
  };

  return (
    <>
      {/* Rounded-hexagon clip path shared by every .icons-bg element (hero
          hexagons, the flyer clone) — defined once, referenced by id. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="hex-rounded" clipPathUnits="objectBoundingBox">
            <path
              d="M0.41,0.045 Q0.5,0 0.59,0.045 L0.91,0.205 Q1,0.25 1,0.34
                 L1,0.66 Q1,0.75 0.91,0.795 L0.59,0.955 Q0.5,1 0.41,0.955
                 L0.09,0.795 Q0,0.75 0,0.66 L0,0.34 Q0,0.25 0.09,0.205 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {HONEYCOMBS.map((honeycomb) => (
        <Honeycomb
          key={honeycomb.id}
          honeycomb={honeycomb}
          isSelected={sequence.honeycomb?.id === honeycomb.id && sequence.phase !== "idle"}
          disabled={disabled}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
}
