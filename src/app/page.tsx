
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
  Activity,
  ChevronUp,
  ChevronDown,
  Star,
  Link as LinkIcon,
  Save,
  Lock,
  Unlock,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface TradeCard {
  id: string;
  name: string;
  value: number;
}

type Mode = 'find-us' | 'trade-in' | 'new-cards' | 'admin-login';

export default function PokedexApp() {
  const [mode, setMode] = useState<Mode>('new-cards');
  const [mounted, setMounted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  const db = useFirestore();
  
  const cardsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'new-cards'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: remoteCards, loading: cardsLoading } = useCollection(cardsQuery);

  const [newCardName, setNewCardName] = useState("");
  const [newCardPrice, setNewCardPrice] = useState("");
  const [newCardImageUrl, setNewCardImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [tradeCards, setTradeCards] = useState<TradeCard[]>([
    { id: "initial-1", name: "", value: 0 }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const saveNewCard = () => {
    if (!db || !newCardName || !newCardPrice || !newCardImageUrl) return;
    setIsSaving(true);
    
    const cardsRef = collection(db, 'new-cards');
    const data = {
      name: newCardName,
      price: newCardPrice,
      imageUrl: newCardImageUrl,
      sold: false,
      createdAt: serverTimestamp(),
    };

    addDoc(cardsRef, data)
      .then(() => {
        setNewCardName("");
        setNewCardPrice("");
        setNewCardImageUrl("");
        setMode('new-cards');
        setIsSaving(false);
        toast({
          title: "Update Successful",
          description: `${data.name} synced across all devices.`,
        });
      })
      .catch(async (serverError) => {
        setIsSaving(false);
        const permissionError = new FirestorePermissionError({
          path: cardsRef.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const toggleSoldStatus = (id: string, currentStatus: boolean) => {
    if (!db) return;
    const cardRef = doc(db, 'new-cards', id);
    const newStatus = !currentStatus;

    updateDoc(cardRef, { sold: newStatus })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: cardRef.path,
          operation: 'update',
          requestResourceData: { sold: newStatus },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const deleteCard = (id: string) => {
    if (!db) return;
    const cardRef = doc(db, 'new-cards', id);
    deleteDoc(cardRef)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: cardRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const handleAdminLogin = () => {
    if (adminPassword === "Harley") {
      setEditMode(true);
      setMode('new-cards');
      setAdminPassword("");
      toast({
        title: "Admin Access Granted",
        description: "Live inventory management unlocked.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect Passcode.",
      });
    }
  };

  if (!mounted) return null;

  return (
    <main className="container px-4 max-w-6xl mx-auto py-4 md:py-8">
      <div className="pokedex-shell overflow-hidden">
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
          <div className="lg:col-span-9">
            <div className="pokedex-screen-container group h-full flex flex-col min-h-[600px] relative bg-[#2d3436]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none z-10" />
              
              <div className="absolute top-4 left-6 right-6 z-30 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-2">
                  <Activity size={12} className={cn("text-primary", (cardsLoading || isSaving) && "animate-spin")} />
                  <span className="text-[9px] font-black digital-text uppercase tracking-widest text-primary">
                    {cardsLoading || isSaving ? "LINKING TO SATELLITE..." : "CLOUD SYNC: ACTIVE"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-white/50 digital-text uppercase tracking-widest">GLOBAL FEED</span>
                </div>
              </div>

              <div className="relative z-10 p-4 md:p-10 pt-16 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {mode === 'new-cards' && (
                  <div className="flex-1 space-y-8">
                    <div className="text-center space-y-2">
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        New <span className="text-primary">Cards</span>
                      </h2>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline" className="border-accent text-accent font-black digital-text text-[10px] uppercase italic tracking-widest">
                          Live Feed
                        </Badge>
                        {editMode && (
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => setMode('admin-login')} 
                            className="h-6 bg-accent text-accent-foreground text-[8px] font-black uppercase px-2"
                          >
                            <Plus size={10} className="mr-1" /> Add Card
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 pb-12">
                      {remoteCards?.map((card: any) => (
                        <div key={card.id} className={cn(
                          "bg-black/60 border-2 border-white/5 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 group transition-all overflow-hidden relative",
                          card.sold && "opacity-40"
                        )}>
                           <div className="w-full md:w-40 h-56 md:h-40 relative rounded-2xl overflow-hidden border-4 border-slate-700/50 shrink-0">
                              <img src={card.imageUrl} alt={card.name} className={cn("object-cover w-full h-full", card.sold && "grayscale")} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <Badge className={cn(
                                "absolute bottom-2 left-2 text-[10px] uppercase font-black tracking-widest",
                                card.sold ? "bg-slate-500" : "bg-primary"
                              )}>
                                £{card.price}
                              </Badge>
                              {card.sold && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                  <Badge variant="destructive" className="bg-destructive text-white border-2 border-white font-black italic uppercase text-lg rotate-12 px-4">SOLD</Badge>
                                </div>
                              )}
                           </div>

                           <div className="space-y-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={cn("text-2xl font-black italic uppercase tracking-tight text-white", card.sold && "line-through text-white/40")}>
                                  {card.name}
                                </h3>
                                {editMode && (
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => toggleSoldStatus(card.id, !!card.sold)}
                                      className={cn(
                                        "h-8 px-2 font-black uppercase italic text-[8px] border-2",
                                        card.sold ? "text-green-400 border-green-400/20" : "text-amber-400 border-amber-400/20"
                                      )}
                                    >
                                      {card.sold ? "Restock" : "Mark Sold"}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={() => deleteCard(card.id)}
                                      className="h-8 w-8 text-white/30 hover:text-destructive"
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className={cn("h-full w-full", card.sold ? "bg-slate-700" : "bg-primary/40")} />
                              </div>
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest digital-text">ID: {card.id.slice(-6).toUpperCase()}</p>
                           </div>
                        </div>
                      ))}

                      {(!remoteCards || remoteCards.length === 0) && !cardsLoading && (
                        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
                          <p className="text-white/20 font-black uppercase italic digital-text">Scanning for arrivals...</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {mode === 'admin-login' && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                    {!editMode ? (
                      <div className="w-full max-w-sm space-y-6 text-center">
                        <div className="p-6 bg-black/40 border-2 border-primary/20 rounded-[2rem] space-y-6">
                          <div className="flex justify-center">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                              <Lock size={32} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-black text-white uppercase italic">Admin Portal</h3>
                            <p className="text-[10px] digital-text text-white/40 uppercase">Enter Passcode</p>
                          </div>
                          <Input 
                            type="password"
                            placeholder="••••••••"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                            className="bg-black/60 border-2 border-white/10 text-center text-white h-14 rounded-2xl font-bold text-xl tracking-widest"
                          />
                          <Button 
                            className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase italic pokedex-button-hardware"
                            onClick={handleAdminLogin}
                          >
                            Sync Identity
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full space-y-8">
                        <div className="text-center">
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                            Card <span className="text-accent">Entry</span>
                          </h2>
                        </div>

                        <div className="bg-black/40 border-2 border-white/10 p-8 rounded-[2.5rem] space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase italic text-primary digital-text">Card Name</label>
                                <Input 
                                  placeholder="e.g. Base Set Mewtwo..."
                                  value={newCardName}
                                  onChange={(e) => setNewCardName(e.target.value)}
                                  className="bg-black/60 border-2 border-white/10 text-white h-14 rounded-2xl font-bold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase italic text-primary digital-text">Price (£)</label>
                                <Input 
                                  placeholder="0.00"
                                  value={newCardPrice}
                                  onChange={(e) => setNewCardPrice(e.target.value)}
                                  className="bg-black/60 border-2 border-white/10 text-white h-14 rounded-2xl font-bold"
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase italic text-primary digital-text">Image Link</label>
                                <Input 
                                  placeholder="https://i.ibb.co/..."
                                  value={newCardImageUrl}
                                  onChange={(e) => setNewCardImageUrl(e.target.value)}
                                  className="bg-black/60 border-2 border-white/10 text-white h-14 rounded-2xl font-bold"
                                />
                              </div>
                              <div className="h-28 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                                {newCardImageUrl ? (
                                  <img src={newCardImageUrl} alt="Preview" className="h-full w-full object-contain" />
                                ) : (
                                  <div className="flex flex-col items-center gap-1 opacity-20">
                                    <ImageIcon size={24} />
                                    <span className="text-[8px] font-black uppercase italic digital-text">Preview</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <Button 
                              className="flex-1 bg-accent text-accent-foreground h-16 rounded-2xl font-black uppercase italic text-lg hover:bg-accent/80 transition-all pokedex-button-hardware"
                              onClick={saveNewCard}
                              disabled={isSaving || !newCardName || !newCardPrice || !newCardImageUrl}
                            >
                              {isSaving ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />}
                              Broadcast to App
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="h-16 px-8 rounded-2xl text-white/50 font-black uppercase italic border-2 border-white/10"
                              onClick={() => setMode('new-cards')}
                            >
                              Exit
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {mode === 'trade-in' && (
                  <div className="flex-1 space-y-8">
                    <div className="text-center">
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                        Trade-In <span className="text-primary">Calculator</span>
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-widest text-sm">
                          <Calculator size={18} />
                          Active Session
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
                  <div className="flex-1 space-y-10">
                    <div className="text-center space-y-4">
                      <Badge className="bg-accent text-accent-foreground font-black italic tracking-widest px-4 py-1">GPS LINK: ACTIVE</Badge>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        Find <span className="text-primary">Us</span>
                      </h2>
                    </div>

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
                          <Clock size={16} /> Wednesdays
                        </div>
                        <p className="text-2xl text-white font-black italic uppercase leading-tight">
                          Market Square <br /> Bury St Edmunds <br /> 8:30AM – 4:00PM
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 pb-12">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a href="https://instagram.com/newtons_collectables" target="_blank" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/20 transition-all">
                          <Instagram size={20} className="text-primary" />
                          <span className="text-[10px] font-bold uppercase italic digital-text">Instagram</span>
                        </a>
                        <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-secondary/20 transition-all">
                          <Mail size={20} className="text-secondary" />
                          <span className="text-[10px] font-bold uppercase italic digital-text">Email</span>
                        </a>
                        <a href="tel:07340407375" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-accent/20 transition-all">
                          <Phone size={20} className="text-accent" />
                          <span className="text-[10px] font-bold uppercase italic digital-text">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between py-6">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-white/50 uppercase italic tracking-widest text-center">Modules</p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setMode('new-cards')}
                    className={cn(
                      "pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all",
                      mode === 'new-cards' && !editMode ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <Star size={18} /> New Cards
                  </button>
                  <button 
                    onClick={() => setMode('trade-in')}
                    className={cn(
                      "pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all",
                      mode === 'trade-in' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <Calculator size={18} /> Calculator
                  </button>
                  <button 
                    onClick={() => setMode('find-us')}
                    className={cn(
                      "pokedex-button-hardware h-16 w-full flex items-center justify-center gap-3 font-black uppercase italic tracking-tighter text-sm transition-all",
                      mode === 'find-us' ? 'bg-accent text-accent-foreground scale-105' : 'bg-slate-700 text-white hover:bg-slate-600'
                    )}
                  >
                    <MapPin size={18} /> GPS Map
                  </button>
                </div>
              </div>

              <div className="px-4">
                <button 
                  onClick={() => {
                    if (editMode) {
                      setEditMode(false);
                      setMode('new-cards');
                    } else {
                      setMode('admin-login');
                    }
                  }}
                  className={cn(
                    "pokedex-button-hardware w-full py-4 flex items-center justify-center gap-3 font-black uppercase italic text-[10px] digital-text border-2 border-white/10",
                    editMode ? "bg-red-500 text-white" : "bg-black/20 text-white/40"
                  )}
                >
                  {editMode ? <Unlock size={12} /> : <Lock size={12} />}
                  {editMode ? "ADMIN: OPEN" : "ADMIN: LOCK"}
                </button>
              </div>

              <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <div className="absolute w-24 h-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="absolute h-24 w-8 bg-slate-800 rounded-md shadow-lg" />
                <div className="h-6 w-6 rounded-full bg-slate-900 z-10" />
                <button 
                  onClick={() => setMode('new-cards')}
                  className="absolute top-0 w-8 h-8 rounded-t-md hover:bg-slate-700 transition-colors flex items-center justify-center"
                >
                  <ChevronUp size={14} className="text-white/20" />
                </button>
                <button 
                  onClick={() => setMode('trade-in')}
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
