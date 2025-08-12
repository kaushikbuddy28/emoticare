"use server"

import { chatWithCompanion } from "@/ai/flows/chat-companion"
import type { ChatCompanionInput, ChatCompanionOutput } from "@/ai/flows/chat-companion"
import { analyzeJournalEntry } from "@/ai/flows/journal-entry-analysis"
import type { JournalEntryAnalysisInput, JournalEntryAnalysisOutput } from "@/ai/flows/journal-entry-analysis"
import { predictMood } from "@/ai/flows/mood-prediction"
import type { MoodPredictionInput, MoodPredictionOutput } from "@/ai/flows/mood-prediction"

export async function getChatResponse(
  input: ChatCompanionInput
): Promise<ChatCompanionOutput> {
  // In a real app, you might add user authentication checks here.
  const response = await chatWithCompanion(input)
  return response
}

export async function analyzeJournalEntryAction(
  input: JournalEntryAnalysisInput
): Promise<JournalEntryAnalysisOutput> {
  const response = await analyzeJournalEntry(input)
  return response
}

export async function predictMoodAction(
  input: MoodPredictionInput
): Promise<MoodPredictionOutput> {
  const response = await predictMood(input)
  return response
}
