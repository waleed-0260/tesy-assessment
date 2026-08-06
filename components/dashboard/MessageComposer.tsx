"use client";

import { useState, type KeyboardEvent } from "react";
import {
  CornerUpLeft,
  ImagePlus,
  Mic,
  Smile,
  StickyNote,
  Video,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MessageComposerProps {
  onSend: (text: string) => void;
}

const TOOLBAR_ACTIONS = [
  { id: "image", label: "Attach image", icon: ImagePlus },
  { id: "video", label: "Attach video", icon: Video },
  { id: "note", label: "Insert saved reply", icon: StickyNote },
  { id: "emoji", label: "Insert emoji", icon: Smile },
  { id: "forward", label: "Forward message", icon: CornerUpLeft },
] as const;

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [value, setValue] = useState("");
  const [quickRepliesOpen, setQuickRepliesOpen] = useState(false);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-border bg-background p-3">
      <div className="rounded-2xl border border-border bg-background p-2.5">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something...."
          rows={1}
          className="max-h-32 w-full resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
        />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {TOOLBAR_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={action.label}
                >
                  <Icon className="size-4" />
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant={quickRepliesOpen ? "default" : "ghost"}
              size="icon"
              aria-label="Quick replies"
              onClick={() => setQuickRepliesOpen((open) => !open)}
              className={cn(
                quickRepliesOpen && "bg-foreground text-background"
              )}
            >
              <Zap className="size-4" />
            </Button>
            {value.trim() ? (
              <Button size="sm" onClick={handleSend}>
                Send
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Record voice message"
              >
                <Mic className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
