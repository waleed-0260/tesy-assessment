"use client";

import { useState } from "react";
import {
  Inbox,
  Users,
  Sparkles,
  Workflow,
  Target,
  Settings,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import { currentAgent } from "@/components/dashboard/Data";
import { useTargetRegistry } from "@/components/extraction/TargetRegistry";
import type { SectionId } from "@/components/extraction/Types";

const NAV_ITEMS = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "ai-employees", label: "AI Employees", icon: Sparkles },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "campaigns", label: "Campaigns", icon: Target },
] as const satisfies readonly { id: SectionId; label: string; icon: unknown }[];

interface TopNavProps {
  /** When set (by the extraction flight sequence), overrides the internal active-tab state. */
  activeSectionOverride?: SectionId | null;
  /** Section whose nav item should play the brief "landed" pulse. */
  pulseSectionId?: SectionId | null;
}

export function TopNav({ activeSectionOverride, pulseSectionId }: TopNavProps = {}) {
  const [internalActive, setInternalActive] = useState<SectionId>("inbox");
  const registry = useTargetRegistry();
  const active = activeSectionOverride ?? internalActive;

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4">
      <span className="text-lg font-bold tracking-tight text-blue-600">
        BOXpad
      </span>

      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                registry?.register(item.id, el);
                return () => registry?.register(item.id, null);
              }}
              type="button"
              onClick={() => setInternalActive(item.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                pulseSectionId === item.id && "nav-pulse"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="size-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted"
        >
          <ToneAvatar size="sm" initials={currentAgent.initials} tone={currentAgent.tone} />
          <span className="text-sm font-medium">{currentAgent.name}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
