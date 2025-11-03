// This file uses server-side code.
'use server';

/**
 * @fileOverview A mood prediction AI agent that fuses data from facial expressions, voice tone, and text input to predict the user's current mood.
 *
 * - predictMood - A function that handles the mood prediction process.
 * - MoodPredictionInput - The input type for the predictMood function.
 * - MoodPredictionOutput - The return type for the predictMood function.
 */

import { genkit, generation, AI } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const MoodPredictionInputSchema = z.object({
  faceEmbedding: z.array(z.number()).optional().describe('Facial expression embedding.'),
  audioEmbedding: z.array(z.number()).optional().describe('Voice tone embedding.'),
  text: z.string().optional().describe('Text input from the user.'),
  apiKey: z.string().optional().describe('The user-provided Gemini API key.'),
});
export type MoodPredictionInput = z.infer<typeof MoodPredictionInputSchema>;

const MoodPredictionOutputSchema = z.object({
  mood: z.string().describe('The predicted mood.'),
  probabilities: z
    .object({
      happy: z.number().describe('Probability of being happy.'),
      sad: z.number().describe('Probability of being sad.'),
      neutral: z.number().describe('Probability of being neutral.'),
      anxious: z.number().describe('Probability of being anxious.'),
      angry: z.number().describe('Probability of being angry.'),
    })
    .describe('Probabilities for each mood category.'),
  recommendedAction: z.string().describe('A recommended action based on the predicted mood.'),
});
export type MoodPredictionOutput = z.infer<typeof MoodPredictionOutputSchema>;

export async function predictMood(input: MoodPredictionInput): Promise<MoodPredictionOutput> {
  return predictMoodFlow(input);
}

const prompt = generation.definePrompt({
  name: 'moodPredictionPrompt',
  input: {schema: MoodPredictionInputSchema},
  output: {schema: MoodPredictionOutputSchema},
  prompt: `You are an AI trained to predict the mood of a user based on their facial expressions, voice tone, and text input.\n\nAnalyze the following data to predict the user's mood:\n\nFacial Expression Embedding: {{#if faceEmbedding}}{{{faceEmbedding}}}{{else}}Not provided{{/if}}\nVoice Tone Embedding: {{#if audioEmbedding}}{{{audioEmbedding}}}{{else}}Not provided{{/if}}\nText Input: {{#if text}}{{{text}}}{{else}}Not provided{{/if}}\n\nBased on this analysis, predict the user's mood and provide a recommended action.\n\nEnsure that the output is structured to match the schema descriptions.`, // Ensure output matches schema descriptions
});

const predictMoodFlow = AI.defineFlow(
  {
    name: 'predictMoodFlow',
    inputSchema: MoodPredictionInputSchema,
    outputSchema: MoodPredictionOutputSchema,
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
