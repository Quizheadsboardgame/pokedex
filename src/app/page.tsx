
import { PokedexHeader } from "@/components/pokedex-header";
import { HeroSection } from "@/components/hero-section";
import { ShowcaseSection } from "@/components/showcase-section";
import { ArrivalSpotlights } from "@/components/arrival-spotlights";
import { LoreGenerator } from "@/components/lore-generator";
import { LocationInfo } from "@/components/location-info";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <PokedexHeader />
      <main className="flex-1">
        <HeroSection />
        <ArrivalSpotlights />
        <ShowcaseSection />
        
        {/* Story Section */}
        <section id="about" className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-accent text-accent-foreground font-bold">OUR JOURNEY</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">Lowkey, Local, and Full of Lore</h2>
              <p className="text-xl opacity-90 leading-relaxed mb-6">
                What started as a personal collection has grown into Newton's Rarefinds. For one year, we've been standing 
                in Bury St Edmunds market, meeting collectors of all ages.
              </p>
              <p className="text-xl opacity-90 leading-relaxed">
                Whether you're looking to complete a childhood set or find a high-grade investment piece, 
                we're here to help you catch 'em all in a friendly, no-pressure environment.
              </p>
            </div>
          </div>
        </section>

        <LoreGenerator />
        <LocationInfo />
      </main>

      <footer className="bg-foreground text-background py-16">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-background/10 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                <Zap className="text-accent" />
              </div>
              <span className="font-headline font-bold text-2xl tracking-tighter">
                NEWTON'S RAREFINDS
              </span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-background/60">
              <a href="#showcase" className="hover:text-primary transition-colors">Showcase</a>
              <a href="#generator" className="hover:text-primary transition-colors">Lore Lab</a>
              <a href="#about" className="hover:text-primary transition-colors">Our Story</a>
              <a href="#visit" className="hover:text-primary transition-colors">Find Stall</a>
            </nav>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40">
            <p>© 2024 Newton's Rarefinds. All rights reserved. Not affiliated with Nintendo or The Pokémon Company.</p>
            <p>Built for the Bury St Edmunds Collecting Community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
