"use client";

import { useState } from "react";
import { pokeLoreGenerator } from "@/ai/flows/poke-lore-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, BookOpen, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LoreLabPage() {
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
      setLore("Connection to the PC interrupted... Ensure your API key is set and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <section className="container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-white font-black uppercase italic">The Lab</Badge>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-4">
            <BookOpen className="text-primary h-12 w-12" />
            PokéLore Archive
          </h2>
          <p className="text-xl text-muted-foreground mt-4 font-medium">
            Enter a card name or character to generate a Pokédex-style entry from our digital library.
          </p>
        </div>

        <Card className="pokedex-frame">
          <div className="bg-primary h-12 w-full flex items-center px-6 gap-2 border-b-4 border-black/10">
            <div className="h-6 w-6 rounded-full bg-white border-2 border-black/10" />
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-black uppercase italic flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent fill-accent" />
              Scanner Interface
            </CardTitle>
            <CardDescription className="text-muted-foreground font-bold">
              Example: "Base Set Charizard", "Mewtwo Strikes Back", "Gengar's Mischief"
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Analyze card theme..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 bg-muted border-2 border-secondary/20 focus-visible:ring-secondary h-16 text-xl px-6 rounded-2xl font-bold"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !input}
                className="bg-secondary text-white font-black px-10 h-16 text-xl hover:bg-secondary/80 transition-all rounded-2xl shadow-[0_8px_0_0_rgba(20,60,120,1)] active:translate-y-1 active:shadow-none uppercase italic"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-6 w-6" />}
                Scan
              </Button>
            </div>

            {lore && (
              <div className="pokedex-screen p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-xs font-black text-accent mb-4 uppercase tracking-[0.4em]">DECODED DATA:</div>
                <p className="text-2xl md:text-3xl leading-relaxed italic text-white font-bold font-serif">
                  "{lore}"
                </p>
                <div className="mt-8 flex justify-end gap-2">
                  <div className="h-4 w-12 bg-secondary rounded-full" />
                  <div className="h-4 w-4 bg-accent rounded-full" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}