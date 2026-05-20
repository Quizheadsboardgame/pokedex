import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedBins } from "@/components/featured-bins";
import { MusicShowcase } from "@/components/music-showcase";
import { StoryLab } from "@/components/story-lab";
import { VisitStall } from "@/components/visit-stall";
import { Badge } from "@/components/ui/badge";
import { Music2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedBins />
        <MusicShowcase />
        
        <section id="about" className="py-24 bg-secondary text-foreground overflow-hidden relative">
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary text-primary-foreground font-bold">OUR ROOTS</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">The Analog Heart of Bury St Edmunds</h2>
              <p className="text-xl opacity-80 leading-relaxed mb-6">
                Newton's Vintage Vinyls began as a single crate of rare jazz. Today, we stand in the Bury St Edmunds market 
                as a sanctuary for those who value the crackle, the warmth, and the art of the LP.
              </p>
              <p className="text-xl opacity-80 leading-relaxed">
                Whether you're hunting for a first-press Pink Floyd or a budget-friendly soul classic, 
                every record here has a story. We're here to help you find yours.
              </p>
            </div>
          </div>
        </section>

        <StoryLab />
        <VisitStall />
      </main>

      <footer className="bg-black py-16 border-t border-primary/20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                <Music2 className="text-black" />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-primary">
                NEWTON'S VINYLS
              </span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium opacity-60">
              <a href="#showcase" className="hover:text-primary transition-colors">The Bins</a>
              <a href="#story" className="hover:text-primary transition-colors">Story Lab</a>
              <a href="#about" className="hover:text-primary transition-colors">Our Roots</a>
              <a href="#visit" className="hover:text-primary transition-colors">Find Us</a>
            </nav>
          </div>
          <div className="text-center text-xs opacity-40">
            <p>© 2024 Newton's Vintage Vinyls. Curating the sound of Bury St Edmunds.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}