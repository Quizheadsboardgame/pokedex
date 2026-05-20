import { MapPin, Clock, Mail, Instagram, Zap, Tag, ShoppingBag, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
              <p className="text-xl text-muted-foreground mt-8 font-medium italic">
                "We set up with tables featuring 6 display cases of rare singles and 10 binders full of classics."
              </p>
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

            <div className="p-6 bg-slate-200 rounded-3xl border-4 border-slate-300">
              <h3 className="text-primary font-black uppercase italic text-xl flex items-center gap-2 mb-4">
                <Tag className="h-6 w-6" />
                Price Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold uppercase italic">
                <div className="p-3 bg-white rounded-xl border-2 border-slate-300">
                  <p className="text-primary text-[10px] mb-1">Singles</p>
                  <p>£1 to £500+</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-slate-300">
                  <p className="text-secondary text-[10px] mb-1">Bulk Deals</p>
                  <p>10p ea / £5 Bag</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="h-16 w-16 bg-white rounded-2xl border-4 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg p-0">
                <Instagram size={32} />
              </Button>
              <Button className="h-16 w-16 bg-white rounded-2xl border-4 border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-lg p-0">
                <Mail size={32} />
              </Button>
            </div>
          </div>

          <div className="relative sticky top-32">
            <div className="pokedex-frame p-2 bg-primary">
               <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-black/10">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.228511674312!2d0.7107297771746977!3d52.24831645620958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d84f880f089c93%3A0xc07a827725838089!2sBury%20St%20Edmunds%20Market!5e0!3m2!1sen!2suk!4v1715456789123!5m2!1sen!2suk" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'contrast(1.1)' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
            <div className="absolute -top-8 -right-8 h-32 w-32 bg-accent rounded-full border-[6px] border-primary shadow-2xl flex items-center justify-center font-black text-primary text-sm text-center p-4 transform rotate-12 z-20 uppercase italic leading-none">
              LOOK FOR THE GAZEBO!
            </div>
            {/* Map Pointer Decoration */}
            <div className="absolute bottom-4 right-4 pokedex-button bg-blue-500 scale-150 shadow-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
