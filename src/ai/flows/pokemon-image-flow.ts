'use server';
/**
 * @fileOverview A Genkit flow for generating an AI image of a Pokemon.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PokemonImageInputSchema = z.object({
  prompt: z.string().describe('The prompt for generating the Pokemon image.'),
});
export type PokemonImageInput = z.infer<typeof PokemonImageInputSchema>;

export async function generatePokemonImage(input: PokemonImageInput): Promise<{url: string}> {
  return pokemonImageFlow(input);
}

const pokemonImageFlow = ai.defineFlow(
  {
    name: 'pokemonImageFlow',
    inputSchema: PokemonImageInputSchema,
    outputSchema: z.object({url: z.string()}),
  },
  async input => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.prompt,
    });
    
    if (!media) throw new Error('Failed to generate image');
    return { url: media.url };
  }
);
