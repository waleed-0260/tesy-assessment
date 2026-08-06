"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { TopNav } from "@/components/dashboard/TopNav";
import { InboxSidebar } from "@/components/dashboard/InboxSidebar";
import { ConversationList } from "@/components/dashboard/ConversationList";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { DetailsPanel } from "@/components/dashboard/DetailsPanel";
import { agents, currentAgent } from "@/components/dashboard/Data";
import { fetchConversationDetail, fetchConversations } from "@/lib/Conversations";
import { useAsyncData } from "@/lib/hooks/UseAsyncData";
import type { SectionId } from "@/components/extraction/Types";

interface DashboardShellProps {
  /** Overrides the outer container height. Defaults to full viewport height. */
  className?: string;
  /** Replaces the sidebar/list/chat/details row — used by the extraction flight sequence. */
  contentOverride?: ReactNode;
  activeSectionOverride?: SectionId | null;
  pulseSectionId?: SectionId | null;
}

export function DashboardShell({
  className,
  contentOverride,
  activeSectionOverride,
  pulseSectionId,
}: DashboardShellProps = {}) {
  const [activeAgentId, setActiveAgentId] = useState(currentAgent.id);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  const {
    data: conversations,
    isLoading: isLoadingList,
    error: listError,
  } = useAsyncData(fetchConversations);

  // Falls back to the first loaded conversation until the user picks one —
  // derived instead of synced via effect, so there's nothing to cascade.
  const effectiveConversationId =
    selectedConversationId ?? conversations?.[0]?.id ?? null;

  const { data: detail, isLoading: isLoadingDetail } = useAsyncData(
    () =>
      effectiveConversationId
        ? fetchConversationDetail(effectiveConversationId)
        : Promise.resolve(null),
    [effectiveConversationId]
  );

  const activeAgent =
    agents.find((agent) => agent.id === activeAgentId) ?? currentAgent;

  const baseConversation =
    conversations?.find((c) => c.id === effectiveConversationId) ?? null;

  // List rows carry name/avatar only; contact detail fields (email, phone,
  // company, location) come from the per-conversation GET /users/{id} fetch.
  const selectedConversation =
    baseConversation && detail
      ? { ...baseConversation, contact: { ...baseConversation.contact, ...detail.contact } }
      : baseConversation;

  const isLoadingChat = isLoadingList || (effectiveConversationId !== null && isLoadingDetail);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden bg-background text-foreground",
        className ?? "h-dvh"
      )}
    >
      <TopNav activeSectionOverride={activeSectionOverride} pulseSectionId={pulseSectionId} />

      {contentOverride ?? (
        <div className="flex min-h-0 flex-1">
          {!sidebarCollapsed && (
            <InboxSidebar
              activeAgentId={activeAgentId}
              onSelectAgent={setActiveAgentId}
            />
          )}

          <ConversationList
            title={activeAgent.name}
            conversations={conversations ?? []}
            isLoading={isLoadingList}
            error={listError}
            selectedConversationId={effectiveConversationId}
            onSelectConversation={setSelectedConversationId}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
          />

          <ChatPanel
            key={`chat-${selectedConversation?.id ?? "empty"}`}
            conversation={selectedConversation}
            messages={detail?.messages ?? []}
            isLoading={isLoadingChat}
            detailsOpen={detailsOpen}
            onToggleDetails={() => setDetailsOpen((value) => !value)}
          />

          {detailsOpen && (
            <DetailsPanel
              key={`details-${selectedConversation?.id ?? "empty"}`}
              conversation={selectedConversation}
              onClose={() => setDetailsOpen(false)}
              isLoading={isLoadingChat}
            />
          )}
        </div>
      )}
    </div>
  );
}
