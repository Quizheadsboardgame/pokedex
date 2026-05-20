import { MapPin, Clock, Mail, Instagram, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function VisitStall() {
  return (
    <section id="visit" className="py-32 container px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div>
            <Badge className="mb-6 bg-primary text-black font-bold">THE EXCHANGE</Badge>
            <h2 className="text-5xl font-bold mb-8 text-white tracking-tighter">Find us at the Market</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We operate out of a boutique market stall in Bury St Edmunds every Wednesday and Saturday. 
              Come dig through our crates and enjoy the analog sound in person.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs">
                <MapPin size={16} />
                Location
              </div>
              <p className="text-lg text-white font-medium">Bury St Edmunds Market <br /> Stall #42, IP33 1BT</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs">
                <Clock size={16} />
                Trading Hours
              </div>
              <p className="text-lg text-white font-medium">Wed & Sat <br /> 8:30 AM – 4:00 PM</p>
            </div>
          </div>

          <div className="flex gap-6 pt-6">
            <a href="#" className="p-4 bg-secondary/50 rounded-full border border-white/5 text-white hover:bg-primary hover:text-black transition-all">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-4 bg-secondary/50 rounded-full border border-white/5 text-white hover:bg-primary hover:text-black transition-all">
              <Mail size={24} />
            </a>
            <a href="#" className="p-4 bg-secondary/50 rounded-full border border-white/5 text-white hover:bg-primary hover:text-black transition-all">
              <Phone size={24} />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="vinyl-frame bg-black p-4">
             <div className="aspect-square relative rounded-md overflow-hidden opacity-80 hover:opacity-100 transition-all duration-1000">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.228511674312!2d0.7107297771746977!3d52.24831645620958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d84f880f089c93%3A0xc07a827725838089!2sBury%20St%20Edmunds%20Market!5e0!3m2!1sen!2suk!4v1715456789123!5m2!1sen!2suk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>
          </div>
          <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary rounded-full border-4 border-black shadow-2xl flex items-center justify-center font-bold text-black text-xs text-center p-4 transform -rotate-12 z-20">
            RARE VINYL INSIDE
          </div>
        </div>
      </div>
    </section>
  );
}