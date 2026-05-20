
import { MapPin, Clock, Mail, Instagram, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LocationInfo() {
  return (
    <section id="visit" className="py-24 container px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <Badge className="mb-4 bg-primary text-white">VISIT THE STALL</Badge>
            <h2 className="text-4xl font-headline font-bold mb-6">Find us in Bury St Edmunds</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've been trading at the historic Bury St Edmunds Market for over a year. 
              Our low-key, family-friendly stall is the perfect place for collectors of all ages to hunt for their favorites.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Location</h4>
                <p className="text-muted-foreground">Market Thoroughfare, Bury St Edmunds, IP33 1BT</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Hours</h4>
                <p className="text-muted-foreground">Wednesday & Saturday: 8:00 AM – 4:00 PM</p>
              </div>
            </div>

            <div className="flex gap-6 pt-4">
              <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pokedex-frame bg-white p-2">
             <div className="aspect-[4/3] relative rounded-xl overflow-hidden grayscale-0 hover:grayscale transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.228511674312!2d0.7107297771746977!3d52.24831645620958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d84f880f089c93%3A0xc07a827725838089!2sBury%20St%20Edmunds%20Market!5e0!3m2!1sen!2suk!4v1715456789123!5m2!1sen!2suk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
             </div>
          </div>
          <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-accent rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-center p-2 transform rotate-12">
            STALL #42 FIND US!
          </div>
        </div>
      </div>
    </section>
  );
}
