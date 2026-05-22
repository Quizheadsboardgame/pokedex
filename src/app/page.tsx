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
  Menu,
  Zap,
  Loader2,
  Shield,
  BarChart3,
  Info,
  Activity
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
import { getPokemonInfo, type PokemonInfoOutput } from "@/ai/flows/pokemon-info-flow";
import { generatePokemonImage } from "@/ai/flows/pokemon-image-flow";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'find-us' | 'pokedex' | 'card-find' | 'price-check' | 'trade-in' | 'card-intel' | 'poketrace';

const MODULES = [
  { id: 'find-us', label: 'Find Us', icon: MapPin },
  { id: 'poketrace', label: 'PokeTrace', icon: Activity },
  { id: 'card-intel', label: 'Card Intel', icon: BarChart3 },
  { id: 'pokedex', label: 'PokéDex', icon: BookOpen },
  { id: 'card-find', label: 'Card Find', icon: Search },
  { id: 'price-check', label: 'Price Check', icon: TrendingUp },
  { id: 'trade-in', label: 'Trade-In', icon: Calculator },
];

const chartConfig = {
  price: {
    label: "Market Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const TRACE_API_KEY = "pc_5a87a643933ff6e3c6a5769e05ea8059d440566b48442c11";

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('find-us');
  const [mounted, setMounted] = useState(false);
  const [isStaticActive, setIsStaticActive] = useState(false);
  const { toast } = useToast();
  
  // Card Intel State
  const [searchQuery, setSearchQuery] = useState("");
  const [intelData, setIntelData] = useState<PokemonInfoOutput | null>(null);
  const [intelImage, setIntelImage] = useState<string | null>(null);
  const [intelLoading, setIntelLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

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

  const handleIntelSearch = async () => {
    if (!searchQuery.trim()) return;
    setIntelLoading(true);
    setIntelData(null);
    setIntelImage(null);

    try {
      const info = await getPokemonInfo({ pokemonName: searchQuery });
      setIntelData(info);

      const basePrice = Math.floor(Math.random() * 500) + 50;
      const trend = Array.from({ length: 12 }, (_, i) => ({
        month: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i],
        price: basePrice + (Math.random() * basePrice * 0.4) - (basePrice * 0.2)
      }));
      setChartData(trend);

      const img = await generatePokemonImage({ prompt: info.imagePrompt });
      setIntelImage(img.url);
    } catch (error: any) {
      console.error("Intel retrieval failed:", error);
      toast({
        variant: "destructive",
        title: "Scanner Error",
        description: error.message.includes("API key") 
          ? "AI API Key is invalid or missing. Please check your configuration."
          : "Could not retrieve card intelligence data.",
      });
    } finally {
      setIntelLoading(false);
    }
  };

  const totalValue = tradeCards.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  if (!mounted) return null;

  return (
    <main className="min-h-svh w-full flex flex-col bg-[#c0392b] overflow-x-hidden">
      <div className="flex-1 flex flex-col md:flex-row min-h-svh relative pokedex-hardware-shine">
        
        <div className="flex-1 flex flex-col relative min-h-[500px] md:h-screen bg-gradient-to-br from-[#e74c3c] via-[#c0392b] to-[#a93226]">
          
          <div className="p-3 md:p-6 flex items-center justify-between border-b-4 md:border-b-8 border-black/20 shrink-0 relative z-20 shadow-lg bg-[#e74c3c]">
            <div className="flex items-center gap-3 md:gap-5 flex-1">
              <div className="pokedex-camera-lens shrink-0 !h-10 !w-10 md:!h-16 md:!w-16 border-2 md:border-6 border-slate-300 shadow-xl" />
              <div className="flex gap-2">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-red-600 border border-black/30 shadow-inner animate-light-beam" />
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-yellow-400 border border-black/30 shadow-inner animate-light-beam [animation-delay:0.5s]" />
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-green-500 border border-black/30 shadow-inner animate-light-beam [animation-delay:1s]" />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end">
              <Select value={mode} onValueChange={(val) => setMode(val as Mode)}>
                <SelectTrigger className="w-auto bg-black/20 border-2 border-white/20 text-white rounded-lg md:rounded-xl h-10 md:h-14 px-3 md:px-4 hover:bg-black/40 transition-all focus:ring-accent">
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-black uppercase italic tracking-widest text-xs md:text-sm">System Menu</span>
                    <Menu className="size-5 md:size-8" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#2d3436] border-2 md:border-4 border-black/40 text-white rounded-xl shadow-2xl overflow-hidden min-w-[200px]">
                  {MODULES.map((item) => (
                    <SelectItem key={item.id} value={item.id} className="font-black uppercase italic text-xs md:text-sm hover:bg-accent hover:text-accent-foreground py-3 md:py-4 transition-colors">
                      <div className="flex items-center gap-2 md:gap-3">
                        <item.icon className="size-4 text-[#e74c3c]" /> {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 p-2 md:p-4 lg:p-6 flex flex-col min-h-0">
            <div className="pokedex-screen-container flex-1 w-full bg-[#1a1c1d] flex flex-col relative shadow-2xl overflow-hidden group">
              <div className="pokedex-glass-shine" />
              {isStaticActive && <div className="pokedex-static-glitch z-[100]" />}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />

              <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                
                {mode === 'poketrace' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#e74c3c] h-8 md:h-10 z-30 flex items-center px-4 justify-between border-b-2 md:border-b-4 border-black/20 shadow-md">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <Activity size={12} className="text-white animate-pulse" />
                        PokeTrace [SECURE ID: pc_5a87...2c11]
                      </span>
                      <a href="https://pokeprice.io" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[9px] font-bold text-white/80 flex items-center gap-1 uppercase bg-black/20 px-2 py-1 rounded-md hover:bg-black/40 transition-colors">
                        <ExternalLink size={10} /> Live Site
                      </a>
                    </div>
                    <iframe src="https://pokeprice.io" className={cn("flex-1 w-full border-none pt-8 md:pt-10 bg-[#1a1c1d]", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'card-intel' && (
                  <div className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto custom-scrollbar h-full space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl md:text-4xl font-black italic uppercase text-white drop-shadow-md">Card <span className="text-[#e74c3c]">Intel</span></h2>
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest digital-text">Trace Status: Connected [Authorized]</p>
                      </div>
                      <div className="flex w-full md:w-auto gap-2">
                        <Input 
                          placeholder="Search Pokemon..." 
                          value={searchQuery} 
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleIntelSearch()}
                          className="bg-black/40 border border-white/10 text-white h-10 md:h-12 rounded-lg italic font-bold focus:border-[#e74c3c] transition-colors"
                        />
                        <Button 
                          onClick={handleIntelSearch} 
                          disabled={intelLoading}
                          className="bg-[#e74c3c] text-white font-black uppercase italic rounded-lg px-6 h-10 md:h-12"
                        >
                          {intelLoading ? <Loader2 className="animate-spin" /> : <Search />}
                        </Button>
                      </div>
                    </div>

                    {!intelData && !intelLoading && (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                        <div className="h-24 w-24 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center">
                          <BarChart3 size={40} className="text-white" />
                        </div>
                        <p className="text-white font-black uppercase italic tracking-widest text-sm">Awaiting Scanner Input...</p>
                      </div>
                    )}

                    {intelData && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="lg:col-span-4 space-y-4">
                          <div className="relative aspect-square rounded-2xl border-4 border-white/10 overflow-hidden shadow-2xl bg-black">
                            {intelImage ? (
                              <img src={intelImage} alt={intelData.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="animate-spin text-accent" size={32} />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                              <div className="text-xs font-black text-white uppercase italic">{intelData.name}</div>
                              <div className="text-[10px] text-accent/80 font-bold digital-text">{intelData.pokedexNumber}</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-[#e74c3c]">
                              <Shield size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Base Statistics</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-white">
                              <div>
                                <p className="text-[8px] text-white/50 uppercase">Height</p>
                                <p className="text-xs font-bold">{intelData.stats.height}</p>
                              </div>
                              <div>
                                <p className="text-[8px] text-white/50 uppercase">Weight</p>
                                <p className="text-xs font-bold">{intelData.stats.weight}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-8 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                              <h3 className="text-accent font-black uppercase italic text-xs flex items-center gap-2">
                                <Info size={14} /> Archive Entry
                              </h3>
                              <p className="text-white/80 text-xs md:text-sm leading-relaxed italic font-medium">
                                "{intelData.description}"
                              </p>
                              <div className="flex gap-2 pt-2">
                                {intelData.types.map(t => (
                                  <span key={t} className="px-2 py-1 bg-[#e74c3c]/20 border border-[#e74c3c]/40 text-[#e74c3c] text-[8px] font-black uppercase rounded-md">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                              <h3 className="text-accent font-black uppercase italic text-xs flex items-center gap-2">
                                <TrendingUp size={14} /> TCG Footprint
                              </h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/50 text-[10px] uppercase font-bold">Total Cards</span>
                                  <span className="text-white font-black text-sm">{intelData.tcgStats.totalCards}</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-white/50 text-[10px] uppercase font-bold">Notable Sets</p>
                                  <div className="flex flex-wrap gap-1">
                                    {intelData.tcgStats.notableSets.map(s => (
                                      <span key={s} className="text-[9px] text-white/80 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 bg-black/60 rounded-3xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-4 right-6 flex items-center gap-2">
                              <span className="text-[10px] font-black text-green-400 uppercase tracking-widest animate-pulse">Live Tracking</span>
                              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]" />
                            </div>
                            <h3 className="text-white font-black uppercase italic text-sm mb-6 flex items-center gap-2">
                              <BarChart3 size={16} className="text-[#e74c3c]" /> Market Price Spikes
                            </h3>
                            
                            <div className="h-48 w-full">
                              <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={chartData}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis 
                                      dataKey="month" 
                                      axisLine={false} 
                                      tickLine={false} 
                                      tick={{ fill: '#ffffff50', fontSize: 10, fontWeight: 'bold' }}
                                    />
                                    <YAxis hide />
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Line 
                                      type="monotone" 
                                      dataKey="price" 
                                      stroke="hsl(var(--primary))" 
                                      strokeWidth={4} 
                                      dot={false}
                                      activeDot={{ r: 6, fill: 'white', stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex gap-4">
                                <div className="text-center">
                                  <p className="text-[8px] text-white/40 uppercase">High</p>
                                  <p className="text-sm font-black text-white italic">£{Math.max(...chartData.map(d => d.price)).toFixed(0)}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-[8px] text-white/40 uppercase">Low</p>
                                  <p className="text-sm font-black text-white italic">£{Math.min(...chartData.map(d => d.price)).toFixed(0)}</p>
                                </div>
                              </div>
                              <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2">
                                <TrendingUp className="text-green-400" size={16} />
                                <span className="text-green-400 font-black text-xs italic">+14.2%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {mode === 'pokedex' && (
                  <div className="flex-1 flex flex-col h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#e74c3c] h-8 md:h-10 z-30 flex items-center px-4 justify-between border-b-2 md:border-b-4 border-black/20 shadow-md">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white animate-pulse" />
                        Archive v2.1
                      </span>
                      <a href="https://pokedex.org/" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[9px] font-bold text-white/80 flex items-center gap-1 uppercase bg-black/20 px-2 py-1 rounded-md hover:bg-black/40 transition-colors">
                        <ExternalLink size={10} /> Full Site
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
                        <TrendingUp size={10} /> Full Site
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
                        <ExternalLink size={10} /> Full Site
                      </a>
                    </div>
                    <iframe src="https://pkmncards.com/?s=charizard" className={cn("flex-1 w-full border-none pt-8 md:pt-10 bg-slate-900", isStaticActive && "opacity-40")} />
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="p-4 md:p-8 pt-12 md:pt-14 flex-1 overflow-y-auto custom-scrollbar h-full bg-[#1a1c1d]">
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-5xl font-black italic uppercase text-white drop-shadow-md">Trade-<span className="text-[#e74c3c]">In</span></h2>
                    </div>
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#e74c3c] font-black uppercase italic tracking-widest text-[10px] md:text-xs flex items-center gap-2 drop-shadow-sm"><Calculator className="size-4 md:size-5"/> Calculator Console</span>
                        <Button variant="outline" onClick={addTradeCard} className="bg-[#e74c3c]/10 border-[#e74c3c] border-2 md:border-4 text-[#e74c3c] font-black uppercase italic rounded-xl h-9 md:h-11 px-4 md:px-5 shadow-lg hover:bg-[#e74c3c] hover:text-white transition-all text-[10px] md:text-sm">
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {tradeCards.map((card) => (
                          <div key={card.id} className="flex gap-2 md:gap-3 items-end group animate-in slide-in-from-left-4 duration-300">
                            <div className="flex-1">
                              <Input placeholder="Card Name..." value={card.name} onChange={(e) => updateTradeCard(card.id, 'name', e.target.value)} className="bg-black/40 border border-white/10 text-white h-10 md:h-11 rounded-lg italic font-bold focus:border-[#e74c3c] transition-colors text-xs md:text-sm" />
                            </div>
                            <div className="w-16 md:w-28">
                              <Input type="number" placeholder="£" value={card.value || ''} onChange={(e) => updateTradeCard(card.id, 'value', e.target.value)} className="bg-black/40 border border-white/10 text-white h-10 md:h-11 rounded-lg italic font-bold focus:border-[#e74c3c] transition-colors text-xs md:text-sm" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeTradeCard(card.id)} className="h-10 w-10 md:h-11 md:w-11 text-slate-500 hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-6 border-t border-white/5">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl shadow-inner text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-green-400 uppercase tracking-widest digital-text">Cash (70%)</p>
                          <p className="text-lg md:text-2xl font-black text-green-400">£{(totalValue * 0.7).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-inner text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest digital-text">Trade (80%)</p>
                          <p className="text-lg md:text-2xl font-black text-blue-400">£{(totalValue * 0.8).toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl shadow-inner text-center sm:text-left">
                          <p className="text-[8px] md:text-[10px] font-black text-purple-400 uppercase tracking-widest digital-text">Consign (85%)</p>
                          <p className="text-lg md:text-2xl font-black text-purple-400">£{(totalValue * 0.85).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'find-us' && (
                  <div className="p-4 md:p-8 pt-12 md:pt-14 flex-1 overflow-y-auto custom-scrollbar h-full space-y-6 md:space-y-8 bg-[#1a1c1d]">
                    <div className="text-center space-y-4">
                      <h2 className="text-2xl md:text-5xl font-black italic uppercase text-white drop-shadow-md">Find <span className="text-[#e74c3c]">Us</span></h2>
                      <div className="flex justify-center">
                        <img 
                          src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                          alt="Newton's Collectables" 
                          className="h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-xl"
                        />
                      </div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div className="p-4 md:p-6 bg-black/40 border-2 border-white/5 rounded-xl md:rounded-2xl space-y-4 shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-accent digital-text text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Schedule Archive</span>
                            <div className="h-px flex-1 bg-accent/20" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1">
                              <p className="text-[#e74c3c] digital-text text-[8px] md:text-[10px] font-black uppercase tracking-widest">Saturdays (8:30AM – 4:00PM)</p>
                              <p className="text-base md:text-xl text-white font-black italic uppercase leading-tight">Outside Timpsons, Market Square, IP33 1BT</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[#e74c3c] digital-text text-[8px] md:text-[10px] font-black uppercase tracking-widest">Wednesdays (8:30AM – 4:00PM)</p>
                              <p className="text-base md:text-xl text-white font-black italic uppercase leading-tight">Market Square, Bury St Edmunds</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                        <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 md:p-4 bg-black/40 rounded-xl border-2 border-white/5 hover:border-[#e74c3c] hover:bg-[#e74c3c]/5 transition-all group shadow-lg">
                          <Instagram size={18} className="text-[#e74c3c]" />
                          <span className="text-[9px] md:text-[10px] font-black text-white uppercase italic tracking-widest">Instagram</span>
                        </a>
                        <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-2 p-3 md:p-4 bg-black/40 rounded-xl border-2 border-white/5 hover:border-blue-400 hover:bg-blue-400/5 transition-all group shadow-lg">
                          <Mail size={18} className="text-blue-400" />
                          <span className="text-[9px] md:text-[10px] font-black text-white uppercase italic tracking-widest">Email</span>
                        </a>
                        <a href="https://wa.me/447340407375" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 md:p-4 bg-black/40 rounded-xl border-2 border-white/5 hover:border-green-400 hover:bg-green-400/5 transition-all group shadow-lg">
                          <MessageCircle size={18} className="text-green-400" />
                          <span className="text-[9px] md:text-[10px] font-black text-white uppercase italic tracking-widest">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-48 lg:w-56 bg-gradient-to-br from-[#c0392b] to-[#8e1d14] p-4 md:p-6 lg:p-8 flex flex-col justify-between border-t-4 md:border-t-0 md:border-l-8 border-black/20 shrink-0 relative z-30 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2">
               <div className="h-3 bg-black/20 rounded-full" />
               <div className="h-3 bg-black/20 rounded-full" />
               <div className="h-3 bg-black/20 rounded-full w-2/3" />
               <div className="h-3 bg-black/20 rounded-full w-1/2" />
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border-2 border-white/5 shadow-inner hidden md:block">
              <div className="space-y-3">
                <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-3/4 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-8 w-8 bg-[#2d3436] rounded-lg border-2 border-black/20 shadow-lg" />
                  <div className="h-8 w-8 bg-[#2d3436] rounded-lg border-2 border-black/20 shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <img 
              src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
              alt="Newton's Collectables" 
              className="h-12 md:h-20 lg:h-24 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="hidden md:flex flex-col items-center gap-6 lg:gap-8 mt-12">
            <div className="text-center space-y-1">
              <p className="text-[8px] lg:text-[10px] font-black text-white/30 uppercase italic tracking-widest digital-text">Archival Handheld</p>
              <p className="text-[8px] font-black text-accent/20 uppercase tracking-[0.8em] digital-text">PRO SERIES 3.0</p>
            </div>
            
            <div className="h-24 w-12 bg-black/20 rounded-full relative overflow-hidden flex items-center justify-center p-2">
               <div className="h-full w-1 bg-white/5 rounded-full" />
               <div className="absolute top-4 h-6 w-6 bg-accent/20 rounded-full blur-md" />
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center pt-4">
             <div className="h-1 w-24 bg-black/20 rounded-full mb-2" />
             <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] digital-text">PRO SERIES 3.0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
