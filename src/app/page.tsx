
"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calculator, 
  Plus, 
  Trash2, 
  BookOpen,
  ExternalLink,
  TrendingUp,
  Search,
  Instagram,
  Mail,
  Phone,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'pokedex' | 'price-check' | 'card-find' | 'trade-in' | 'find-us';

const MODULES = [
  { id: 'pokedex', label: 'PokéDex', icon: BookOpen },
  { id: 'card-find', label: 'Card Find', icon: Search },
  { id: 'price-check', label: 'Price Check', icon: TrendingUp },
  { id: 'trade-in', label: 'Trade-In', icon: Calculator },
  { id: 'find-us', label: 'Find Us', icon: MapPin },
];

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
    <main className="min-h-screen w-full flex flex-col bg-[#c0392b]">
      <div className="flex-1 flex flex-col md:flex-row min-h-screen">
        
        {/* Main Pokedex Interface */}
        <div className="flex-1 flex flex-col relative min-h-[500px] md:h-screen">
          
          {/* Top Hardware Banner */}
          <div className="bg-[#c0392b] p-4 md:p-6 flex items-center gap-4 border-b-8 border-black/10 shrink-0">
            <div className="pokedex-camera-lens shrink-0 !h-12 !w-12 md:!h-16 md:!w-16" />
            <div className="flex gap-2">
              <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-red-600 border-2 border-black/20 shadow-inner animate-light-beam" />
              <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-yellow-400 border-2 border-black/20 shadow-inner animate-light-beam [animation-delay:0.5s]" />
              <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-green-500 border-2 border-black/20 shadow-inner animate-light-beam [animation-delay:1s]" />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <img 
                src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                alt="Newton's Collectables" 
                className="h-8 md:h-12 object-contain"
              />
            </div>
          </div>

          {/* Inner Screen Container */}
          <div className="flex-1 p-2 md:p-6 bg-[#c0392b] min-h-[400px]">
            <div className="pokedex-screen-container h-full w-full bg-[#2d3436] flex flex-col relative">
              
              {isStaticActive && <div className="pokedex-static-glitch z-[100]" />}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />

              <div className="flex-1 flex flex-col relative z-10 overflow-hidden h-full">
                {mode === 'pokedex' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Digital Archive</span>
                      <a href="https://pokedex.org/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-white/70 flex items-center gap-1 uppercase">
                        <ExternalLink size={10} /> Full Site
                      </a>
                    </div>
                    <iframe src="https://pokedex.org/" className={cn("flex-1 w-full border-none pt-8 min-h-[300px]", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'price-check' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Market Benchmarking</span>
                      <a href="https://www.pricecharting.com/category/pokemon-cards" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-white/70 flex items-center gap-1 uppercase">
                        <TrendingUp size={10} /> Full Site
                      </a>
                    </div>
                    <iframe src="https://www.pricecharting.com/category/pokemon-cards" className={cn("flex-1 w-full border-none pt-8 min-h-[300px]", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'card-find' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-primary h-8 z-30 flex items-center px-4 justify-between border-b-4 border-black/10">
                      <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Advanced Card Search</span>
                      <a href="https://pkmncards.com/?s=charizard" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-white/70 flex items-center gap-1 uppercase">
                        <ExternalLink size={10} /> Full Site
                      </a>
                    </div>
                    <iframe src="https://pkmncards.com/?s=charizard" className={cn("flex-1 w-full border-none pt-8 min-h-[300px]", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-4 md:p-8 pt-12 flex-1 overflow-y-auto custom-scrollbar h-full">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white">Trade-<span className="text-primary">In</span></h2>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-black uppercase italic tracking-widest text-sm flex items-center gap-2"><Calculator size={16}/> Price Guide</span>
                        <Button variant="outline" onClick={addTradeCard} className="bg-primary/10 border-primary border-4 text-primary font-black uppercase italic rounded-xl h-10 px-4">
                          <Plus className="h-4 w-4 mr-2" /> Add Card
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-2 items-end">
                            <div className="flex-1">
                              <Input placeholder="Card Name..." value={card.name} onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)} className="bg-black/40 border-2 border-white/10 text-white h-10 rounded-lg italic" />
                            </div>
                            <div className="w-20 md:w-28">
                              <Input type="number" placeholder="Value" value={card.value || ''} onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)} className="bg-black/40 border-2 border-white/10 text-white h-10 rounded-lg italic" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeTradeCard(card.id)} className="h-10 w-10 text-slate-500 hover:text-destructive">
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-green-400 uppercase tracking-widest digital-text">Cash (70%)</p>
                          <p className="text-xl font-black text-green-400">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest digital-text">Trade (80%)</p>
                          <p className="text-xl font-black text-blue-400">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest digital-text">Consign (85%)</p>
                          <p className="text-xl font-black text-purple-400">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-4 md:p-8 pt-12 flex-1 overflow-y-auto custom-scrollbar h-full space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white">Find <span className="text-primary">Us</span></h2>
                    </div>
                    <div className="p-6 bg-black/40 border-2 border-white/5 rounded-2xl space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-accent digital-text text-[10px] font-black uppercase tracking-widest">Saturdays</span>
                          <div className="h-px flex-1 bg-accent/20" />
                        </div>
                        <p className="text-xl text-white font-black italic uppercase leading-tight">Outside Timpsons, Market Square, IP33 1BT</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-accent digital-text text-[10px] font-black uppercase tracking-widest">Wednesdays</span>
                          <div className="h-px flex-1 bg-accent/20" />
                        </div>
                        <p className="text-xl text-white font-black italic uppercase leading-tight">Market Square, 8:30AM – 4:00PM</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border-2 border-white/5 hover:border-primary transition-all">
                        <Instagram size={16} className="text-primary" />
                        <span className="text-[9px] font-bold text-white uppercase italic truncate">Instagram</span>
                      </a>
                      <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border-2 border-white/5 hover:border-secondary transition-all">
                        <Mail size={16} className="text-secondary" />
                        <span className="text-[9px] font-bold text-white uppercase italic truncate">Email</span>
                      </a>
                      <a href="tel:07340407375" className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border-2 border-white/5 hover:border-accent transition-all">
                        <Phone size={16} className="text-accent" />
                        <span className="text-[9px] font-bold text-white uppercase italic truncate">Call Us</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Hardware Controls */}
        <div className="w-full md:w-64 bg-[#c0392b] p-4 md:p-8 flex flex-col justify-start md:justify-between border-t-8 md:border-t-0 md:border-l-8 border-black/10 shrink-0">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-white/50 uppercase italic tracking-widest text-center mb-4">Select Module</p>
            
            {/* Unified Selection Dropdown */}
            <div className="w-full">
              <Select value={mode} onValueChange={(val) => setMode(val as Mode)}>
                <SelectTrigger className="w-full bg-slate-700 border-4 border-black/20 text-white font-black uppercase italic h-12 rounded-xl">
                  <SelectValue placeholder="Module" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-4 border-black/20 text-white">
                  {MODULES.map((item) => (
                    <SelectItem key={item.id} value={item.id} className="font-black uppercase italic text-xs hover:bg-accent hover:text-accent-foreground">
                      <div className="flex items-center gap-2">
                        <item.icon size={12} /> {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center gap-4 mt-8">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-slate-800 rounded-full pokedex-button-hardware border-4 border-black/20" />
              <div className="h-10 w-10 bg-slate-800 rounded-full pokedex-button-hardware border-4 border-black/20" />
            </div>
            <p className="text-[8px] font-black text-white/30 uppercase italic tracking-widest">Archive v2.1</p>
          </div>
        </div>
      </div>
    </main>
  );
}
