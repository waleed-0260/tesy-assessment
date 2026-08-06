"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  PanelLeft,
  Search,
  SlidersHorizontal,
  SquarePen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ConversationListItem,
  ConversationListItemSkeleton,
} from "@/components/dashboard/ConversationListItem";
import type { Conversation } from "@/components/dashboard/Types";

const SKELETON_ROW_COUNT = 9;

interface ConversationListProps {
  title: string;
  conversations: Conversation[];
  isLoading: boolean;
  error: Error | null;
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const STATUS_OPTIONS = ["Open", "Pending", "Closed"] as const;
const SORT_OPTIONS = ["Newest first", "Oldest first"] as const;

export function ConversationList({
  title,
  conversations,
  isLoading,
  error,
  selectedConversationId,
  onSelectConversation,
  sidebarCollapsed,
  onToggleSidebar,
}: ConversationListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>(
    "Open"
  );
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>(
    "Newest first"
  );

  const filtered = useMemo(() => {
    const items = conversations.filter((conversation) =>
      conversation.contact.name.toLowerCase().includes(query.toLowerCase())
    );
    return sort === "Newest first" ? items : [...items].reverse();
  }, [conversations, query, sort]);

  return (
    <section className="flex min-h-0 w-80 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={sidebarCollapsed ? "Show inbox nav" : "Hide inbox nav"}
            onClick={onToggleSidebar}
          >
            <PanelLeft className="size-4" />
          </Button>
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        <Button variant="ghost" size="icon" aria-label="New conversation">
          <SquarePen className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 px-3 pt-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Chat"
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon" aria-label="Filter conversations">
          <SlidersHorizontal className="size-3.5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-24 rounded-lg" />
          </>
        ) : (
          <>
            <FilterPill
              label={status}
              options={STATUS_OPTIONS}
              onChange={setStatus}
            />
            <FilterPill
              label={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </>
        )}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-0.5 px-2 pb-3">
          {isLoading ? (
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
              <ConversationListItemSkeleton key={index} />
            ))
          ) : (
            <>
              {filtered.map((conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={conversation}
                  active={conversation.id === selectedConversationId}
                  onSelect={() => onSelectConversation(conversation.id)}
                />
              ))}
              {filtered.length === 0 && error && (
                <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                  Couldn&apos;t load conversations. Please try again later.
                </p>
              )}
              {filtered.length === 0 && !error && (
                <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                  No conversations match &ldquo;{query}&rdquo;.
                </p>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </section>
  );
}

interface FilterPillProps<T extends string> {
  label: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

function FilterPill<T extends string>({
  label,
  options,
  onChange,
}: FilterPillProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
      >
        {label}
        <ChevronDown className="size-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 w-36 rounded-lg border border-border bg-popover p-1 shadow-md">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",
                option === label && "font-semibold text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
