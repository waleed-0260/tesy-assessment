"use client";

import Image from "next/image";

import { HoneycombHero } from "@/components/extraction/HoneycombHero";
import { useExtraction } from "@/components/extraction/ExtractionProvider";

export function LoadingScreen() {
  const sequence = useExtraction();

  return (
    <div className="absolute inset-5 z-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="relative">
          <Image
            src="/images/circleShine.gif"
            alt="Description"
            width={300}
            height={300}
          />
        </div>
        <p className="text-white text-center text-2xl font-bold">
          Extracting Information
        </p>
        <p className="text-white text-center">
          We are extracting information from the above honey combs to your system
        </p>
      </div>

      <HoneycombHero sequence={sequence} />
    </div>
  );
}
