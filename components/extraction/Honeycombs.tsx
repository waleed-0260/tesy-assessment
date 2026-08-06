import { Inbox, Users, Sparkles, Workflow, Target } from "lucide-react";

import type { Honeycomb } from "@/components/extraction/Types";

/**
 * Single source of truth mapping each hero hexagon to its dashboard nav
 * destination. Icons intentionally match components/dashboard/top-nav.tsx
 * so the flying element reads as the same icon landing in the nav.
 */
export const HONEYCOMBS: Honeycomb[] = [
  {
    id: "hex-inbox",
    sectionId: "inbox",
    icon: <Inbox className="size-4" />,
    label: "Inbox",
    position: { top: "20px", left: "180px" },
  },
  {
    id: "hex-contacts",
    sectionId: "contacts",
    icon: <Users className="size-4" />,
    label: "Contacts",
    position: { top: "150px", left: "100px" },
  },
  {
    id: "hex-ai-employees",
    sectionId: "ai-employees",
    icon: <Sparkles className="size-4" />,
    label: "AI Employees",
    position: { top: "250px", left: "170px" },
  },
  {
    id: "hex-workflows",
    sectionId: "workflows",
    icon: <Workflow className="size-4" />,
    label: "Workflows",
    position: { top: "20px", right: "280px" },
  },
  {
    id: "hex-campaigns",
    sectionId: "campaigns",
    icon: <Target className="size-4" />,
    label: "Campaigns",
    position: { top: "150px", right: "60px" },
  },
];
