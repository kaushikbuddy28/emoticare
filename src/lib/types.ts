export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  content: string;
  sentiment: string;
  moodLabel: string;
}
