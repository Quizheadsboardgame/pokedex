
import { MapPin, Clock, Mail, Instagram, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function VisitPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <section className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="pokedex-frame p-8 md:p-12 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="pokedex-camera scale-75" />
                <Badge className="bg-secondary text-white font-black uppercase italic px-4 py-1">Scanner Active</Badge>
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic text-foreground tracking-tighter leading-[0.85]">Where to <span className="text-primary">Find Us</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 pokedex-screen p-6 relative">
                <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] digital-text">
                  <MapPin size={14} />
                  Saturdays
                </div>
                <p className="text-2xl text-white font-black uppercase italic leading-tight">Outside Timpsons <br /> Market Square <br /> IP33 1BT</p>
              </div>

              <div className="space-y-4 pokedex-screen p-6">
                <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] digital-text">
                  <Clock size={14} />
                  Wednesdays
                </div>
                <p className="text-2xl text-white font-black uppercase italic leading-tight">Market Square <br /> (Moving Location) <br /> 8:30AM – 4:00PM</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic text-primary">Contact the Lab</h3>
              <div className="grid gap-4">
                <a href="https://instagram.com/newtons_collectables" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white rounded-3xl border-4 border-slate-200 hover:border-primary transition-all group shadow-sm">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Instagram</p>
                    <p className="font-bold text-lg">@newtons_collectables</p>
                  </div>
                </a>

                <a href="mailto:Hello@tradeintcg.com" className="flex items-center gap-4 p-5 bg-white rounded-3xl border-4 border-slate-200 hover:border-secondary transition-all group shadow-sm">
                  <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Email</p>
                    <p className="font-bold text-lg">Hello@tradeintcg.com</p>
                  </div>
                </a>

                <a href="tel:07340407375" className="flex items-center gap-4 p-5 bg-white rounded-3xl border-4 border-slate-200 hover:border-accent transition-all group shadow-sm">
                  <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Mobile</p>
                    <p className="font-bold text-lg">07340407375</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
               <div className="flex gap-2">
                 <div className="h-4 w-4 rounded-full bg-red-500 shadow-inner" />
                 <div className="h-4 w-4 rounded-full bg-yellow-400 shadow-inner" />
                 <div className="h-4 w-4 rounded-full bg-green-500 shadow-inner" />
               </div>
               <div className="h-4 w-32 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-2/3" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
