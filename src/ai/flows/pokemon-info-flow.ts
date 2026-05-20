'use server';
/**
 * @fileOverview A Genkit flow for gathering detailed Pokemon and TCG information.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PokemonInfoInputSchema = z.object({
  pokemonName: z.string().describe('The name of the Pokemon to search for.'),
});
export type PokemonInfoInput = z.infer<typeof PokemonInfoInputSchema>;

const PokemonInfoOutputSchema = z.object({
  name: z.string(),
  pokedexNumber: z.string().describe('The national pokedex number, e.g. #0001.'),
  types: z.array(z.string()).describe('The primary and secondary types of the Pokemon.'),
  stats: z.object({
    height: z.string().describe('Height in meters/centimeters.'),
    weight: z.string().describe('Weight in kg.'),
  }),
  facts: z.string().describe('3-4 interesting facts about the Pokemon.'),
  tcgStats: z.object({
    totalCards: z.string().describe('Approximate total number of TCG cards released for this Pokemon.'),
    notableSets: z.array(z.string()).describe('A list of 3-4 notable TCG sets this Pokemon appeared in.'),
  }),
  description: z.string().describe('A brief Pokédex-style description.'),
  imagePrompt: z.string().describe('A descriptive prompt for an AI image generator to create a high-quality, cinematic portrait of this Pokemon.'),
});
export type PokemonInfoOutput = z.infer<typeof PokemonInfoOutputSchema>;

export async function getPokemonInfo(input: PokemonInfoInput): Promise<PokemonInfoOutput> {
  return pokemonInfoFlow(input);
}

const pokemonInfoPrompt = ai.definePrompt({
  name: 'pokemonInfoPrompt',
  input: {schema: PokemonInfoInputSchema},
  output: {schema: PokemonInfoOutputSchema},
  prompt: `You are an expert Pokemon researcher and TCG historian. 
Provide a comprehensive report on the following Pokemon: {{{pokemonName}}}.

Include specific TCG history, such as which sets it is most famous for and approximately how many different cards exist for it.
Also provide standard Pokedex data like the National Pokedex Number, Types, and physical stats.
Keep the facts engaging and suitable for a community collector stall.`,
});

const pokemonInfoFlow = ai.defineFlow(
  {
    name: 'pokemonInfoFlow',
    inputSchema: PokemonInfoInputSchema,
    outputSchema: PokemonInfoOutputSchema,
  },
  async input => {
    const {output} = await pokemonInfoPrompt(input);
    return output!;
  }
);
