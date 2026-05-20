"use client";

import { useState } from "react";
import { pokeLoreGenerator } from "@/ai/flows/poke-lore-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, BookOpen, Zap, Search } from "lucide-react";
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
      setLore("Connection to the PC interrupted... Ensure your API key is set.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <section className="container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-white font-black uppercase italic px-6 py-1">Lab Access: Granted</Badge>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-4">
            <BookOpen className="text-primary h-12 w-12" />
            PokéLore Archive
          </h2>
          <p className="text-xl text-muted-foreground mt-4 font-medium italic">
            "Accessing digital library for card theme analysis..."
          </p>
        </div>

        <div className="pokedex-frame">
          {/* Hardware Header */}
          <div className="bg-primary h-16 w-full flex items-center px-8 gap-4 border-b-8 border-black/10">
            <div className="pokedex-button bg-white border-2 border-black/20" />
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-auto flex items-center gap-2">
               <div className="h-1 w-12 bg-black/20 rounded-full" />
               <div className="h-1 w-6 bg-black/20 rounded-full" />
            </div>
          </div>

          <div className="p-8 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Search className="h-5 w-5" />
                <span className="font-black uppercase italic tracking-widest text-sm">Scanner Input</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Identify card theme..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  className="flex-1 bg-slate-200 border-4 border-slate-300 focus-visible:ring-primary h-16 text-xl px-6 rounded-2xl font-bold uppercase italic"
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
            </div>

            {lore && (
              <div className="pokedex-screen pokedex-screen-glass p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs font-black text-accent uppercase tracking-[0.4em] digital-text">DECODED DATA</div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-4 bg-accent/50 rounded-full animate-pulse" />
                    <div className="h-1.5 w-1.5 bg-accent/50 rounded-full" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl leading-relaxed italic text-white font-bold digital-text">
                  "{lore}"
                </p>
                <div className="mt-8 flex justify-end gap-3 items-center">
                  <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-2/3" />
                  </div>
                  <div className="h-6 w-6 bg-accent rounded-full border-2 border-white/20" />
                </div>
              </div>
            )}
            
            {!lore && !loading && (
              <div className="p-12 border-4 border-dashed border-slate-300 rounded-3xl text-center">
                <p className="text-slate-400 font-bold uppercase italic">Ready for analysis...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
