import type {
  Agent,
  Note,
  RelatedChat,
  Team,
} from "@/components/dashboard/Types";

export const currentAgent: Agent = {
  id: "agent-michael",
  name: "Michael Johnson",
  initials: "MJ",
  tone: "sky",
  online: true,
};

export const teams: Team[] = [
  { id: "sales", name: "Sales", count: 7 },
  { id: "support", name: "Customer Support", count: 16 },
];

export const agents: Agent[] = [
  currentAgent,
  { id: "agent-priya", name: "Priya Anand", initials: "PA", tone: "violet", online: true },
  { id: "agent-diego", name: "Diego Ruiz", initials: "DR", tone: "amber" },
  { id: "agent-lena", name: "Lena Kowalski", initials: "LK", tone: "emerald", online: true },
];

// Demo extras (tags/notes/other-chats) are keyed to the first conversation
// in the live dummyjson-backed list ("user-1") so the details panel still
// reads as populated by default, without pinning it to a specific name.
export const notesByConversation: Record<string, Note[]> = {
  "user-1": [
    {
      id: "n1",
      author: "Michael Johnson",
      text: "VIP customer since 2022. Prefers email follow-ups over calls.",
      timestamp: "2 days ago",
    },
    {
      id: "n2",
      author: "Lena Kowalski",
      text: "Flagged a previous delivery delay — keep an eye on this order.",
      timestamp: "5 days ago",
    },
  ],
};

export const conversationTags: Record<string, string[]> = {
  "user-1": ["VIP", "Shipping"],
};

export const relatedChatsByConversation: Record<string, RelatedChat[]> = {
  "user-1": [
    {
      id: "rc-1",
      name: "Fit4Life",
      initials: "FL",
      tone: "orange",
      preview: "On my way!",
      date: "08/08/25",
    },
  ],
};
