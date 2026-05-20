
"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calculator, 
  Plus, 
  Trash2, 
  Activity,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Search,
  Instagram,
  Mail,
  Phone
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

type Mode = 'find-us' | 'trade-in' | 'pokedex' | 'price-check' | 'card-find';

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('pokedex');
  const [mounted, setMounted] = useState(false);
  const [isStaticActive, setIsStaticActive] = useState(false);
  
  const [tradeCards, setTradeCards] = useState<TradeCard[]>([
    { id: "initial-1", name: "", value: 0 }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setIsStaticActive(true);
      setTimeout(() => setIsStaticActive(false), 2000);
    }, 30000);

    return () => clearInterval(interval);
  }, [mounted]);

  const addTradeCard = () => {
    const newId = `card-${Date.now()}`;
    setTradeCards([...tradeCards, { id: newId, name: "", value: 0 }]);
  };

  const removeTradeCard = (id: string) => {
    if (tradeCards.length > 1) {
      setTradeCards(tradeCards.filter(c => c.id !== id));
    } else {
      setTradeCards([{ id: "initial-1", name: "", value: 0 }]);
    }
  };

  const updateTradeCard = (id: string, field: keyof TradeCard, val: string | number) => {
    setTradeCards(tradeCards.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const totalValue = tradeCards.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  if (!mounted) return null;

  return (
    <main className="container px-4 max-w-6xl mx-auto py-4 md:py-8">
      <div className="pokedex-shell overflow-hidden">
        {/* Pokedex Hardware Header */}
        <div className="bg-[#c0392b] p-6 md:p-8 flex items-center gap-6 border-b-8 border-black/10">
          <div className="pokedex-camera-lens shrink-0" />
          <div className="flex gap-4">
            <div className="h-5 w-5 rounded-full bg-red-600 border-2 border-black/20 shadow-inner animate-light-beam text-red-600" />
            <div className="h-5 w-5 rounded-full bg-yellow-400 border-2 border-black/20 shadow-inner animate-light-beam text-yellow-400 [animation-delay:0.5s]" />
            <div className="h-5 w-5 rounded-full bg-green-500 border-2 border-black/20 shadow-inner animate-light-beam text-green-500 [animation-delay:1s]" />
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
          <div className="lg:col-span-9">
            <div className="pokedex-screen-container group h-full flex flex-col min-h-[600px] relative bg-[#2d3436]">
              {/* Static Glitch Overlay */}
              {isStaticActive && <div className="pokedex-static-glitch z-[100]" />}
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />
              
              <div className="absolute top-4 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-2">
                  <Activity size={12} className={cn("transition-colors", isStaticActive ? "text-yellow-400" : "text-primary")} />
                  <span className="text-[9px] font-black digital-text uppercase tracking-widest text-primary">
                    {isStaticActive ? "SIGNAL: INTERFERENCE" : "SIGNAL: STABLE"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-white/50 digital-text uppercase tracking-widest">STATION 01</span>
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
                {mode === 'pokedex' && (
                  <div className="flex-1 flex flex-col h-full bg-slate-900 relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-10px] font-black text-white uppercase italic tracking-widest">Pokedex Digital Archive</span>
                      <div className="flex gap-4 items-center">
                        <a 
                          href="https://pokedex.org/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[9px] font-bold text-white/70 hover:text-white flex items-center gap-1 uppercase pointer-events-auto"
                        >
                          <ExternalLink size={10} /> Open Standalone
                        </a>
                      </div>
                    </div>
                    <iframe 
                      src="https://pokedex.org/" 
                      className={cn("flex-1 w-full border-none pt-8 transition-opacity duration-300", isStaticActive ? "opacity-40" : "opacity-100")}
                      title="Pokemon Database"
                      allow="fullscreen"
                      loading="lazy"
                    />
                  </div>
                )}

                {mode === 'price-check' && (
                  <div className="flex-1 flex flex-col h-full bg-slate-900 relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Market Value Benchmarking</span>
                      <div className="flex gap-4 items-center">
                        <a 
                          href="https://www.pricecharting.com/category/pokemon-cards" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[9px] font-bold text-white/70 hover:text-white flex items-center gap-1 uppercase pointer-events-auto"
                        >
                          <TrendingUp size={10} /> Full Site
                        </a>
                      </div>
                    </div>
                    <iframe 
                      src="https://www.pricecharting.com/category/pokemon-cards" 
                      className={cn("flex-1 w-full border-none pt-8 transition-opacity duration-300", isStaticActive ? "opacity-40" : "opacity-100")}
                      title="Price Check"
                      allow="fullscreen"
                      loading="lazy"
                    />
                  </div>
                )}

                {mode === 'card-find' && (
                  <div className="flex-1 flex flex-col h-full bg-slate-900 relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Advanced Card Search</span>
                      <div className="flex gap-4 items-center">
                        <a 
                          href="https://pkmncards.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[9px] font-bold text-white/70 hover:text-white flex items-center gap-1 uppercase pointer-events-auto"
                        >
                          <ExternalLink size={10} /> pkmncards.com
                        </a>
                      </div>
                    </div>
                    <iframe 
                      src="https://pkmncards.com/?s=charizard" 
                      className={cn("flex-1 w-full border-none pt-8 transition-opacity duration-300", isStaticActive ? "opacity-40" : "opacity-100")}
                      title="Card Find"
                      allow="fullscreen"
                      loading="lazy"
                    />
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-4 md:p-10 pt-16 flex-1 flex flex-col space-y-8 overflow-y-auto custom-scrollbar">
                    <div className="text-center">
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        Trade-<span className="text-primary">In</span>
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-widest text-sm">
                          <Calculator size={18} />
                          Price Guide
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={addTradeCard}
                          className="bg-primary/10 border-primary border-4 text-primary font-black uppercase italic rounded-xl"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Card
                        </Button>
                      </div>

                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-black uppercase italic text-slate-400">Card Name/Set</label>
                              <Input 
                                placeholder="Base Set Charizard..."
                                value={card.name}
                                onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)}
                                className="bg-black/40 border-2 border-white/10 text-white h-12 rounded-xl italic font-bold"
                              />
                            </div>
                            <div className="w-24 md:w-32 space-y-1">
                              <label className="text-[10px] font-black uppercase italic text-slate-400">Value (£)</label>
                              <Input 
                                type="number"
                                placeholder="0"
                                value={card.value || ''}
                                onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)}
                                className="bg-black/40 border-2 border-white/10 text-white h-12 rounded-xl italic font-bold"
                              />
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeTradeCard(card.id)}
                              className="h-12 w-12 text-slate-500 hover:text-destructive"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 pb-12">
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
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-4 md:p-10 pt-16 flex-1 flex flex-col space-y-10 overflow-y-auto custom-scrollbar">
                    <div className="text-center space-y-4">
                      <Badge className="bg-accent text-accent-foreground font-black italic tracking-widest px-4 py-1 uppercase">Signal: Located</Badge>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        Find <span className="text-primary">Us</span>
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-black/40 border-2 border-white/5 rounded-3xl space-y-4 relative overflow-hidden">
                          <div className="flex items-center gap-3 text-accent digital-text text-xs font-black uppercase tracking-widest">
                            <MapPin size={16} /> Saturdays
                          </div>
                          <p className="text-2xl text-white font-black italic uppercase leading-tight">
                            Outside Timpsons <br /> Market Square <br /> IP33 1BT
                          </p>
                        </div>

                        <div className="p-8 bg-black/40 border-2 border-white/5 rounded-3xl space-y-4 relative overflow-hidden">
                          <div className="flex items-center gap-3 text-accent digital-text text-xs font-black uppercase tracking-widest">
                            <Activity size={16} /> Wednesdays
                          </div>
                          <p className="text-2xl text-white font-black italic uppercase leading-tight">
                            Market Square <br /> Bury St Edmunds <br /> 8:30AM – 4:00PM
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] digital-text mb-6">Contact Channels</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-12">
                          <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-black/40 rounded-3xl border-2 border-white/5 hover:border-primary transition-all group">
                            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                              <Instagram size={20} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase text-white/40 digital-text">Insta</p>
                              <p className="font-bold text-xs text-white italic truncate">@newtons_collectables</p>
                            </div>
                          </a>

                          <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-4 p-5 bg-black/40 rounded-3xl border-2 border-white/5 hover:border-secondary transition-all group">
                            <div className="h-10 w-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                              <Mail size={20} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase text-white/40 digital-text">Email</p>
                              <p className="font-bold text-xs text-white italic truncate">Hello@tradeintcg.com</p>
                            </div>
                          </a>

                          <a href="tel:07340407375" className="flex items-center gap-4 p-5 bg-black/40 rounded-3xl border-2 border-white/5 hover:border-accent transition-all group">
                            <div className="h-10 w-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                              <Phone size={20} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase text-white/40 digital-text">Comms</p>
                              <p className="font-bold text-xs text-white italic truncate">07340407375</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 pb-12 text-center text-white/30 digital-text text-[10px] uppercase tracking-widest italic">
                      Signal End
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between py-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-white/50 uppercase italic tracking-widest text-center">Modules</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setMode('pokedex')}
                    className={cn(
                      "pokedex-button-hardware h-14 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-xs transition-all",
                      mode === 'pokedex' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <BookOpen size={16} /> PokéDex
                  </button>
                  <button 
                    onClick={() => setMode('card-find')}
                    className={cn(
                      "pokedex-button-hardware h-14 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-xs transition-all",
                      mode === 'card-find' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <Search size={16} /> Card Find
                  </button>
                  <button 
                    onClick={() => setMode('price-check')}
                    className={cn(
                      "pokedex-button-hardware h-14 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-xs transition-all",
                      mode === 'price-check' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <TrendingUp size={16} /> Price Check
                  </button>
                  <button 
                    onClick={() => setMode('trade-in')}
                    className={cn(
                      "pokedex-button-hardware h-14 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-xs transition-all",
                      mode === 'trade-in' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <Calculator size={16} /> Trade-In
                  </button>
                  <button 
                    onClick={() => setMode('find-us')}
                    className={cn(
                      "pokedex-button-hardware h-14 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-xs transition-all",
                      mode === 'find-us' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <MapPin size={16} /> Find Us
                  </button>
                </div>
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
