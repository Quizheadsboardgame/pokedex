'use server';
/**
 * @fileOverview Genkit flow for generating elegant descriptions for music genres.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VinylCategoryInputSchema = z.object({
  category: z.string().describe('The music genre or category (e.g., "Blue Note Jazz", "70s Prog Rock").'),
});
export type VinylCategoryInput = z.infer<typeof VinylCategoryInputSchema>;

const VinylCategoryOutputSchema = z.object({
  description: z.string().describe('An elegant and inviting description of the genre.'),
});

export async function generateVinylCategoryDescription(
  input: VinylCategoryInput
): Promise<{ description: string }> {
  return vinylCategoryFlow(input);
}

const vinylCategoryPrompt = ai.definePrompt({
  name: 'vinylCategoryPrompt',
  input: {schema: VinylCategoryInputSchema},
  output: {schema: VinylCategoryOutputSchema},
  prompt: `You are a sophisticated copywriter for "Newton's Vintage Vinyls", a high-end record exchange in Bury St Edmunds.
Your task is to generate a short, inviting description for a specific music category.

Category: {{{category}}}

The tone should be warm, knowledgeable, and slightly nostalgic. Mention the timeless quality of the music and the tactile joy of the record.`,
});

const vinylCategoryFlow = ai.defineFlow(
  {
    name: 'vinylCategoryFlow',
    inputSchema: VinylCategoryInputSchema,
    outputSchema: VinylCategoryOutputSchema,
  },
  async input => {
    const {output} = await vinylCategoryPrompt(input);
    return output!;
  }
);