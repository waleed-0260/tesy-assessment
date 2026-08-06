"use client";

import { useState } from "react";
import { ChevronDown, CircleUser, Inbox, Users2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { ToneAvatar } from "@/components/common/ToneAvatar";
import { agents, currentAgent, teams } from "@/components/dashboard/Data";

interface InboxSidebarProps {
  activeAgentId: string;
  onSelectAgent: (agentId: string) => void;
}

const STATIC_FILTERS = [
  { id: "my-inbox", label: "My Inbox", icon: Inbox, count: undefined },
  { id: "all", label: "All", icon: Users2, count: 28 },
  { id: "unassigned", label: "Unassigned", icon: CircleUser, count: 5 },
] as const;

export function InboxSidebar({
  activeAgentId,
  onSelectAgent,
}: InboxSidebarProps) {
  const [activeFilter, setActiveFilter] = useState<string>("my-inbox");
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [agentsOpen, setAgentsOpen] = useState(true);

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 overflow-y-auto border-r border-border bg-background px-3 py-4">
      <nav className="flex flex-col gap-0.5">
        {STATIC_FILTERS.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveFilter(item.id)}
              className={cn(
                "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {item.label}
              </span>
              {item.count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div>
        <button
          type="button"
          onClick={() => setTeamsOpen((open) => !open)}
          className="flex w-full items-center justify-between px-2.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Teams
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              !teamsOpen && "-rotate-90"
            )}
          />
        </button>
        {teamsOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {teams.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => setActiveFilter(team.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 pl-8 text-sm font-medium transition-colors",
                  activeFilter === team.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {team.name}
                <span className="text-xs text-muted-foreground">
                  {team.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1">
        <button
          type="button"
          onClick={() => setAgentsOpen((open) => !open)}
          className="flex w-full items-center justify-between px-2.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Agents
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              !agentsOpen && "-rotate-90"
            )}
          />
        </button>
        {agentsOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {agents.map((agent) => {
              const isActive = agent.id === activeAgentId;
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => onSelectAgent(agent.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <ToneAvatar
                    size="sm"
                    initials={agent.initials}
                    tone={agent.tone}
                    online={agent.online}
                  />
                  <span className="truncate">
                    {agent.id === currentAgent.id ? "You" : agent.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
