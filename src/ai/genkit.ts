import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This global `ai` instance will be used for all AI flows.
export const ai = genkit({
  plugins: [
    googleAI({
      // Specify the model directly in the plugin configuration.
      // This ensures all flows and prompts use this model by default.
      model: 'gemini-1.5-flash',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
