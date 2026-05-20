
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
  Search,
  Activity,
  Sparkles,
  Loader2,
  Library,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getPokemonInfo, type PokemonInfoOutput } from "@/ai/flows/pokemon-info-flow";
import { generatePokemonImage } from "@/ai/flows/pokemon-image-flow";

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'find-us' | 'trade-in' | 'search';

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('find-us');
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  
  // Trade-In State
  const [cards, setCards] = useState<TradeCard[]>([
    { id: "initial-1", name: "", value: 0 }
  ]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<PokemonInfoOutput | null>(null);
  const [pokemonImageUrl, setPokemonImageUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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

  const handlePokemonSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);
    setPokemonImageUrl(null);
    
    try {
      const info = await getPokemonInfo({ pokemonName: searchQuery });
      if (!info) throw new Error("Could not find data for this Pokémon.");
      
      setSearchResult(info);
      setIsSearching(false);
      
      // Kick off image generation in background
      setIsGeneratingImage(true);
      try {
        const imageResult = await generatePokemonImage({ prompt: info.imagePrompt });
        if (imageResult?.url) {
          setPokemonImageUrl(imageResult.url);
        }
      } catch (imgError) {
        console.warn("Image generation failed:", imgError);
        // We don't throw here so the user still sees the text info
      } finally {
        setIsGeneratingImage(false);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: error.message || "Connection to the Pokedex network interrupted. Please try again.",
      });
      setIsSearching(false);
    }
  };

  const totalValue = cards.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  if (!mounted) return null;

  return (
    <main className="container px-4 max-w-6xl mx-auto py-8">
      <div className="pokedex-shell">
        {/* Hardware Top Bar */}
        <div className="bg-[#c0392b] p-8 flex items-center gap-6 border-b-8 border-black/10">
          <div className="pokedex-camera-lens" />
          <div className="flex gap-4">
            <div className="h-4 w-4 rounded-full bg-red-600 border-2 border-black/20 shadow-inner animate-pulse" />
            <div className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-black/20 shadow-inner" />
            <div className="h-4 w-4 rounded-full bg-green-500 border-2 border-black/20 shadow-inner" />
          </div>
          <div className="ml-auto">
            <img 
              src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
              alt="Newton's Collectables" 
              className="h-12 md:h-20 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="p-4 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Display Area */}
          <div className="lg:col-span-9">
            <div className={cn(
              "pokedex-screen-container group h-full flex flex-col min-h-[600px]",
              mode === 'find-us' && "screen-flicker"
            )}>
              {/* Animated Scan Line - Only in Find Us mode */}
              {mode === 'find-us' && <div className="scanner-line" />}
              
              {/* Screen Overlays */}
              <div className="pokedex-screen-overlay" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />
              
              {/* Digital Status Header */}
              <div className="absolute top-4 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-2">
                  <Activity size={12} className={cn("text-primary", mode === 'find-us' && "animate-pulse")} />
                  <span className="text-[9px] font-black digital-text uppercase tracking-widest text-primary">
                    Signal: {isSearching ? 'Transmitting...' : 'Stable'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                    <div className={cn("h-full w-2/3 bg-primary", (mode === 'find-us' || isSearching) && "animate-pulse")} />
                  </div>
                  <span className="text-[9px] font-black text-white/50 digital-text uppercase tracking-widest">v2.1.0-AI</span>
                </div>
              </div>

              {/* Internal Screen Content */}
              <div className="relative z-10 p-6 md:p-10 pt-16 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {mode === 'find-us' && (
                  <div className="flex-1 space-y-10">
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
                        <Search size={20} />
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

                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
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

                {mode === 'search' && (
                  <div className="flex-1 space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        Poké<span className="text-primary">Search</span>
                      </h2>
                      <p className="text-accent digital-text text-xs uppercase italic tracking-[0.2em]">Gen AI Research Module</p>
                    </div>

                    <div className="flex gap-4">
                      <Input 
                        placeholder="Search Pokemon name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePokemonSearch()}
                        className="bg-black/40 border-2 border-white/10 text-white focus-visible:ring-primary h-14 rounded-2xl italic font-bold text-lg"
                      />
                      <Button 
                        onClick={handlePokemonSearch}
                        disabled={isSearching}
                        className="bg-primary hover:bg-primary/90 text-white font-black uppercase italic rounded-2xl h-14 px-8 border-b-4 border-black/20"
                      >
                        {isSearching ? <Loader2 className="animate-spin" /> : <Search size={24} />}
                      </Button>
                    </div>

                    {searchResult && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                        <div className="space-y-6">
                          <div className="p-6 bg-black/40 border-2 border-primary/20 rounded-3xl space-y-4">
                            <h3 className="text-3xl font-black text-primary uppercase italic italic">{searchResult.name}</h3>
                            <p className="text-sm text-white/80 leading-relaxed italic">{searchResult.description}</p>
                          </div>

                          <div className="p-6 bg-blue-500/10 border-2 border-blue-500/20 rounded-3xl space-y-4">
                            <div className="flex items-center gap-2 text-blue-400 font-black uppercase italic tracking-widest text-xs">
                              <Library size={14} />
                              TCG Database
                            </div>
                            <div className="space-y-2">
                              <p className="text-white font-bold italic">Approx. {searchResult.tcgStats.totalCards} total cards</p>
                              <div className="flex flex-wrap gap-2 pt-2">
                                {searchResult.tcgStats.notableSets.map((set, i) => (
                                  <Badge key={i} className="bg-blue-500/20 text-blue-400 border-none uppercase italic text-[10px]">{set}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="relative aspect-square bg-black/40 border-2 border-white/10 rounded-3xl overflow-hidden group">
                            {isGeneratingImage ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-primary h-10 w-10" />
                                <span className="text-[10px] font-black digital-text text-white/50 uppercase tracking-widest">Generating AI Image...</span>
                              </div>
                            ) : pokemonImageUrl ? (
                              <img src={pokemonImageUrl} alt={searchResult.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                                <Activity className="text-white/5 h-20 w-20" />
                                {isSearching === false && !isGeneratingImage && !pokemonImageUrl && (
                                  <span className="text-[8px] text-white/10 font-black digital-text">No Visual Data</span>
                                )}
                              </div>
                            )}
                            {pokemonImageUrl && (
                              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                                 <Badge className="bg-primary/80 text-white font-black italic text-[9px]">AI GENERATED</Badge>
                              </div>
                            )}
                          </div>

                          <div className="p-6 bg-accent/10 border-2 border-accent/20 rounded-3xl">
                            <div className="flex items-center gap-2 text-accent font-black uppercase italic tracking-widest text-xs mb-3">
                              <Sparkles size={14} />
                              Did you know?
                            </div>
                            <p className="text-xs text-white/70 leading-relaxed italic whitespace-pre-line">{searchResult.facts}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!searchResult && !isSearching && (
                      <div className="flex-1 flex flex-col items-center justify-center opacity-20 py-20 gap-4">
                         <Search size={80} className="text-white" />
                         <p className="text-xs font-black digital-text uppercase tracking-widest">Waiting for Signal Input</p>
                      </div>
                    )}
                    
                    {isSearching && !searchResult && (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6">
                         <div className="relative">
                            <Loader2 size={80} className="text-primary animate-spin" />
                            <Activity className="absolute inset-0 m-auto h-8 w-8 text-accent animate-pulse" />
                         </div>
                         <div className="text-center space-y-2">
                           <p className="text-sm font-black digital-text text-white uppercase tracking-[0.3em] animate-pulse">Scanning Neural Network</p>
                           <p className="text-[10px] font-black digital-text text-white/40 uppercase">Connecting to Poke-Satellite Alpha...</p>
                         </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Hardware Controls */}
          <div className="lg:col-span-3 flex flex-col justify-between py-6">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-white/50 uppercase italic tracking-widest text-center">Module Select</p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setMode('find-us')}
                    className={`pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all ${
                      mode === 'find-us' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    <MapPin size={18} />
                    Location
                  </button>
                  <button 
                    onClick={() => setMode('trade-in')}
                    className={`pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all ${
                      mode === 'trade-in' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    <Calculator size={18} />
                    Trade In
                  </button>
                  <button 
                    onClick={() => setMode('search')}
                    className={`pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all ${
                      mode === 'search' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
              </div>

              {/* D-Pad Simulation */}
              <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <div className="absolute w-24 h-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="absolute h-24 w-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="h-6 w-6 rounded-full bg-slate-900 z-10" />
                <button 
                  onClick={() => {
                    if(mode === 'find-us') setMode('trade-in');
                    else if(mode === 'trade-in') setMode('search');
                    else setMode('find-us');
                  }}
                  className="absolute top-0 w-8 h-8 rounded-t-md hover:bg-slate-700 transition-colors"
                />
                <button 
                  onClick={() => {
                    if(mode === 'find-us') setMode('search');
                    else if(mode === 'search') setMode('trade-in');
                    else setMode('find-us');
                  }}
                  className="absolute bottom-0 w-8 h-8 rounded-b-md hover:bg-slate-700 transition-colors"
                />
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
