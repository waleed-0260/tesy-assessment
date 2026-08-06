"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface DetailsSectionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  action?: ReactNode;
}

export function DetailsSection({
  title,
  children,
  defaultOpen = true,
  action,
}: DetailsSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-3 first:pt-0 last:border-b-0">
      <div className="flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          {title}
          <ChevronDown
            className={cn("size-3.5 text-muted-foreground transition-transform", !open && "-rotate-90")}
          />
        </button>
        {action}
      </div>
      {open && <div className="mt-2.5 flex flex-col gap-2.5 px-4">{children}</div>}
    </div>
  );
}
