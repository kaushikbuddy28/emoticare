
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This global `ai` instance will be used for flows that do not require a user-provided API key.
// For flows that do, a new, locally-scoped `ai` instance will be created with the user's key.
export const ai = genkit({
  plugins: [googleAI()],
  // You can move the model to the prompt or flow if you need to use different models.
  // model: 'googleai/gemini-1.5-flash', 
});
