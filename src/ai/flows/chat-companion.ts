'use server';
/**
 * @fileOverview An AI chat companion that provides supportive, non-judgmental responses based on CBT principles.
 *
 * - chatWithCompanion - A function that handles the conversation with the AI chat companion.
 * - ChatCompanionInput - The input type for the chatWithCompanion function.
 * - ChatCompanionOutput - The return type for the chatWithCompanion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatCompanionInputSchema = z.object({
  message: z.string().describe('The user message to the chat companion.'),
  context_embeddings: z
    .array(z.number())
    .optional()
    .describe('Optional context embeddings for the conversation.'),
});
export type ChatCompanionInput = z.infer<typeof ChatCompanionInputSchema>;

const ChatCompanionOutputSchema = z.object({
  response: z.string().describe('The response from the AI chat companion.'),
  safety_level: z.string().describe('The safety level of the response.'),
  suggested_actions: z
    .array(z.string())
    .describe('Suggested CBT exercises or actions.'),
});
export type ChatCompanionOutput = z.infer<typeof ChatCompanionOutputSchema>;

export async function chatWithCompanion(input: ChatCompanionInput): Promise<ChatCompanionOutput> {
  return chatCompanionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatCompanionPrompt',
  input: {schema: ChatCompanionInputSchema},
  output: {schema: ChatCompanionOutputSchema},
  prompt: `You are a supportive, non-judgmental mental health companion that uses CBT-informed approaches. You are multilingual and can communicate in languages like English and Hindi. Respond to the user in the language they use. You must ask clarifying questions, avoid clinical diagnosis, provide short grounding exercises, and when the user mentions self-harm or suicidal thoughts, you must instruct them to access emergency resources and ask permission to share helpline details. Keep responses under 250 words unless the user asks for more.

User message: {{{message}}}`,
});

const chatCompanionFlow = ai.defineFlow(
  {
    name: 'chatCompanionFlow',
    inputSchema: ChatCompanionInputSchema,
    outputSchema: ChatCompanionOutputSchema,
  },
  async input => {
    const {output} = await ai.run(prompt, input);
    return output!;
  }
);
