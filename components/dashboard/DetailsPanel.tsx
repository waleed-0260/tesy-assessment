"use client";

import { useState } from "react";
import { CircleUserRound, Plus, Tag, PanelRight, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import { DetailsSection } from "@/components/dashboard/DetailsSection";
import {
  agents,
  conversationTags,
  currentAgent,
  notesByConversation,
  relatedChatsByConversation,
  teams,
} from "@/components/dashboard/Data";
import type { Conversation } from "@/components/dashboard/Types";

interface DetailsPanelProps {
  conversation: Conversation | null;
  onClose: () => void;
  isLoading: boolean;
}

function FieldRowSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-3.5 w-16 rounded-full" />
      <Skeleton className="h-3.5 w-24 rounded-full" />
    </div>
  );
}

function DetailsPanelSkeleton() {
  return (
    <>
      <DetailsSection title={<Skeleton className="h-3 w-20 rounded-full" />}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-16 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-3.5 w-20 rounded-full" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-16 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-3.5 w-24 rounded-full" />
          </span>
        </div>
      </DetailsSection>

      <DetailsSection title={<Skeleton className="h-3 w-28 rounded-full" />}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FieldRowSkeleton key={index} />
        ))}
      </DetailsSection>

      <DetailsSection title={<Skeleton className="h-3 w-12 rounded-full" />}>
        <div className="flex flex-wrap items-center gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <span className="flex size-5 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
            <Plus className="size-3" />
          </span>
        </div>
      </DetailsSection>

      <DetailsSection title="Notes">
        <div className="rounded-lg bg-muted p-2.5">
          <Skeleton className="h-3.5 w-full rounded-full" />
          <Skeleton className="mt-2 h-3 w-24 rounded-full" />
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <Skeleton className="h-3.5 w-4/5 rounded-full" />
          <Skeleton className="mt-2 h-3 w-24 rounded-full" />
        </div>
      </DetailsSection>

      <DetailsSection
        title={<Skeleton className="h-3 w-24 rounded-full" />}
        defaultOpen={false}
      >
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3.5 w-28 rounded-full" />
        </div>
      </DetailsSection>
    </>
  );
}

const CONTACT_FIELDS = (conversation: Conversation) => {
  const [firstName, ...rest] = conversation.contact.name.split(" ");
  const lastName = rest.join(" ");

  return [
    { label: "First Name", value: firstName, extra: false },
    { label: "Last Name", value: lastName, extra: false },
    { label: "Phone number", value: conversation.contact.phone, extra: false },
    { label: "Email", value: conversation.contact.email, extra: false },
    { label: "Company", value: conversation.contact.company, extra: true },
    { label: "Location", value: conversation.contact.location, extra: true },
    { label: "Language", value: conversation.contact.language, extra: true },
  ];
};

export function DetailsPanel({
  conversation,
  onClose,
  isLoading,
}: DetailsPanelProps) {
  const [seeAll, setSeeAll] = useState(false);
  const [tags, setTags] = useState<string[]>(
    conversation ? conversationTags[conversation.id] ?? [] : []
  );
  const [notes, setNotes] = useState(
    conversation ? notesByConversation[conversation.id] ?? [] : []
  );
  const [draftNote, setDraftNote] = useState("");

  const fields = conversation ? CONTACT_FIELDS(conversation) : [];
  const visibleFields = seeAll ? fields : fields.filter((field) => !field.extra);
  const supportTeam = teams.find((team) => team.id === "support");
  const relatedChats = conversation ? relatedChatsByConversation[conversation.id] ?? [] : [];

  function addTag() {
    const label = `Tag ${tags.length + 1}`;
    setTags((current) => [...current, label]);
  }

  function removeTag(tag: string) {
    setTags((current) => current.filter((item) => item !== tag));
  }

  function addNote() {
    const trimmed = draftNote.trim();
    if (!trimmed) return;
    setNotes((current) => [
      { id: `note-${Date.now()}`, author: currentAgent.name, text: trimmed, timestamp: "Just now" },
      ...current,
    ]);
    setDraftNote("");
  }

  return (
    <aside className="flex min-h-0 w-80 shrink-0 flex-col border-l border-border bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <h2 className="text-base font-semibold">Details</h2>
        <Button variant="ghost" size="icon" aria-label="Close details" onClick={onClose}>
          <PanelRight className="size-4" />
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col">
          {isLoading ? (
            <DetailsPanelSkeleton />
          ) : !conversation ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Select a conversation to see details.
            </p>
          ) : (
            <>
              <DetailsSection title="Chat Data">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assignee</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CircleUserRound className="size-4 text-muted-foreground" />
                    {currentAgent.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Team</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CircleUserRound className="size-4 text-muted-foreground" />
                    {supportTeam?.name}
                  </span>
                </div>
              </DetailsSection>

              <DetailsSection title="Contact Data">
                {visibleFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {field.label}
                    </span>
                    <span className="max-w-[10rem] truncate font-medium">
                      {field.value}
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSeeAll((value) => !value)}
                  className="text-left text-sm font-medium text-foreground hover:underline"
                >
                  {seeAll ? "See less" : "See all"}
                </button>
              </DetailsSection>

              <DetailsSection title="Contact Labels">
                <div className="flex flex-wrap items-center gap-1.5">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="gap-1 border-blue-200 bg-blue-50 pr-1 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                    >
                      <Tag className="size-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                        className="rounded-full p-0.5 hover:bg-blue-100 dark:hover:bg-blue-500/20"
                      >
                        <X className="size-2.5" />
                      </button>
                    </Badge>
                  ))}
                  <button
                    type="button"
                    onClick={addTag}
                    aria-label="Add tag"
                    className="flex size-5 items-center justify-center rounded-full border border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </DetailsSection>

              <DetailsSection title="Notes">
                <div className="flex flex-col gap-2">
                  <textarea
                    value={draftNote}
                    onChange={(event) => setDraftNote(event.target.value)}
                    placeholder="Add a note"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-sm text-amber-900 outline-none placeholder:text-amber-700/60 focus-visible:border-amber-400 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100 dark:placeholder:text-amber-200/40"
                  />
                  {draftNote.trim() && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="self-end"
                      onClick={addNote}
                    >
                      Add note
                    </Button>
                  )}
                </div>

                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-sm dark:border-amber-500/20 dark:bg-amber-500/10"
                  >
                    <p className="text-amber-900 dark:text-amber-100">{note.text}</p>
                    <p className="mt-1 text-xs text-amber-700/70 dark:text-amber-200/50">
                      {note.author} &middot; {note.timestamp}
                    </p>
                  </div>
                ))}
              </DetailsSection>

              <DetailsSection title="Other Chats">
                <div className="flex flex-col gap-3">
                  {relatedChats.map((chat) => (
                    <div key={chat.id} className="flex items-start gap-2.5">
                      <ToneAvatar size="sm" initials={chat.initials} tone={chat.tone} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium">
                            {chat.name}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {chat.date}
                          </span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {chat.preview}
                        </p>
                      </div>
                    </div>
                  ))}
                  {relatedChats.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No other chats with this contact.
                    </p>
                  )}
                </div>
              </DetailsSection>

              <DetailsSection title="Team members" defaultOpen={false}>
                <div className="flex flex-col gap-2">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <ToneAvatar size="sm" initials={agent.initials} tone={agent.tone} />
                      <span className="font-medium">{agent.name}</span>
                    </div>
                  ))}
                </div>
              </DetailsSection>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
