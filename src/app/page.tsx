
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
  ShieldCheck,
  Briefcase,
  Share2
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
import Link from "next/link";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'find-us' | 'pokedex' | 'card-find' | 'price-check' | 'trade-in' | 'loyalty' | 'business-card';

const MODULES = [
  { id: 'find-us', label: 'Find Us', icon: MapPin },
  { id: 'business-card', label: 'Digital Card', icon: Share2 },
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
    <main className="h-svh w-full flex flex-col bg-[#c0392b] overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row h-full relative pokedex-hardware-shine overflow-hidden">
        
        {/* Main Pokedex Panel */}
        <div className="flex-1 flex flex-col relative min-h-0 md:h-full bg-gradient-to-br from-[#e74c3c] via-[#c0392b] to-[#a93226] overflow-hidden">
          
          {/* Header Banner */}
          <div className="p-2 md:p-5 flex items-center justify-between border-b-4 md:border-b-8 border-black/20 shrink-0 relative z-20 shadow-lg bg-[#e74c3c]">
            {/* Far Left: Lens & Lights */}
            <div className="flex items-center gap-2 md:gap-4">
               <div className="pokedex-camera-lens h-10 w-10 md:h-16 md:w-16" />
               <div className="flex gap-1.5 md:gap-2">
                 <div className="h-2 w-2 md:h-4 md:w-4 rounded-full bg-red-600 border-2 border-black/20 animate-light-beam" />
                 <div className="h-2 w-2 md:h-4 md:w-4 rounded-full bg-yellow-400 border-2 border-black/20 animate-pulse delay-150" />
                 <div className="h-2 w-2 md:h-4 md:w-4 rounded-full bg-green-500 border-2 border-black/20 animate-pulse delay-300" />
               </div>
            </div>

            {/* Far Right: Menu */}
            <div className="flex items-center">
              <Select value={mode} onValueChange={(val) => setMode(val as Mode)}>
                <SelectTrigger className="w-auto bg-black/30 border-2 border-white/20 text-white rounded-xl h-10 md:h-14 px-3 md:px-5 hover:bg-black/50 transition-all focus:ring-accent">
                  <Menu className="size-5 md:size-8" />
                </SelectTrigger>
                <SelectContent className="bg-[#2d3436] border-4 border-black/40 text-white rounded-2xl shadow-2xl overflow-hidden min-w-[220px]">
                  {MODULES.map((item) => (
                    <SelectItem key={item.id} value={item.id} className="font-black uppercase italic text-sm md:text-base hover:bg-accent hover:text-accent-foreground py-3 md:py-5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 md:gap-4">
                        <item.icon className="size-5 md:size-7 text-[#e74c3c]" /> {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Digital Screen Area */}
          <div className="flex-1 p-2 md:p-6 flex flex-col min-h-0 overflow-hidden relative">
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
                  <div className="p-6 md:p-12 flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 bg-[#1a1c1d] animate-in zoom-in-95 duration-300">
                    <div className="relative">
                      <div className="absolute -inset-10 bg-accent/20 blur-3xl rounded-full animate-pulse" />
                      <ShieldCheck className="size-24 md:size-48 text-accent relative z-10" />
                    </div>
                    
                    <div className="text-center space-y-6 md:space-y-8 max-w-lg">
                      <h2 className="text-4xl md:text-8xl font-black italic uppercase text-white leading-none">
                        Loyalty <span className="text-accent">Unlocked</span>
                      </h2>
                      <p className="text-xs md:text-xl font-black text-accent/80 uppercase tracking-[0.3em] digital-text">
                        Bury St Edmunds Elite Trainer
                      </p>
                      <div className="pt-6 md:pt-12">
                        <Button 
                          asChild
                          className="w-full bg-accent text-accent-foreground font-black uppercase italic rounded-2xl h-16 md:h-24 text-xl md:text-3xl hover:scale-105 transition-transform"
                        >
                          <a href="https://v0-pokedex-website-lake.vercel.app/" target="_blank">
                            Access Portal <ExternalLink className="ml-4 size-6 md:size-9" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-6 md:p-12 flex-1 overflow-y-auto custom-scrollbar h-full bg-[#1a1c1d]">
                    <div className="text-center mb-10 md:mb-16">
                      <h2 className="text-4xl md:text-9xl font-black italic uppercase text-white leading-none">Trade-<span className="text-[#e74c3c]">In</span></h2>
                      <p className="text-xs md:text-lg font-black text-accent uppercase tracking-widest digital-text">Advanced Value Assessment</p>
                    </div>
                    <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[#e74c3c] font-black uppercase italic tracking-[0.2em] text-xs md:text-xl">Registry Input</span>
                        <Button variant="outline" onClick={addTradeCard} className="bg-[#e74c3c]/10 border-[#e74c3c] border-4 text-[#e74c3c] font-black uppercase italic rounded-2xl h-12 md:h-20 text-sm md:text-2xl px-6">
                          <Plus className="h-5 w-5 md:h-8 md:w-8 mr-2" /> Add Card
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-4 items-center">
                            <Input placeholder="Card Details..." value={card.name} onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)} className="bg-black/40 border-white/20 text-white h-14 md:h-20 rounded-2xl text-lg md:text-3xl font-black flex-1 italic" />
                            <Input type="number" placeholder="£" value={card.value || ''} onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)} className="bg-black/40 border-white/20 text-white h-14 md:h-20 w-24 md:w-48 rounded-2xl text-lg md:text-3xl font-black italic" />
                            <Button variant="ghost" size="icon" onClick={() => removeTradeCard(card.id)} className="text-slate-500 hover:text-red-500 h-14 w-14 md:h-20 md:w-20 shrink-0">
                              <Trash2 size={24} className="md:size-10" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t-8 border-white/5">
                        <div className="p-6 md:p-10 bg-green-500/10 border-4 md:border-8 border-green-500/20 rounded-3xl text-center">
                          <p className="text-[10px] md:text-sm font-black text-green-400 uppercase tracking-[0.3em]">Cash (70%)</p>
                          <p className="text-2xl md:text-6xl font-black text-green-400 italic">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-6 md:p-10 bg-blue-500/10 border-4 md:border-8 border-blue-500/20 rounded-3xl text-center">
                          <p className="text-[10px] md:text-sm font-black text-blue-400 uppercase tracking-[0.3em]">Trade (80%)</p>
                          <p className="text-2xl md:text-6xl font-black text-blue-400 italic">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-6 md:p-10 bg-purple-500/10 border-4 md:border-8 border-purple-500/20 rounded-3xl text-center">
                          <p className="text-[10px] md:text-sm font-black text-purple-400 uppercase tracking-[0.3em]">Consign (85%)</p>
                          <p className="text-2xl md:text-6xl font-black text-purple-400 italic">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'business-card' && (
                  <div className="p-6 md:p-12 flex-1 flex flex-col items-center justify-center bg-[#1a1c1d] overflow-hidden">
                    <div className="w-full max-w-3xl aspect-[1.75/1] bg-white rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative border-[12px] border-[#e74c3c] group animate-in zoom-in-95 duration-500">
                      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e74c3c] clip-path-diagonal" />
                      
                      <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="text-3xl md:text-6xl font-black uppercase italic text-[#1a1a1a] leading-none tracking-tighter">
                              Newton's
                            </h3>
                            <h3 className="text-2xl md:text-5xl font-black uppercase italic text-[#e74c3c] leading-none tracking-tighter">
                              Collectables
                            </h3>
                            <div className="h-2 w-32 bg-accent mt-4" />
                          </div>
                          <img 
                            src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                            alt="Logo" 
                            className="h-16 md:h-32 object-contain"
                          />
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#1a1a1a]">
                              <MapPin size={24} className="text-[#e74c3c]" />
                              <span className="text-xl md:text-2xl font-black uppercase italic">Bury St Edmunds Market</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <Instagram size={24} className="text-[#e74c3c]" />
                              <Mail size={24} className="text-[#e74c3c]" />
                              <Phone size={24} className="text-[#e74c3c]" />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] md:text-sm font-black text-[#e74c3c] uppercase tracking-widest digital-text">EST. 2023</p>
                            <p className="text-lg md:text-2xl font-black text-[#1a1a1a] uppercase italic">Local & Family Run</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                       <Button asChild className="bg-[#e74c3c] text-white font-black uppercase italic h-14 px-8 rounded-xl text-lg hover:scale-105 transition-transform">
                         <Link href="/card" target="_blank">Open High-Res Card <ExternalLink className="ml-2" /></Link>
                       </Button>
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-6 md:p-12 flex-1 overflow-y-auto custom-scrollbar h-full space-y-10 md:space-y-16 bg-[#1a1c1d]">
                    <div className="text-center space-y-6">
                      <div className="flex flex-col items-center">
                        <h2 className="text-5xl md:text-[10rem] font-black italic uppercase text-white drop-shadow-2xl leading-none mb-4 tracking-tighter">Find <span className="text-[#e74c3c]">Us</span></h2>
                        <img 
                          src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                          alt="Newton's Collectables" 
                          className="h-20 md:h-48 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] mb-6 animate-bounce"
                        />
                        <p className="text-xs md:text-2xl font-black text-accent uppercase tracking-[0.5em] digital-text">Bury St Edmunds Market Stall</p>
                      </div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                      <div className="p-8 md:p-16 bg-black/50 border-8 border-white/5 rounded-[3rem] space-y-8 md:space-y-12 text-center shadow-inner">
                        <div className="flex items-center gap-5">
                          <span className="text-accent digital-text text-xs md:text-lg font-black uppercase tracking-[0.8em]">SYSTEM SCHEDULE</span>
                          <div className="h-1 flex-1 bg-accent/20" />
                        </div>
                        <div className="space-y-4 md:space-y-8">
                          <p className="text-[#e74c3c] text-2xl md:text-5xl font-black uppercase tracking-[0.3em] italic">Saturdays & Wednesdays</p>
                          <p className="text-2xl md:text-[5.5rem] text-white font-black italic uppercase leading-none tracking-tighter">Outside Timpsons, Market Square, IP33 1BT</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 md:gap-10">
                        <a href="https://instagram.com/newtons_collectables" target="_blank" className="flex items-center gap-6 p-8 md:p-16 bg-black/50 rounded-[2.5rem] border-8 border-white/5 hover:border-[#e74c3c] transition-all group shadow-2xl">
                          <Instagram size={32} className="text-[#e74c3c] md:size-20" />
                          <span className="text-xl md:text-6xl font-black text-white uppercase italic tracking-widest">Instagram</span>
                        </a>
                        <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-6 p-8 md:p-16 bg-black/50 rounded-[2.5rem] border-8 border-white/5 hover:border-blue-400 transition-all group shadow-2xl">
                          <Mail size={32} className="text-blue-400 md:size-20" />
                          <span className="text-xl md:text-6xl font-black text-white uppercase italic tracking-widest">Email</span>
                        </a>
                        <a href="tel:07340407375" className="flex items-center gap-6 p-8 md:p-16 bg-black/50 rounded-[2.5rem] border-8 border-white/5 hover:border-green-400 transition-all group shadow-2xl">
                          <Phone size={32} className="text-green-400 md:size-20" />
                          <span className="text-xl md:text-6xl font-black text-white uppercase italic tracking-widest">Call Us</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Hardware Panel (Bottom on Mobile) */}
        <div className="w-full md:w-56 lg:w-72 bg-gradient-to-br from-[#c0392b] to-[#8e1d14] p-6 md:p-10 flex flex-col md:justify-between items-center border-t-8 md:border-t-0 md:border-l-8 border-black/20 shrink-0 relative z-30 shadow-2xl overflow-hidden min-h-[160px] md:min-h-0">
          {/* Hardware decoration for Desktop */}
          <div className="hidden md:block w-full space-y-10">
            <div className="grid grid-cols-2 gap-4">
               <div className="h-4 bg-black/30 rounded-full" />
               <div className="h-4 bg-black/30 rounded-full" />
            </div>
            <div className="h-32 w-full bg-black/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 border-2 border-white/5">
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </div>
          </div>

          {/* Central Logo and Secret Button */}
          <div className="flex flex-col items-center justify-center gap-6 md:gap-16 w-full flex-1">
             <div className="flex justify-center w-full">
                <img 
                  src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                  alt="Newton's Collectables" 
                  className="h-16 md:h-32 w-auto object-contain drop-shadow-2xl brightness-150 grayscale opacity-40 hover:opacity-100 transition-opacity duration-700"
                />
             </div>
             
             <div 
               onPointerDown={handleChargeStart}
               onPointerUp={handleChargeEnd}
               onPointerLeave={handleChargeEnd}
               className={cn(
                 "pokedex-button-hardware w-20 h-20 md:w-32 md:h-32 flex items-center justify-center text-white transition-all duration-300 select-none touch-none",
                 isLit ? "bg-accent shadow-[0_0_80px_rgba(255,191,0,1)] scale-110" : "bg-slate-800"
               )}
             >
               <Zap size={40} className={cn(isLit ? "text-accent-foreground animate-pulse" : "text-white", "md:size-20")} />
             </div>
          </div>

          <div className="text-center mt-auto py-4 hidden md:block">
            <p className="text-xs font-black text-white/30 uppercase italic tracking-[0.5em] digital-text">PRO SERIES 3.5X</p>
          </div>
        </div>
      </div>
    </main>
  );
}
