'use server';
/**
 * @fileOverview A Genkit flow for generating Pokédex-like lore snippets.
 *
 * - pokeLoreGenerator - A function that generates a short lore snippet based on a Pokémon card theme or type.
 * - PokeLoreGeneratorInput - The input type for the pokeLoreGenerator function.
 * - PokeLoreGeneratorOutput - The return type for the pokeLoreGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PokeLoreGeneratorInputSchema = z
  .string()
  .describe('A Pokémon card theme or type (e.g., \'Vintage Charizard\', \'Water-type Kanto\').');
export type PokeLoreGeneratorInput = z.infer<typeof PokeLoreGeneratorInputSchema>;

const PokeLoreGeneratorOutputSchema = z
  .string()
  .describe('A short, descriptive lore snippet simulating a Pokédex entry.');
export type PokeLoreGeneratorOutput = z.infer<typeof PokeLoreGeneratorOutputSchema>;

export async function pokeLoreGenerator(input: PokeLoreGeneratorInput): Promise<PokeLoreGeneratorOutput> {
  return pokeLoreGeneratorFlow(input);
}

const pokeLoreGeneratorPrompt = ai.definePrompt({
  name: 'pokeLoreGeneratorPrompt',
  input: { schema: PokeLoreGeneratorInputSchema },
  output: { schema: PokeLoreGeneratorOutputSchema },
  prompt: `You are an expert in Pokémon lore and history, specialized in creating concise, engaging Pokédex-style entries.

Generate a short, creative lore snippet (2-3 sentences) for a Pokémon card based on the following theme or type. The snippet should capture the essence of a Pokédex entry, providing a sense of mystique, power, or unique characteristic.

Theme/Type: {{{input}}}`,
});

const pokeLoreGeneratorFlow = ai.defineFlow(
  {
    name: 'pokeLoreGeneratorFlow',
    inputSchema: PokeLoreGeneratorInputSchema,
    outputSchema: PokeLoreGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await pokeLoreGeneratorPrompt(input);
    return output!;
  }
);
