import type { AvatarTone } from "@/components/common/AvatarTone";

export interface Agent {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  online?: boolean;
}

export interface Team {
  id: string;
  name: string;
  count: number;
}

export interface Contact {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  email: string;
  phone: string;
  company: string;
  location: string;
  language: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  preview: string;
  timestamp: string;
  unread: number;
  channel: "email" | "chat" | "whatsapp" | "instagram";
}

export type MessageDirection = "incoming" | "outgoing";

export interface Message {
  id: string;
  direction: MessageDirection;
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Note {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface RelatedChat {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  preview: string;
  date: string;
}
