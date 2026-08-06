

const DUMMYJSON_BASE = "https://dummyjson.com";

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  company: { name: string; title: string; department: string };
  address: { city: string; state?: string; country?: string };
}

interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags?: string[];
}

interface DummyPostsResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}

/** Conversation list source — one row per user. */
export async function fetchDummyUsers(limit = 12): Promise<DummyUser[]> {
  const response = await fetch(`${DUMMYJSON_BASE}/users?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Users request failed: ${response.status}`);
  }

  const data: DummyUsersResponse = await response.json();
  return data.users;
}

/** Per-conversation detail fetch — hit when a conversation is opened. */
export async function fetchDummyUserById(id: string | number): Promise<DummyUser> {
  const response = await fetch(`${DUMMYJSON_BASE}/users/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`User ${id} request failed: ${response.status}`);
  }

  return response.json();
}

/** Stands in for the contact's message thread — one bubble per post. */
export async function fetchDummyPostsByUser(id: string | number): Promise<DummyPost[]> {
  const response = await fetch(`${DUMMYJSON_BASE}/posts/user/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Posts for user ${id} request failed: ${response.status}`);
  }

  const data: DummyPostsResponse = await response.json();
  return data.posts;
}
