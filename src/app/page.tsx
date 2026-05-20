
"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Clock, 
  Mail, 
  Instagram, 
  Phone, 
  Calculator, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Activity,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'find-us' | 'trade-in';

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('trade-in');
  const [mounted, setMounted] = useState(false);
  
  // Trade-In State
  const [cards, setCards] = useState<TradeCard[]>([
    { id: "initial-1", name: "", value: 0 }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addCard = () => {
    const newId = `card-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setCards([...cards, { id: newId, name: "", value: 0 }]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(c => c.id !== id));
    } else {
      setCards([{ id: "initial-1", name: "", value: 0 }]);
    }
  };

  const updateCard = (id: string, field: keyof TradeCard, val: string | number) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const totalValue = cards.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  if (!mounted) return null;

  return (
    <main className="container px-4 max-w-6xl mx-auto py-4 md:py-8">
      <div className="pokedex-shell overflow-hidden">
        {/* Hardware Top Bar */}
        <div className="bg-[#c0392b] p-6 md:p-8 flex items-center gap-6 border-b-8 border-black/10">
          <div className="pokedex-camera-lens shrink-0" />
          <div className="flex gap-4">
            <div className="h-4 w-4 rounded-full bg-red-600 border-2 border-black/20 shadow-inner animate-pulse" />
            <div className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-black/20 shadow-inner" />
            <div className="h-4 w-4 rounded-full bg-green-500 border-2 border-black/20 shadow-inner" />
          </div>
          <div className="ml-auto hidden sm:block">
            <img 
              src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
              alt="Newton's Collectables" 
              className="h-12 md:h-16 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="p-4 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Display Area */}
          <div className="lg:col-span-9">
            <div className="pokedex-screen-container group h-full flex flex-col min-h-[600px] relative">
              {/* Scanline Animation */}
              <div className="scanner-line" />
              
              {/* Screen Overlays */}
              <div className="pokedex-screen-overlay" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />
              
              {/* Digital Status Header */}
              <div className="absolute top-4 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-primary" />
                  <span className="text-[9px] font-black digital-text uppercase tracking-widest text-primary">
                    Signal: LINKED
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                  <span className="text-[9px] font-black text-white/50 digital-text uppercase tracking-widest">ARCHIVE v2.5.0</span>
                </div>
              </div>

              {/* Internal Screen Content */}
              <div className="relative z-10 p-4 md:p-10 pt-16 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {mode === 'find-us' && (
                  <div className="flex-1 space-y-10 animate-in fade-in duration-500">
                    <div className="text-center space-y-4">
                      <Badge className="bg-accent text-accent-foreground font-black italic tracking-widest px-4 py-1">GPS LINK: ACTIVE</Badge>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        Where to <span className="text-primary">Find Us</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 bg-black/40 border-2 border-white/5 rounded-3xl space-y-4 relative group overflow-hidden">
                        <div className="flex items-center gap-3 text-accent digital-text text-xs font-black uppercase tracking-widest">
                          <MapPin size={16} />
                          Saturdays
                        </div>
                        <p className="text-2xl text-white font-black italic uppercase leading-tight">
                          Outside Timpsons <br /> Market Square <br /> IP33 1BT
                        </p>
                      </div>

                      <div className="p-8 bg-black/40 border-2 border-white/5 rounded-3xl space-y-4 relative group overflow-hidden">
                        <div className="flex items-center gap-3 text-accent digital-text text-xs font-black uppercase tracking-widest">
                          <Clock size={16} />
                          Wednesdays
                        </div>
                        <p className="text-2xl text-white font-black italic uppercase leading-tight">
                          Market Square <br /> Bury St Edmunds <br /> 8:30AM – 4:00PM
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <h3 className="text-xl font-black uppercase italic text-primary mb-6 flex items-center gap-2">
                        <Activity size={20} />
                        Social Transmission
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a href="https://instagram.com/newtons_collectables" target="_blank" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/20 transition-all">
                          <Instagram size={20} className="text-primary" />
                          <span className="text-xs font-bold uppercase italic digital-text">@newtons_collectables</span>
                        </a>
                        <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-secondary/20 transition-all">
                          <Mail size={20} className="text-secondary" />
                          <span className="text-xs font-bold uppercase italic digital-text">Hello@tradeintcg.com</span>
                        </a>
                        <a href="tel:07340407375" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-accent/20 transition-all">
                          <Phone size={20} className="text-accent" />
                          <span className="text-xs font-bold uppercase italic digital-text">07340407375</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="flex-1 space-y-8">
                    <div className="text-center space-y-2">
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        Trade-In <span className="text-primary">Calculator</span>
                      </h2>
                      <p className="text-accent digital-text text-xs uppercase italic tracking-[0.2em]">trade in price guide</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-widest text-sm">
                          <Calculator size={18} />
                          Data Entry
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={addCard}
                          className="bg-primary/10 border-primary border-4 text-primary font-black uppercase italic rounded-xl hover:bg-primary hover:text-white"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Card
                        </Button>
                      </div>

                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {cards.map((card) => (
                          <div key={card.id} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black uppercase italic text-slate-400">Card Name/Set</label>
                              <Input 
                                placeholder="Base Set Charizard..."
                                value={card.name}
                                onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                                className="bg-black/40 border-2 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl italic font-bold"
                              />
                            </div>
                            <div className="w-24 md:w-32 space-y-1">
                              <label className="text-[10px] font-black uppercase italic text-slate-400">Value (£)</label>
                              <Input 
                                type="number"
                                placeholder="0"
                                value={card.value || ''}
                                onChange={(e) => updateCard(card.id, 'value', e.target.value)}
                                className="bg-black/40 border-2 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl italic font-bold"
                              />
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeCard(card.id)}
                              className="h-12 w-12 text-slate-500 hover:text-destructive transition-colors"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                          <p className="text-[10px] font-black text-green-400 uppercase tracking-widest digital-text">Cash (70%)</p>
                          <p className="text-2xl font-black text-green-400 italic">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest digital-text">Trade (80%)</p>
                          <p className="text-2xl font-black text-blue-400 italic">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest digital-text">Consign (85%)</p>
                          <p className="text-2xl font-black text-purple-400 italic">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3 items-start">
                        <ShieldAlert className="text-amber-500 h-5 w-5 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-200 font-medium italic">
                          Please use the table as an example, prices can be discussed with us via email, WhatsApp or by text
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Hardware Controls */}
          <div className="lg:col-span-3 flex flex-col justify-between py-6">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-white/50 uppercase italic tracking-widest text-center">Modules</p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setMode('trade-in')}
                    className={cn(
                      "pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all",
                      mode === 'trade-in' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <Calculator size={18} />
                    Calculator
                  </button>
                  <button 
                    onClick={() => setMode('find-us')}
                    className={cn(
                      "pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all",
                      mode === 'find-us' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <MapPin size={18} />
                    GPS Map
                  </button>
                </div>
              </div>

              {/* D-Pad Simulation */}
              <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <div className="absolute w-24 h-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="absolute h-24 w-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="h-6 w-6 rounded-full bg-slate-900 z-10" />
                <button 
                  onClick={() => setMode(mode === 'trade-in' ? 'find-us' : 'trade-in')}
                  className="absolute top-0 w-8 h-8 rounded-t-md hover:bg-slate-700 transition-colors flex items-center justify-center"
                >
                  <ChevronUp size={14} className="text-white/20" />
                </button>
                <button 
                  onClick={() => setMode(mode === 'trade-in' ? 'find-us' : 'trade-in')}
                  className="absolute bottom-0 w-8 h-8 rounded-b-md hover:bg-slate-700 transition-colors flex items-center justify-center"
                >
                   <ChevronDown size={14} className="text-white/20" />
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-10">
              <div className="flex justify-center gap-3">
                <div className="h-10 w-10 bg-slate-800 rounded-full pokedex-button-hardware border-4 border-black/20" />
                <div className="h-10 w-10 bg-slate-800 rounded-full pokedex-button-hardware border-4 border-black/20" />
              </div>
              <p className="text-[9px] font-black text-white/30 uppercase text-center italic tracking-widest">© 2024 Newton's Collectables</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
