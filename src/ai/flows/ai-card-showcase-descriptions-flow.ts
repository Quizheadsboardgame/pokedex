'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating engaging and descriptive text
 * for different categories of Pokémon cards for the "Card Era & Type Showcase" feature.
 *
 * - generateCardShowcaseDescription - A function to generate descriptions for Pokémon card categories.
 * - CardShowcaseInput - The input type for the generateCardShowcaseDescription function.
 * - CardShowcaseOutput - The return type for the generateCardShowcaseDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CardShowcaseInputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of Pokémon cards for which to generate a description (e.g., "Vintage Singles", "Modern Bulk", "Rare Holos").'
    ),
});
export type CardShowcaseInput = z.infer<typeof CardShowcaseInputSchema>;

const CardShowcaseOutputSchema = z.object({
  description: z.string().describe('An engaging and descriptive text for the given Pokémon card category.'),
});
export type CardShowcaseOutput = z.infer<typeof CardShowcaseOutputSchema>;

export async function generateCardShowcaseDescription(
  input: CardShowcaseInput
): Promise<CardShowcaseOutput> {
  return cardShowcaseFlow(input);
}

const cardShowcasePrompt = ai.definePrompt({
  name: 'cardShowcasePrompt',
  input: {schema: CardShowcaseInputSchema},
  output: {schema: CardShowcaseOutputSchema},
  prompt: `You are a creative marketing copywriter specializing in Pokémon collectibles, working for "Newton's Collectables".
Your task is to generate a short, engaging, and descriptive text snippet for a specific category of Pokémon cards.

Here's some information about "Newton's Collectables" and the website:
- **Store Name:** Newton's Collectables
- **Vibe:** Lowkey, family-friendly market stall in Bury St Edmunds.
- **Inventory:** We sell Pokémon singles from vintage to modern, ranging from 10p bulk cards to singles worth a few hundred pounds.
- **Website Feel:** The website has a Pokédex feel with Pokémon-inspired colors.

Generate an engaging description (approximately 2-3 sentences) for the following Pokémon card category. The description should highlight the appeal and variety within this category, enticing both new and experienced collectors, and reflect the store's friendly, welcoming atmosphere.

Category: {{{category}}}`,
});

const cardShowcaseFlow = ai.defineFlow(
  {
    name: 'cardShowcaseFlow',
    inputSchema: CardShowcaseInputSchema,
    outputSchema: CardShowcaseOutputSchema,
  },
  async input => {
    const {output} = await cardShowcasePrompt(input);
    return output!;
  }
);
