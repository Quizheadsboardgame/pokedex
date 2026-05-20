import { MapPin, Clock, Mail, Instagram, Phone, Zap, Tag, ShoppingBag, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function VisitPage() {
  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <section className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="pokedex-frame p-8 md:p-12 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="pokedex-camera scale-75" />
                <Badge className="bg-secondary text-white font-black uppercase italic px-4 py-1">Location Data</Badge>
              </div>
              <h2 className="text-5xl font-black uppercase italic text-foreground tracking-tighter leading-[0.85]">Where to <span className="text-primary">Find Us</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 pokedex-screen p-6">
                <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-xs digital-text">
                  <MapPin size={16} />
                  Saturdays
                </div>
                <p className="text-xl text-white font-black uppercase italic leading-tight">Outside Timpsons <br /> Market Square <br /> IP33 1BT</p>
              </div>

              <div className="space-y-4 pokedex-screen p-6">
                <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-xs digital-text">
                  <Clock size={16} />
                  Wednesdays
                </div>
                <p className="text-xl text-white font-black uppercase italic leading-tight">Market Square <br /> (Moving Location) <br /> 8:30AM – 4:00PM</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic text-primary">Contact the Lab</h3>
              <div className="grid gap-4">
                <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-2xl border-4 border-slate-200 hover:border-primary transition-all group">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Instagram</p>
                    <p className="font-bold">@newtons_collectables</p>
                  </div>
                </a>

                <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-4 p-4 bg-white rounded-2xl border-4 border-slate-200 hover:border-secondary transition-all group">
                  <div className="h-12 w-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Email</p>
                    <p className="font-bold">Hello@tradeintcg.com</p>
                  </div>
                </a>

                <a href="tel:07340407375" className="flex items-center gap-4 p-4 bg-white rounded-2xl border-4 border-slate-200 hover:border-accent transition-all group">
                  <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Mobile</p>
                    <p className="font-bold">07340407375</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="relative sticky top-32">
            <div className="pokedex-frame p-2 bg-primary">
               <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-black/10 bg-white">
                  <Image 
                    src="https://i.ibb.co/cSGJN4Cm/IMG-2551.png" 
                    alt="Newton's Collectables Logo" 
                    fill 
                    className="object-contain p-8"
                  />
               </div>
            </div>
            <div className="absolute -top-8 -right-8 h-32 w-32 bg-accent rounded-full border-[6px] border-primary shadow-2xl flex items-center justify-center font-black text-primary text-sm text-center p-4 transform rotate-12 z-20 uppercase italic leading-none">
              WEATHER DEPENDENT
            </div>
            <div className="absolute bottom-4 right-4 pokedex-button bg-blue-500 scale-150 shadow-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
