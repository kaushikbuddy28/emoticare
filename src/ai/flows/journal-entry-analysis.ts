'use server';

/**
 * @fileOverview AI flow for analyzing journal entries for sentiment.
 *
 * - analyzeJournalEntry - Analyzes the sentiment of a journal entry.
 * - JournalEntryAnalysisInput - The input type for the analyzeJournalEntry function.
 * - JournalEntryAnalysisOutput - The return type for the analyzeJournalEntry function.
 */

import { genkit, generation, AI } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const JournalEntryAnalysisInputSchema = z.object({
  text: z.string().describe('The text content of the journal entry.'),
  apiKey: z.string().optional().describe('The user-provided Gemini API key.'),
});
export type JournalEntryAnalysisInput = z.infer<typeof JournalEntryAnalysisInputSchema>;

const JournalEntryAnalysisOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the journal entry, such as positive, negative, or neutral.'
    ),
  moodLabel: z
    .string()
    .describe(
      'A label describing the overall mood expressed in the journal entry.'
    ),
});
export type JournalEntryAnalysisOutput = z.infer<typeof JournalEntryAnalysisOutputSchema>;

export async function analyzeJournalEntry(
  input: JournalEntryAnalysisInput
): Promise<JournalEntryAnalysisOutput> {
  return journalEntryAnalysisFlow(input);
}

const prompt = generation.definePrompt({
  name: 'journalEntryAnalysisPrompt',
  input: {schema: JournalEntryAnalysisInputSchema},
  output: {schema: JournalEntryAnalysisOutputSchema},
  prompt: `Analyze the following journal entry text and determine the sentiment and mood label.\n\nText: {{{text}}}\n\nSentiment: \nMood Label: `,
});

const journalEntryAnalysisFlow = AI.defineFlow(
  {
    name: 'journalEntryAnalysisFlow',
    inputSchema: JournalEntryAnalysisInputSchema,
    outputSchema: JournalEntryAnalysisOutputSchema,
  },
  async input => {
    const ai = genkit({
      plugins: [googleAI({ apiKey: input.apiKey || process.env.GEMINI_API_KEY })],
      model: 'googleai/gemini-2.0-flash',
    });
    const {output} = await prompt(input);
    return output!;
  }
);
