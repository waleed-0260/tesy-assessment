import { CheckCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "@/components/dashboard/Types";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isOutgoing = message.direction === "outgoing";

  return (
    <div
      className={cn(
        "flex flex-col",
        isOutgoing ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-md rounded-2xl px-3.5 py-2 text-sm",
          isOutgoing
            ? "rounded-br-sm bg-foreground text-background"
            : "rounded-bl-sm bg-muted text-foreground"
        )}
      >
        {message.text}
      </div>
      <div className="mt-1 flex items-center gap-1 px-1 text-[11px] text-muted-foreground">
        <span>{message.timestamp}</span>
        {isOutgoing && (
          <CheckCheck
            className={cn(
              "size-3.5",
              message.read ? "text-sky-500" : "text-muted-foreground"
            )}
          />
        )}
      </div>
    </div>
  );
}

interface ChatMessageSkeletonProps {
  side: "left" | "right";
  size: "sm" | "lg";
  timestamp: string;
  read?: boolean;
}

export function ChatMessageSkeleton({
  side,
  size,
  timestamp,
  read,
}: ChatMessageSkeletonProps) {
  const isOutgoing = side === "right";

  return (
    <div
      className={cn(
        "flex flex-col",
        isOutgoing ? "items-end" : "items-start"
      )}
    >
      <Skeleton
        className={cn(
          "w-72 max-w-[70%] rounded-2xl",
          size === "lg" ? "h-16" : "h-9"
        )}
      />
      <div className="mt-1 flex items-center gap-1 px-1 text-[11px] text-muted-foreground">
        <span>{timestamp}</span>
        {isOutgoing && (
          <CheckCheck
            className={cn("size-3.5", read ? "text-sky-500" : "text-muted-foreground")}
          />
        )}
      </div>
    </div>
  );
}
