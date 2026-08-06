"use client";

import { useState } from "react";
import { MoreVertical, Moon, PanelRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import {
  ChatMessage,
  ChatMessageSkeleton,
} from "@/components/dashboard/ChatMessage";
import { MessageComposer } from "@/components/dashboard/MessageComposer";
import type { Conversation, Message } from "@/components/dashboard/Types";

const SKELETON_THREAD: Array<{
  side: "left" | "right";
  size: "sm" | "lg";
  timestamp: string;
  read?: boolean;
}> = [
  { side: "left", size: "lg", timestamp: "23:08" },
  { side: "right", size: "lg", timestamp: "23:08", read: true },
  { side: "left", size: "sm", timestamp: "23:16" },
  { side: "right", size: "lg", timestamp: "23:16", read: true },
  { side: "left", size: "sm", timestamp: "23:17" },
  { side: "left", size: "sm", timestamp: "23:20" },
  { side: "right", size: "lg", timestamp: "23:20", read: true },
  { side: "left", size: "sm", timestamp: "23:23" },
];

interface ChatPanelProps {
  conversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  detailsOpen: boolean;
  onToggleDetails: () => void;
}

export function ChatPanel({
  conversation,
  messages,
  isLoading,
  detailsOpen,
  onToggleDetails,
}: ChatPanelProps) {
  // Sent-while-viewing messages, appended on top of the fetched thread —
  // kept separate so they survive the async messages prop resolving later.
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const allMessages = [...messages, ...localMessages];

  function handleSend(text: string) {
    const now = new Date();
    setLocalMessages((current) => [
      ...current,
      {
        id: `local-${now.getTime()}`,
        direction: "outgoing",
        text,
        timestamp: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      },
    ]);
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        {conversation ? (
          <div className="flex items-center gap-2.5">
            <ToneAvatar
              size="sm"
              initials={conversation.contact.initials}
              tone={conversation.contact.tone}
            />
            <h2 className="text-sm font-semibold">{conversation.contact.name}</h2>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-full" />
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="More actions">
            <MoreVertical className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Snooze conversation">
            <Moon className="size-4" />
          </Button>
          <Button
            variant={detailsOpen ? "default" : "outline"}
            size="icon"
            aria-label={detailsOpen ? "Hide details" : "Show details"}
            onClick={onToggleDetails}
            className={cn(detailsOpen && "bg-foreground text-background")}
          >
            <PanelRight className="size-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-3 px-4 py-4">
          {isLoading ? (
            <>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              {SKELETON_THREAD.map((entry, index) => (
                <ChatMessageSkeleton key={index} {...entry} />
              ))}
            </>
          ) : !conversation ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Select a conversation to view messages.
            </p>
          ) : (
            <>
              <div className="flex justify-center">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Today
                </span>
              </div>

              {allMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {allMessages.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No messages yet — say hello to {conversation.contact.name}.
                </p>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <MessageComposer onSend={handleSend} />
    </section>
  );
}
