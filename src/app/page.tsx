"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calculator, 
  BookOpen,
  ExternalLink,
  TrendingUp,
  Search,
  Instagram,
  Mail,
  MessageCircle,
  Plus,
  Trash2,
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
    <main className="min-h-screen w-full flex flex-col bg-[#c0392b] overflow-x-hidden">
      <div className="flex-1 flex flex-col md:flex-row min-h-screen relative pokedex-hardware-shine">
        
        {/* Main Pokedex Interface */}
        <div className="flex-1 flex flex-col relative min-h-svh md:h-screen bg-gradient-to-br from-[#e74c3c] via-[#c0392b] to-[#a93226]">
          
          {/* Top Hardware Banner */}
          <div className="p-3 md:p-6 flex items-center gap-3 md:gap-4 border-b-4 md:border-b-8 border-black/20 shrink-0 relative z-20 shadow-lg">
            <div className="pokedex-camera-lens shrink-0 !h-10 !w-10 md:!h-16 md:!w-16 border-2 md:border-6 border-slate-300 shadow-xl" />
            <div className="flex gap-1 md:gap-2">
              <div className="h-3 w-3 md:h-5 md:w-5 rounded-full bg-red-600 border-2 border-black/30 shadow-inner animate-light-beam" />
              <div className="h-3 w-3 md:h-5 md:w-5 rounded-full bg-yellow-400 border-2 border-black/30 shadow-inner animate-light-beam [animation-delay:0.5s]" />
              <div className="h-3 w-3 md:h-5 md:w-5 rounded-full bg-green-500 border-2 border-black/30 shadow-inner animate-light-beam [animation-delay:1s]" />
            </div>
            <div className="ml-auto flex items-center gap-2 md:gap-4">
              <img 
                src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                alt="Newton's Collectables" 
                className="h-8 md:h-14 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Inner Screen Container */}
          <div className="flex-1 p-2 md:p-8 flex flex-col min-h-[450px]">
            <div className="pokedex-screen-container flex-1 w-full bg-[#1a1c1d] flex flex-col relative shadow-2xl overflow-hidden group">
              
              {/* Shine Layer */}
              <div className="pokedex-glass-shine" />
              
              {isStaticActive && <div className="pokedex-static-glitch z-[100]" />}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />

              <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {mode === 'pokedex' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#e74c3c] h-8 md:h-10 z-30 flex items-center px-4 justify-between border-b-2 md:border-b-4 border-black/20 shadow-md">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white animate-pulse" />
                        Archive v2.1
                      </span>
                      <a href="https://pokedex.org/" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[9px] font-bold text-white/80 flex items-center gap-1 uppercase bg-black/20 px-2 py-1 rounded-md hover:bg-black/40 transition-colors">
                        <ExternalLink size={8} className="md:size-10" /> Full Site
                      </a>
                    </div>
                    <iframe src="https://pokedex.org/" className={cn("flex-1 w-full border-none pt-8 md:pt-10 bg-slate-900", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'price-check' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#e74c3c] h-8 md:h-10 z-30 flex items-center px-4 justify-between border-b-2 md:border-b-4 border-black/20 shadow-md">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white animate-pulse" />
                        Market Stats
                      </span>
                      <a href="https://www.pricecharting.com/category/pokemon-cards" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[9px] font-bold text-white/80 flex items-center gap-1 uppercase bg-black/20 px-2 py-1 rounded-md hover:bg-black/40 transition-colors">
                        <TrendingUp size={8} className="md:size-10" /> Full Site
                      </a>
                    </div>
                    <iframe src="https://www.pricecharting.com/category/pokemon-cards" className={cn("flex-1 w-full border-none pt-8 md:pt-10 bg-slate-900", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'card-find' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#e74c3c] h-8 md:h-10 z-30 flex items-center px-4 justify-between border-b-2 md:border-b-4 border-black/20 shadow-md">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white animate-pulse" />
                        Advanced Find
                      </span>
                      <a href="https://pkmncards.com/?s=charizard" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[9px] font-bold text-white/80 flex items-center gap-1 uppercase bg-black/20 px-2 py-1 rounded-md hover:bg-black/40 transition-colors">
                        <ExternalLink size={8} className="md:size-10" /> Full Site
                      </a>
                    </div>
                    <iframe src="https://pkmncards.com/?s=charizard" className={cn("flex-1 w-full border-none pt-8 md:pt-10 bg-slate-900", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-4 md:p-10 pt-12 md:pt-14 flex-1 overflow-y-auto custom-scrollbar h-full bg-[#1a1c1d]">
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-3xl md:text-6xl font-black italic uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Trade-<span className="text-[#e74c3c]">In</span></h2>
                    </div>
                    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#e74c3c] font-black uppercase italic tracking-widest text-[10px] md:text-sm flex items-center gap-2 drop-shadow-sm"><Calculator className="size-4 md:size-5"/> Calculator Console</span>
                        <Button variant="outline" onClick={addTradeCard} className="bg-[#e74c3c]/10 border-[#e74c3c] border-2 md:border-4 text-[#e74c3c] font-black uppercase italic rounded-xl h-10 md:h-12 px-4 md:px-6 shadow-lg hover:bg-[#e74c3c] hover:text-white transition-all text-xs md:text-sm">
                          <Plus className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" /> Add
                        </Button>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-2 md:gap-3 items-end group animate-in slide-in-from-left-4 duration-300">
                            <div className="flex-1">
                              <Input placeholder="Card Name..." value={card.name} onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)} className="bg-black/40 border border-white/10 text-white h-10 md:h-12 rounded-lg italic font-bold focus:border-[#e74c3c] transition-colors text-sm md:text-base" />
                            </div>
                            <div className="w-20 md:w-32">
                              <Input type="number" placeholder="£" value={card.value || ''} onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)} className="bg-black/40 border border-white/10 text-white h-10 md:h-12 rounded-lg italic font-bold focus:border-[#e74c3c] transition-colors text-sm md:text-base" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeTradeCard(card.id)} className="h-10 w-10 md:h-12 md:w-12 text-slate-500 hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="size-4 md:size-5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-white/5">
                        <div className="p-3 md:p-4 bg-green-500/10 border border-green-500/20 rounded-xl md:rounded-2xl shadow-inner group hover:bg-green-500/20 transition-all text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-green-400 uppercase tracking-widest digital-text">Cash (70%)</p>
                          <p className="text-xl md:text-3xl font-black text-green-400">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-3 md:p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl md:rounded-2xl shadow-inner group hover:bg-blue-500/20 transition-all text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest digital-text">Trade (80%)</p>
                          <p className="text-xl md:text-3xl font-black text-blue-400">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-3 md:p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl md:rounded-2xl shadow-inner group hover:bg-purple-500/20 transition-all text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-purple-400 uppercase tracking-widest digital-text">Consign (85%)</p>
                          <p className="text-xl md:text-3xl font-black text-purple-400">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-4 md:p-10 pt-12 md:pt-14 flex-1 overflow-y-auto custom-scrollbar h-full space-y-8 md:space-y-10 bg-[#1a1c1d]">
                    <div className="text-center">
                      <h2 className="text-3xl md:text-6xl font-black italic uppercase text-white drop-shadow-md">Find <span className="text-[#e74c3c]">Us</span></h2>
                    </div>
                    <div className="p-4 md:p-8 bg-black/40 border-2 border-white/5 rounded-2xl md:rounded-3xl space-y-6 md:space-y-10 shadow-inner relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <div className="space-y-6 md:space-y-10 relative z-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-accent digital-text text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Schedule Archive</span>
                            <div className="h-px flex-1 bg-accent/20" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-2">
                              <p className="text-[#e74c3c] digital-text text-[8px] md:text-[10px] font-black uppercase tracking-widest">Saturdays (8:30AM – 4:00PM)</p>
                              <p className="text-lg md:text-2xl text-white font-black italic uppercase leading-tight">Outside Timpsons, Market Square, IP33 1BT</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[#e74c3c] digital-text text-[8px] md:text-[10px] font-black uppercase tracking-widest">Wednesdays (8:30AM – 4:00PM)</p>
                              <p className="text-lg md:text-2xl text-white font-black italic uppercase leading-tight">Market Square, Bury St Edmunds</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pb-4">
                      <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-[#e74c3c] hover:bg-[#e74c3c]/5 transition-all group shadow-lg">
                        <Instagram size={20} className="text-[#e74c3c] md:size-24" />
                        <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest">Instagram</span>
                      </a>
                      <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-blue-400 hover:bg-blue-400/5 transition-all group shadow-lg">
                        <Mail size={20} className="text-blue-400 md:size-24" />
                        <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest">Email</span>
                      </a>
                      <a href="https://wa.me/447340407375" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-green-400 hover:bg-green-400/5 transition-all group shadow-lg">
                        <MessageCircle size={20} className="text-green-400 md:size-24" />
                        <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Hardware Controls */}
        <div className="w-full md:w-80 bg-gradient-to-br from-[#c0392b] to-[#8e1d14] p-4 md:p-10 flex flex-col justify-start md:justify-between border-t-4 md:border-t-0 md:border-l-8 border-black/20 shrink-0 relative z-30 shadow-2xl">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <p className="text-[8px] md:text-[10px] font-black text-white/40 uppercase italic tracking-[0.3em] md:tracking-[0.5em] text-center mb-2 md:mb-4">Module Selector</p>
              <div className="w-full relative">
                <Select value={mode} onValueChange={(val) => setMode(val as Mode)}>
                  <SelectTrigger className="w-full bg-[#1a1c1d] border-2 md:border-4 border-black/20 text-white font-black uppercase italic h-14 md:h-16 rounded-xl md:rounded-2xl shadow-xl focus:ring-accent transition-all hover:scale-[1.01] md:hover:scale-[1.02] text-xs md:text-base">
                    <SelectValue placeholder="Select Module" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2d3436] border-2 md:border-4 border-black/40 text-white rounded-xl shadow-2xl overflow-hidden">
                    {MODULES.map((item) => (
                      <SelectItem key={item.id} value={item.id} className="font-black uppercase italic text-xs md:text-sm hover:bg-accent hover:text-accent-foreground py-3 md:py-4 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                          <item.icon className="size-4 md:size-5 text-[#e74c3c]" /> {item.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Visual Glow */}
                <div className="absolute -inset-1 bg-accent/20 blur-xl rounded-2xl -z-10 animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3 pt-4 md:pt-6">
               <div className="h-3 md:h-4 bg-black/20 rounded-full" />
               <div className="h-3 md:h-4 bg-black/20 rounded-full" />
               <div className="h-3 md:h-4 bg-black/20 rounded-full w-2/3" />
               <div className="h-3 md:h-4 bg-black/20 rounded-full w-1/2" />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center gap-8 mt-12">
            <div className="flex gap-6">
              <div className="h-16 w-16 bg-[#2d3436] rounded-full pokedex-button-hardware border-6 border-black/30 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="h-16 w-16 bg-[#2d3436] rounded-full pokedex-button-hardware border-6 border-black/30 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-[10px] font-black text-white/30 uppercase italic tracking-widest digital-text">Archival Handheld</p>
              <p className="text-[8px] font-black text-accent/20 uppercase tracking-[0.8em] digital-text">PRO SERIES 3.0</p>
            </div>
          </div>

          {/* Mobile Specific Bottom Hardware Detail */}
          <div className="md:hidden flex flex-col items-center pt-4">
             <div className="h-1 w-24 bg-black/20 rounded-full mb-2" />
             <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] digital-text">PRO SERIES 3.0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
