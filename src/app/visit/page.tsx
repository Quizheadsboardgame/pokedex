import { MapPin, Clock, Mail, Instagram, Phone, Zap, Tag, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function VisitPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <section className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <Badge className="mb-6 bg-secondary text-white font-black uppercase italic px-4 py-1">Stall #42 Setup</Badge>
              <h2 className="text-6xl font-black uppercase italic text-foreground tracking-tighter leading-none">The <span className="text-primary">Gazebo</span> Setup</h2>
              <p className="text-xl text-muted-foreground mt-8 font-medium leading-relaxed">
                Look for our red and yellow gazebo! We set up with tables featuring 6 display cases of rare singles and 5-10 binders full of classics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs">
                  <MapPin size={20} />
                  Saturdays
                </div>
                <p className="text-2xl text-foreground font-black uppercase italic">Outside Timpsons <br /> Market Square <br /> IP33 1BT</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-xs">
                  <Clock size={20} />
                  Wednesdays
                </div>
                <p className="text-2xl text-foreground font-black uppercase italic">Market Square <br /> (Variable Location) <br /> 8:30 AM – 4:00 PM</p>
              </div>
            </div>

            <div className="pokedex-screen p-8 space-y-6">
              <h3 className="text-accent font-black uppercase italic text-xl flex items-center gap-2">
                <Tag className="h-6 w-6" />
                Market Price List
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white font-bold uppercase italic">
                <div className="p-4 border-2 border-white/10 rounded-xl">
                  <p className="text-primary text-xs mb-1">Display Cases</p>
                  <p className="text-xl">£5 & Above Singles</p>
                </div>
                <div className="p-4 border-2 border-white/10 rounded-xl">
                  <p className="text-secondary text-xs mb-1">Card Binders</p>
                  <p className="text-xl">£1 to £5 Each</p>
                </div>
                <div className="p-4 border-2 border-white/10 rounded-xl">
                  <p className="text-accent text-xs mb-1">Bulk Bins</p>
                  <p className="text-xl">10p Common / 50p Holo</p>
                </div>
                <div className="p-4 border-2 border-white/10 rounded-xl bg-primary/20">
                  <p className="text-primary text-xs mb-1">Bulk Deal</p>
                  <p className="text-xl flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    60 Cards for £5
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="#" className="h-16 w-16 bg-white rounded-2xl border-4 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg">
                <Instagram size={32} />
              </a>
              <a href="#" className="h-16 w-16 bg-white rounded-2xl border-4 border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-lg">
                <Mail size={32} />
              </a>
            </div>
          </div>

          <div className="relative sticky top-32">
            <div className="pokedex-frame p-4 bg-slate-100">
               <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-slate-300">
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
            <div className="absolute -top-8 -right-8 h-32 w-32 bg-accent rounded-full border-4 border-primary shadow-2xl flex items-center justify-center font-black text-primary text-sm text-center p-4 transform rotate-12 z-20 uppercase italic">
              Look for the Gazebo!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
