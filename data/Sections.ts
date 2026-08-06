import type { AvatarTone } from "@/components/common/AvatarTone";
import type { SectionId } from "@/components/extraction/Types";

export interface SectionRow {
  id: string;
  initials: string;
  tone: AvatarTone;
  title: string;
  subtitle: string;
  meta: string;
}

export interface SectionContent {
  sectionId: SectionId;
  label: string;
  description: string;
  rows: SectionRow[];
}

/**
 * Static, hardcoded placeholder content per section — no fetching. Roughly
 * mirrors what the real dashboard panels would show once populated.
 */
export const SECTION_DATA: Record<SectionId, SectionContent> = {
  inbox: {
    sectionId: "inbox",
    label: "Inbox",
    description: "Every customer conversation, extracted and triaged.",
    rows: [
      { id: "inbox-1", initials: "OM", tone: "rose", title: "Olivia Mckinsey", subtitle: "Thanks, I'll check the tracking link and get back to you shortly.", meta: "23:23" },
      { id: "inbox-2", initials: "HP", tone: "amber", title: "Harold Prescott", subtitle: "Is it possible to upgrade my plan before the renewal date?", meta: "22:47" },
      { id: "inbox-3", initials: "SF", tone: "violet", title: "Sana Farooq", subtitle: "The invoice PDF isn't attaching correctly, can you resend?", meta: "21:58" },
      { id: "inbox-4", initials: "MW", tone: "emerald", title: "Marcus Webb", subtitle: "Perfect, that resolved it. Appreciate the quick turnaround!", meta: "20:31" },
      { id: "inbox-5", initials: "YT", tone: "sky", title: "Yuki Tanaka", subtitle: "Could you walk me through setting up the webhook integration?", meta: "19:12" },
      { id: "inbox-6", initials: "RC", tone: "orange", title: "Renee Castillo", subtitle: "Cancelling my subscription — can you confirm the last billing date?", meta: "18:04" },
    ],
  },
  contacts: {
    sectionId: "contacts",
    label: "Contacts",
    description: "Customer records synced from every channel.",
    rows: [
      { id: "contact-1", initials: "NR", tone: "rose", title: "Northwind Retail", subtitle: "olivia.mckinsey@northwind.co", meta: "Austin, TX" },
      { id: "contact-2", initials: "BS", tone: "amber", title: "Brightline Studio", subtitle: "h.prescott@brightline.io", meta: "Chicago, IL" },
      { id: "contact-3", initials: "LC", tone: "violet", title: "LoopCart", subtitle: "sana.farooq@loopcart.com", meta: "Karachi, PK" },
      { id: "contact-4", initials: "WD", tone: "emerald", title: "Webb Designs", subtitle: "marcus@webbdesigns.com", meta: "Seattle, WA" },
      { id: "contact-5", initials: "SF", tone: "sky", title: "Sorafind", subtitle: "yuki.tanaka@sorafind.jp", meta: "Tokyo, JP" },
      { id: "contact-6", initials: "PC", tone: "orange", title: "Paperlane Co.", subtitle: "renee.castillo@paperlane.com", meta: "Las Vegas, NV" },
      { id: "contact-7", initials: "NW", tone: "rose", title: "Nordicware", subtitle: "tobias.l@nordicware.se", meta: "Stockholm, SE" },
    ],
  },
  "ai-employees": {
    sectionId: "ai-employees",
    label: "AI Employees",
    description: "Automated teammates working your queues right now.",
    rows: [
      { id: "ai-1", initials: "AV", tone: "sky", title: "Ava — Support Agent", subtitle: "Handling first-response triage across chat and email", meta: "Active" },
      { id: "ai-2", initials: "RX", tone: "violet", title: "Rex — Billing Agent", subtitle: "Resolving invoice and renewal questions", meta: "Active" },
      { id: "ai-3", initials: "IV", tone: "emerald", title: "Iva — Onboarding Agent", subtitle: "Walking new signups through setup", meta: "Idle" },
      { id: "ai-4", initials: "NL", tone: "amber", title: "Nolan — QA Reviewer", subtitle: "Auditing closed conversations for tone and accuracy", meta: "Active" },
      { id: "ai-5", initials: "MI", tone: "orange", title: "Mira — Escalation Agent", subtitle: "Routing high-priority tickets to human agents", meta: "Active" },
    ],
  },
  workflows: {
    sectionId: "workflows",
    label: "Workflows",
    description: "Automations extracted from your current setup.",
    rows: [
      { id: "wf-1", initials: "W1", tone: "sky", title: "New order confirmation", subtitle: "Trigger: order created", meta: "Enabled" },
      { id: "wf-2", initials: "W2", tone: "violet", title: "Abandoned cart follow-up", subtitle: "Trigger: cart idle 2h", meta: "Enabled" },
      { id: "wf-3", initials: "W3", tone: "amber", title: "VIP escalation routing", subtitle: "Trigger: tag = VIP", meta: "Enabled" },
      { id: "wf-4", initials: "W4", tone: "emerald", title: "CSAT survey send", subtitle: "Trigger: conversation closed", meta: "Paused" },
      { id: "wf-5", initials: "W5", tone: "orange", title: "Renewal reminder", subtitle: "Trigger: 14 days before renewal", meta: "Enabled" },
    ],
  },
  campaigns: {
    sectionId: "campaigns",
    label: "Campaigns",
    description: "Outbound sequences pulled in from your marketing tools.",
    rows: [
      { id: "camp-1", initials: "SP", tone: "rose", title: "Spring restock announcement", subtitle: "Email — 12,400 recipients", meta: "38% open" },
      { id: "camp-2", initials: "WB", tone: "amber", title: "Webinar invite", subtitle: "Email — 3,120 recipients", meta: "51% open" },
      { id: "camp-3", initials: "LO", tone: "violet", title: "Loyalty tier upgrade", subtitle: "SMS — 8,900 recipients", meta: "22% click" },
      { id: "camp-4", initials: "HD", tone: "emerald", title: "Holiday early access", subtitle: "Email — 15,760 recipients", meta: "44% open" },
      { id: "camp-5", initials: "WC", tone: "sky", title: "Win-back sequence", subtitle: "Email — 2,430 recipients", meta: "19% open" },
      { id: "camp-6", initials: "RF", tone: "orange", title: "Referral program launch", subtitle: "Email — 6,050 recipients", meta: "33% open" },
    ],
  },
};
