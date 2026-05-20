
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase">
            <Zap size={14} className="fill-primary" />
            1 Year Anniversary • Local & Family Run
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight leading-[1.1]">
            Catch the Rarest <span className="text-primary italic">Singles</span> in Bury St Edmunds
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            From 10p bulk cards for the kids to graded vintage grails for the serious collector. 
            Newton's Rarefinds is your local community hub for everything Pokémon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20">
              Visit Our Stall
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 rounded-xl">
              Our Story
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full relative">
          <Image 
            src="https://picsum.photos/seed/pokedex-art/800/1000" 
            alt="Pokedex Art" 
            fill 
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
