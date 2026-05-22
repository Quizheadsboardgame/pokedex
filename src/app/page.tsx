
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Calculator, 
  BookOpen,
  TrendingUp,
  Search,
  Instagram,
  Mail,
  Phone,
  Plus,
  Trash2,
  Menu,
  Zap,
  ExternalLink,
  ShieldCheck
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

type Mode = 'find-us' | 'pokedex' | 'card-find' | 'price-check' | 'trade-in' | 'loyalty';

const MODULES = [
  { id: 'find-us', label: 'Find Us', icon: MapPin },
  { id: 'pokedex', label: 'PokéDex', icon: BookOpen },
  { id: 'card-find', label: 'Card Find', icon: Search },
  { id: 'price-check', label: 'Price Check', icon: TrendingUp },
  { id: 'trade-in', label: 'Trade-In', icon: Calculator },
];

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('find-us');
  const [mounted, setMounted] = useState(false);
  const [isStaticActive, setIsStaticActive] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const chargeTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleChargeStart = () => {
    chargeTimerRef.current = setTimeout(() => {
      setIsLit(true);
      setMode('loyalty');
    }, 5000);
  };

  const handleChargeEnd = () => {
    if (chargeTimerRef.current) {
      clearTimeout(chargeTimerRef.current);
    }
    setIsLit(false);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-svh w-full flex flex-col bg-[#c0392b] overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row h-full relative pokedex-hardware-shine overflow-hidden">
        
        {/* Main Pokedex Panel */}
        <div className="flex-1 flex flex-col relative min-h-0 md:h-full bg-gradient-to-br from-[#e74c3c] via-[#c0392b] to-[#a93226] overflow-hidden">
          
          {/* Header Banner - High Tech Handheld Style */}
          <div className="p-3 md:p-5 flex items-center justify-between border-b-4 md:border-b-8 border-black/20 shrink-0 relative z-20 shadow-lg bg-[#e74c3c]">
            {/* Far Left: Lens & Lights */}
            <div className="flex items-center gap-2 md:gap-4">
               <div className="pokedex-camera-lens h-10 w-10 md:h-14 md:w-14" />
               <div className="flex gap-1 md:gap-2">
                 <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-600 border border-black/20 animate-light-beam" />
                 <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-yellow-400 border border-black/20 animate-pulse delay-150" />
                 <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500 border border-black/20 animate-pulse delay-300" />
               </div>
            </div>

            {/* Center: Empty (Logo removed from here) */}
            <div className="flex-1" />

            {/* Far Right: Menu */}
            <div className="flex items-center">
              <Select value={mode} onValueChange={(val) => setMode(val as Mode)}>
                <SelectTrigger className="w-auto bg-black/20 border-2 border-white/20 text-white rounded-lg md:rounded-xl h-9 md:h-12 px-2 md:px-4 hover:bg-black/40 transition-all focus:ring-accent">
                  <Menu className="size-4 md:size-6" />
                </SelectTrigger>
                <SelectContent className="bg-[#2d3436] border-2 md:border-4 border-black/40 text-white rounded-xl shadow-2xl overflow-hidden min-w-[180px]">
                  {MODULES.map((item) => (
                    <SelectItem key={item.id} value={item.id} className="font-black uppercase italic text-xs md:text-sm hover:bg-accent hover:text-accent-foreground py-2 md:py-4 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 md:gap-3">
                        <item.icon className="size-3 md:size-4 text-[#e74c3c]" /> {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Digital Screen Area */}
          <div className="flex-1 p-2 md:p-4 lg:p-6 flex flex-col min-h-0 overflow-hidden relative">
            <div className={cn(
              "pokedex-screen-container flex-1 w-full bg-[#1a1c1d] flex flex-col relative shadow-2xl overflow-hidden transition-all duration-500",
              isLit && "ring-8 ring-accent/50"
            )}>
              <div className="pokedex-glass-shine" />
              {isStaticActive && <div className="pokedex-static-glitch z-[100]" />}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />

              <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {mode === 'pokedex' && (
                  <iframe src="https://pokedex.org/" className="flex-1 w-full h-full border-none" />
                )}

                {mode === 'price-check' && (
                  <iframe src="https://www.pricecharting.com/category/pokemon-cards" className="flex-1 w-full h-full border-none" />
                )}

                {mode === 'card-find' && (
                  <iframe src="https://pkmncards.com/?s=charizard" className="flex-1 w-full h-full border-none" />
                )}

                {mode === 'loyalty' && (
                  <div className="p-4 md:p-10 flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 bg-[#1a1c1d] animate-in zoom-in-95 duration-300">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-accent/20 blur-xl rounded-full animate-pulse" />
                      <ShieldCheck className="size-16 md:size-32 text-accent relative z-10" />
                    </div>
                    
                    <div className="text-center space-y-3 md:space-y-4 max-w-md">
                      <h2 className="text-2xl md:text-5xl font-black italic uppercase text-white leading-none">
                        Loyalty <span className="text-accent">Unlocked</span>
                      </h2>
                      <p className="text-[10px] md:text-sm font-bold text-accent/70 uppercase tracking-widest digital-text">
                        Bury St Edmunds Elite Trainer Program
                      </p>
                      <div className="pt-4 md:pt-6">
                        <Button 
                          asChild
                          className="w-full bg-accent text-accent-foreground font-black uppercase italic rounded-xl md:rounded-2xl h-14 md:h-16 text-md md:text-lg hover:scale-105 transition-transform"
                        >
                          <a href="https://v0-pokedex-website-lake.vercel.app/" target="_blank">
                            Access Portal <ExternalLink className="ml-2 size-4 md:size-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="w-full flex justify-between items-center opacity-30 pt-6">
                      <div className="h-px flex-1 bg-white/20" />
                      <span className="mx-4 text-[8px] font-mono text-white tracking-[0.5em]">AUTH: GRANTED</span>
                      <div className="h-px flex-1 bg-white/20" />
                    </div>
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-4 md:p-10 flex-1 overflow-y-auto custom-scrollbar h-full bg-[#1a1c1d]">
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-6xl font-black italic uppercase text-white">Trade-<span className="text-[#e74c3c]">In</span></h2>
                      <p className="text-[10px] font-bold text-accent uppercase tracking-widest digital-text">Value Assessment Module</p>
                    </div>
                    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[#e74c3c] font-black uppercase italic tracking-widest text-[10px]">Registry Input</span>
                        <Button variant="outline" onClick={addTradeCard} className="bg-[#e74c3c]/10 border-[#e74c3c] border-2 md:border-4 text-[#e74c3c] font-black uppercase italic rounded-xl h-8 md:h-10 text-xs">
                          <Plus className="h-3 w-3 md:h-4 md:w-4 mr-2" /> Add Card
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-2 md:gap-3 items-center">
                            <Input placeholder="Card Details..." value={card.name} onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)} className="bg-black/40 border-white/10 text-white h-10 md:h-12 rounded-lg md:rounded-xl text-xs" />
                            <Input type="number" placeholder="£" value={card.value || ''} onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)} className="bg-black/40 border-white/10 text-white h-10 md:h-12 w-16 md:w-32 rounded-lg md:rounded-xl text-xs" />
                            <Button variant="ghost" size="icon" onClick={() => removeTradeCard(card.id)} className="text-slate-500 hover:text-red-500 h-10 w-10 shrink-0">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/5">
                        <div className="p-3 bg-green-500/10 border-2 border-green-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-green-400 uppercase tracking-widest">Cash (70%)</p>
                          <p className="text-lg md:text-2xl font-black text-green-400">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border-2 border-blue-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Trade (80%)</p>
                          <p className="text-lg md:text-2xl font-black text-blue-400">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border-2 border-purple-500/20 rounded-xl">
                          <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Consign (85%)</p>
                          <p className="text-lg md:text-2xl font-black text-purple-400">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-4 md:p-10 flex-1 overflow-y-auto custom-scrollbar h-full space-y-6 md:space-y-8 bg-[#1a1c1d]">
                    <div className="text-center space-y-4">
                      <div className="flex flex-col items-center">
                        <h2 className="text-3xl md:text-7xl font-black italic uppercase text-white drop-shadow-md leading-none mb-2">Find <span className="text-[#e74c3c]">Us</span></h2>
                        <img 
                          src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                          alt="Newton's Collectables" 
                          className="h-10 md:h-16 object-contain drop-shadow-xl mb-2"
                        />
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest digital-text">Bury St Edmunds Market</p>
                      </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                      <div className="p-4 md:p-6 bg-black/40 border-2 md:border-4 border-white/5 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6 text-center">
                        <div className="flex items-center gap-2">
                          <span className="text-accent digital-text text-[8px] md:text-xs font-black uppercase tracking-[0.4em]">Schedule</span>
                          <div className="h-px flex-1 bg-accent/20" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[#e74c3c] text-[8px] md:text-[10px] font-black uppercase tracking-widest">Saturdays & Wednesdays</p>
                          <p className="text-md md:text-3xl text-white font-black italic uppercase leading-tight">Outside Timpsons, Market Square, IP33 1BT</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                        <a href="https://instagram.com/newtons_collectables" target="_blank" className="flex items-center gap-3 p-3 md:p-4 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-[#e74c3c] transition-all group">
                          <Instagram size={18} className="text-[#e74c3c]" />
                          <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic">Instagram</span>
                        </a>
                        <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-3 p-3 md:p-4 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-blue-400 transition-all group">
                          <Mail size={18} className="text-blue-400" />
                          <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic">Email</span>
                        </a>
                        <a href="tel:07340407375" className="flex items-center gap-3 p-3 md:p-4 bg-black/40 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-green-400 transition-all group">
                          <Phone size={18} className="text-green-400" />
                          <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic">Call Us</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Hardware Panel (Footer on Mobile) */}
        <div className="w-full md:w-48 lg:w-56 bg-gradient-to-br from-[#c0392b] to-[#8e1d14] p-4 flex flex-col md:justify-between items-center border-t-4 md:border-t-0 md:border-l-8 border-black/20 shrink-0 relative z-30 shadow-2xl overflow-hidden min-h-[140px] md:min-h-0">
          {/* Hardware decoration for Desktop */}
          <div className="hidden md:block w-full space-y-4">
            <div className="grid grid-cols-2 gap-2">
               <div className="h-2 bg-black/20 rounded-full" />
               <div className="h-2 bg-black/20 rounded-full" />
            </div>
            <div className="h-20 w-full bg-black/10 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/5">
              <div className="h-1 w-2/3 bg-white/10 rounded-full" />
              <div className="h-1 w-2/3 bg-white/10 rounded-full" />
              <div className="h-1 w-2/3 bg-white/10 rounded-full" />
            </div>
          </div>

          {/* Central Logo and Secret Button */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full">
             <div className="flex justify-center w-full">
                <img 
                  src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                  alt="Newton's Collectables" 
                  className="h-10 md:h-14 w-auto object-contain drop-shadow-2xl grayscale brightness-150 opacity-40"
                />
             </div>
             
             <div 
               onPointerDown={handleChargeStart}
               onPointerUp={handleChargeEnd}
               onPointerLeave={handleChargeEnd}
               className={cn(
                 "pokedex-button-hardware w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-white transition-all duration-300 select-none touch-none",
                 isLit ? "bg-accent shadow-[0_0_40px_rgba(255,191,0,1)] scale-110" : "bg-slate-800"
               )}
             >
               <Zap size={24} className={cn(isLit ? "text-accent-foreground animate-pulse" : "text-white")} />
             </div>
          </div>

          <div className="text-center mt-auto py-2">
            <p className="text-[8px] font-black text-white/30 uppercase italic tracking-widest digital-text">PRO SERIES 3.5</p>
          </div>
        </div>
      </div>
    </main>
  );
}
