import { Button } from "@/components/ui/button";
import { Disc, ChevronRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-52">
      <div className="container px-4 relative z-10 text-center md:text-left">
        <div className="max-w-3xl space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase border border-primary/20">
            <Disc size={16} className="record-spin" />
            Analog Excellence in Bury St Edmunds
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
            Fine Audio <br /> <span className="text-primary">Curated for Life</span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
            Rare jazz, iconic rock, and forgotten blues. Newton's Vintage Vinyls is the premiere boutique crate-digging 
            experience in the heart of the market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold h-16 px-10 text-lg rounded-full">
              Explore the Bins
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg border-2 rounded-full border-white/20 text-white hover:bg-white hover:text-black">
              Our Collection
            </Button>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Record */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
        <div className="w-full h-full relative">
          <Image 
            src="https://picsum.photos/seed/vinyl-large/800/1000" 
            alt="Vinyl Art" 
            fill 
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}