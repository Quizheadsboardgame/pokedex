"use client";

import { useState } from "react";
import { generateVinylStory } from "@/ai/flows/vinyl-story-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, Library } from "lucide-react";

export function StoryLab() {
  const [input, setInput] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateVinylStory(input);
      setStory(result);
    } catch (error) {
      console.error(error);
      setStory("The needle skipped... ensure your API key is set and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="story" className="py-32 bg-secondary/10">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3 text-white">
            <Library className="text-primary h-10 w-10" />
            The Record Registry
          </h2>
          <p className="text-muted-foreground text-lg">
            Unlock the history behind your favorite albums with our AI-powered music historian.
          </p>
        </div>

        <Card className="vinyl-frame bg-secondary/30 border-primary/20 p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-primary" />
              Analyze Album
            </CardTitle>
            <CardDescription className="text-primary/60">
              Enter an artist or album (e.g., "The Velvet Underground", "Dark Side of the Moon")
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search the archives..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 bg-black/40 border-primary/10 text-white focus-visible:ring-primary h-14 text-lg px-6"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !input}
                className="bg-primary text-black font-bold px-10 h-14 text-lg hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(255,191,0,0.2)]"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-5 w-5" />}
                Decode
              </Button>
            </div>

            {story && (
              <div className="mt-10 p-10 bg-black/40 rounded-lg border-l-4 border-primary animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="text-xs font-bold text-primary mb-4 uppercase tracking-[0.3em]">CRITIC'S NOTE:</div>
                <p className="text-2xl leading-relaxed italic text-white/90 font-medium font-serif">
                  "{story}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}