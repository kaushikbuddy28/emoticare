import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This global `ai` instance will be used for flows that do not require a user-provided API key.
// For flows that do, a new, locally-scoped `ai` instance will be created with the user's key.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
