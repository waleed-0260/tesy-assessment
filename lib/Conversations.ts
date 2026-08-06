import type { AvatarTone } from "@/components/common/AvatarTone";
import type { Conversation, Message } from "@/components/dashboard/Types";
import {
  fetchDummyPostsByUser,
  fetchDummyUserById,
  fetchDummyUsers,
  type DummyPost,
  type DummyUser,
} from "@/lib/Api";

const CONVERSATION_LIMIT = 12;

const AVATAR_TONES: AvatarTone[] = [
  "rose",
  "amber",
  "emerald",
  "sky",
  "violet",
  "orange",
];

const CHANNELS: Conversation["channel"][] = [
  "chat",
  "email",
  "whatsapp",
  "instagram",
];

const TIMESTAMPS = [
  "23:23",
  "22:47",
  "21:58",
  "20:31",
  "19:12",
  "18:04",
  "Yesterday",
  "Yesterday",
  "2 days ago",
  "2 days ago",
  "3 days ago",
  "3 days ago",
];

const AGENT_REPLIES = [
  "Thanks for reaching out — I'm on it.",
  "Got it, appreciate the details!",
  "Let me look into that and get back to you shortly.",
  "Noted, I'll follow up with next steps soon.",
  "Thanks for the update, I'll keep you posted.",
];

function toInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function mapUserToConversation(user: DummyUser, index: number): Conversation {
  return {
    id: `user-${user.id}`,
    contact: {
      id: String(user.id),
      name: `${user.firstName} ${user.lastName}`,
      initials: toInitials(user.firstName, user.lastName),
      tone: AVATAR_TONES[index % AVATAR_TONES.length],
      // Filled in by fetchConversationDetail once the conversation is opened.
      email: "",
      phone: "",
      company: "",
      location: "",
      language: "",
    },
    preview: user.company?.title
      ? `${user.company.title} at ${user.company.name}`
      : "Say hello \u{1F44B}",
    timestamp: TIMESTAMPS[index % TIMESTAMPS.length],
    unread: index % 3 === 0 ? (index % 4) + 1 : 0,
    channel: CHANNELS[index % CHANNELS.length],
  };
}

/**
 * Fetches live users from dummyjson.com and maps them straight into
 * conversation list rows. Contact detail fields stay empty here — they're
 * filled in by fetchConversationDetail once a conversation is opened, so
 * opening a conversation always hits GET /users/{id}.
 */
export async function fetchConversations(): Promise<Conversation[]> {
  const users = await fetchDummyUsers(CONVERSATION_LIMIT);
  return users.map(mapUserToConversation);
}

function formatClockTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function mapPostsToMessages(posts: DummyPost[]): Message[] {
  const messages: Message[] = [];
  const startMinutes = 9 * 60;

  posts.forEach((post, index) => {
    const incomingAt = startMinutes + index * 14;
    messages.push({
      id: `post-${post.id}`,
      direction: "incoming",
      text: post.body,
      timestamp: formatClockTime(incomingAt),
    });
    messages.push({
      id: `reply-${post.id}`,
      direction: "outgoing",
      text: AGENT_REPLIES[index % AGENT_REPLIES.length],
      timestamp: formatClockTime(incomingAt + 5),
      read: true,
    });
  });

  return messages;
}

export interface ConversationDetail {
  contact: Pick<
    Conversation["contact"],
    "email" | "phone" | "company" | "location" | "language"
  >;
  messages: Message[];
}

/**
 * Per-conversation fetch, triggered when a conversation is opened:
 * GET /users/{id} for the full contact profile, GET /posts/user/{id} for
 * the message thread — run in parallel.
 */
export async function fetchConversationDetail(
  conversationId: string
): Promise<ConversationDetail> {
  const userId = conversationId.replace("user-", "");
  const [user, posts] = await Promise.all([
    fetchDummyUserById(userId),
    fetchDummyPostsByUser(userId),
  ]);

  return {
    contact: {
      email: user.email,
      phone: user.phone,
      company: user.company?.name ?? "—",
      location: user.address?.city ?? "—",
      language: "English (US)",
    },
    messages: mapPostsToMessages(posts),
  };
}
