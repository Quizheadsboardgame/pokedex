
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ShieldAlert, Calculator, Coins, RefreshCw, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

export default function TradeInPage() {
  const [cards, setCards] = useState<TradeCard[]>([
    { id: "1", name: "", value: 0 }
  ]);

  const addCard = () => {
    setCards([...cards, { id: Math.random().toString(36).substr(2, 9), name: "", value: 0 }]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(c => c.id !== id));
    } else {
      setCards([{ id: "1", name: "", value: 0 }]);
    }
  };

  const updateCard = (id: string, field: keyof TradeCard, val: string | number) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const totalValue = cards.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  return (
    <div className="bg-slate-100 min-h-screen py-12 md:py-20">
      <section className="container px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary text-white font-black uppercase italic px-6 py-1">Trade-In Protocol Alpha</Badge>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground">
            Trade-In <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-muted-foreground mt-4 font-medium italic">
            "Estimate your collection value for Bury Market trading..."
          </p>
        </div>

        <div className="pokedex-frame">
          {/* Hardware Header */}
          <div className="bg-primary h-16 w-full flex items-center px-8 gap-4 border-b-8 border-black/10">
            <div className="pokedex-button bg-white border-2 border-black/20" />
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <div className="h-3 w-3 rounded-full bg-blue-400" />
            </div>
            <div className="ml-auto flex items-center gap-4">
               <div className="h-2 w-32 bg-black/20 rounded-full" />
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-widest text-sm">
                  <Calculator className="h-5 w-5" />
                  Card Data Entry
                </div>
                <Button 
                  variant="outline" 
                  onClick={addCard}
                  className="border-4 border-primary text-primary font-black uppercase italic rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {cards.map((card, index) => (
                  <div key={card.id} className="flex gap-3 items-end group animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black uppercase italic text-slate-400 ml-1">Card Name/Set</label>
                      <Input 
                        placeholder="e.g. Base Set Charizard"
                        value={card.name}
                        onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                        className="bg-white border-4 border-slate-200 focus-visible:ring-primary h-12 rounded-xl font-bold italic"
                      />
                    </div>
                    <div className="w-24 md:w-32 space-y-1">
                      <label className="text-[10px] font-black uppercase italic text-slate-400 ml-1">Value (£)</label>
                      <Input 
                        type="number"
                        placeholder="0"
                        value={card.value || ''}
                        onChange={(e) => updateCard(card.id, 'value', e.target.value)}
                        className="bg-white border-4 border-slate-200 focus-visible:ring-primary h-12 rounded-xl font-bold italic"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCard(card.id)}
                      className="h-12 w-12 text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>

              <Card className="bg-amber-50 border-4 border-amber-200 rounded-2xl overflow-hidden mt-8">
                <CardContent className="p-6 flex gap-4 items-start">
                  <ShieldAlert className="text-amber-500 h-8 w-8 shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="font-black uppercase italic text-amber-700 text-sm">Lab Disclaimer</p>
                    <p className="text-amber-800 text-sm font-medium leading-relaxed italic">
                      Condition is final and Newton's Collectables determines the ultimate price if you choose to sell us the cards. Estimates provided here are for guidance only.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="pokedex-screen p-6 space-y-8 shadow-2xl">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] digital-text">MARKET VALUE</div>
                  <div className="text-4xl font-black text-white italic">£{totalValue.toFixed(2)}</div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                        <Coins size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest digital-text">Cash (70%)</p>
                        <p className="text-2xl font-black text-green-400 italic">£{(totalValue * 0.7).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                        <RefreshCw size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest digital-text">Trade (80%)</p>
                        <p className="text-2xl font-black text-blue-400 italic">£{(totalValue * 0.8).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest digital-text">Consign (85%)</p>
                        <p className="text-2xl font-black text-purple-400 italic">£{(totalValue * 0.85).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
