import { Button } from "@/components/ui/button";
import { Zap, ChevronRight, Star, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground font-black text-xs tracking-widest uppercase border-2 border-primary">
              <Star size={14} className="fill-current" />
              Bury St Edmunds #1 Collectibles Stall
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground uppercase italic">
              Catch the <br /> <span className="text-primary underline decoration-accent decoration-8 underline-offset-8">Rarest Singles</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
              From 10p bulk bins for the little legends to graded vintage grails for the serious collectors. 
              Find us every Wednesday and Saturday in the heart of the market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link href="/browse">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-10 text-xl rounded-2xl shadow-[0_8px_0_0_rgba(180,0,0,1)] active:translate-y-1 active:shadow-none transition-all uppercase italic">
                  Explore Crates
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/visit">
                <Button variant="outline" size="lg" className="h-16 px-10 text-xl border-4 rounded-2xl border-secondary text-secondary font-black uppercase italic hover:bg-secondary hover:text-white transition-all">
                  Find Stall
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none hidden lg:block">
          <div className="w-full h-full relative rotate-12">
            <Image 
              src="https://picsum.photos/seed/poke-art/800/1000" 
              alt="Pokemon Art" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white border-y-8 border-primary/20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-secondary/5 rounded-3xl border-4 border-secondary/20 hover:border-secondary transition-all group">
              <div className="h-14 w-14 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-secondary">Legendary Stock</h3>
              <p className="text-muted-foreground font-medium">Weekly rotations of vintage holos, Japanese imports, and the latest modern hits.</p>
            </div>
            
            <div className="p-8 bg-primary/5 rounded-3xl border-4 border-primary/20 hover:border-primary transition-all group">
              <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform">
                <Star size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-primary">Community Hub</h3>
              <p className="text-muted-foreground font-medium">We're collectors first. Come trade, talk lore, or just browse the 10p bulk bins.</p>
            </div>
            
            <div className="p-8 bg-accent/5 rounded-3xl border-4 border-accent/20 hover:border-accent transition-all group">
              <div className="h-14 w-14 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-6 group-hover:rotate-0 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-accent-foreground">Authentic Only</h3>
              <p className="text-muted-foreground font-medium">Every card is hand-checked for authenticity. Trade with confidence at Stall #42.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}