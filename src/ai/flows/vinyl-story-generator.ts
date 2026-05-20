'use server';
/**
 * @fileOverview A Genkit flow for generating evocative backstories for vintage albums.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VinylStoryInputSchema = z
  .string()
  .describe('An artist or album title (e.g., \'Miles Davis - Kind of Blue\', \'Pink Floyd\').');
export type VinylStoryInput = z.infer<typeof VinylStoryInputSchema>;

const VinylStoryOutputSchema = z
  .string()
  .describe('A short, evocative backstory about the album or artist.');

export async function generateVinylStory(input: VinylStoryInput): Promise<string> {
  return vinylStoryFlow(input);
}

const vinylStoryPrompt = ai.definePrompt({
  name: 'vinylStoryPrompt',
  input: { schema: VinylStoryInputSchema },
  output: { schema: VinylStoryOutputSchema },
  prompt: `You are a legendary music critic and vinyl historian with a deep passion for the analog sound.

Generate a short, evocative backstory (2-3 sentences) for a record based on the following artist or album. The snippet should capture the mood of the era, the soul of the recording, and why it belongs in a collector's crate.

Input: {{{input}}}`,
});

const vinylStoryFlow = ai.defineFlow(
  {
    name: 'vinylStoryFlow',
    inputSchema: VinylStoryInputSchema,
    outputSchema: VinylStoryOutputSchema,
  },
  async (input) => {
    const { output } = await vinylStoryPrompt(input);
    return output!;
  }
);