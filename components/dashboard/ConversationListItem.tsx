import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import type { Conversation } from "@/components/dashboard/Types";

interface ConversationListItemProps {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}

export function ConversationListItem({
  conversation,
  active,
  onSelect,
}: ConversationListItemProps) {
  const { contact } = conversation;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-2.5 py-3 text-left transition-colors",
        active ? "bg-muted" : "hover:bg-muted/60"
      )}
    >
      <ToneAvatar initials={contact.initials} tone={contact.tone} className="shrink-0" />

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {contact.name}
      </span>

      <span className="flex shrink-0 items-center gap-1.5">
        {conversation.unread > 0 ? (
          <Badge className="bg-blue-600 text-white">
            {conversation.unread}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">
            {conversation.timestamp}
          </span>
        )}
      </span>
    </button>
  );
}

export function ConversationListItemSkeleton() {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl px-2.5 py-3">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-3.5 w-2/3 max-w-40 rounded-full" />
      <Skeleton className="ml-auto h-3.5 w-10 shrink-0 rounded-full" />
    </div>
  );
}
