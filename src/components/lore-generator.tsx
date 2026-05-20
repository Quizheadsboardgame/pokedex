
"use client";

import { useState } from "react";
import { pokeLoreGenerator } from "@/ai/flows/poke-lore-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, BookOpen } from "lucide-react";

export function LoreGenerator() {
  const [input, setInput] = useState("");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await pokeLoreGenerator(input);
      setLore(result);
    } catch (error) {
      console.error(error);
      setLore("Error decoding data from the PC... Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="generator" className="py-20 bg-primary/5">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold mb-4 flex items-center justify-center gap-2">
            <BookOpen className="text-primary h-8 w-8" />
            PokéLore Lab
          </h2>
          <p className="text-muted-foreground">
            Enter a card theme or type to generate a Pokédex-style entry for your collection.
          </p>
        </div>

        <Card className="pokedex-frame bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Generator Console
            </CardTitle>
            <CardDescription>
              Example: "Vintage Charizard", "Water-type Kanto", "Rare Holo Lugia"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Type your card theme here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 bg-white border-primary/20 focus-visible:ring-primary"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !input}
                className="bg-primary text-white font-bold px-8 shadow-md"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze
              </Button>
            </div>

            {lore && (
              <div className="mt-8 p-6 bg-white rounded-xl border-l-8 border-accent shadow-inner animate-in fade-in slide-in-from-bottom-4">
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">DECODED LORE:</div>
                <p className="text-lg leading-relaxed italic text-foreground/80 font-medium">
                  "{lore}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
