
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight, Search, BookOpen } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PokeScanner } from "@/components/poke-scanner";

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-50">
      {/* Hero Section - The Main Pokedex Screen */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="container px-4">
          <div className="pokedex-frame p-8 md:p-12">
            {/* Top Pokedex Decoration */}
            <div className="flex items-center gap-6 mb-12 pb-8 border-b-4 border-primary/10">
              <div className="pokedex-camera" />
              <div className="flex gap-3">
                <div className="pokedex-button bg-red-500" />
                <div className="pokedex-button bg-yellow-400" />
                <div className="pokedex-button bg-green-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-accent text-accent-foreground font-black uppercase italic px-4 py-1 border-2 border-primary">
                  STALL #42 READY
                </Badge>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground uppercase italic">
                  CATCH THE <br /> <span className="text-primary">COLLECTABLES</span>
                </h1>
                
                <div className="pokedex-screen pokedex-screen-glass p-6">
                  <p className="text-lg md:text-xl text-white font-medium italic leading-relaxed">
                    "From 10p bulk bins for the little legends to graded vintage grails. Find us every Wednesday & Saturday at Bury Market."
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
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

              <div className="relative">
                <div className="pokedex-screen p-2 aspect-square md:aspect-[4/3] rotate-1">
                  <PokeScanner aspectRatio="auto" className="w-full h-full rounded-lg" />
                </div>
                {/* Hardware Decoration */}
                <div className="absolute -bottom-6 -left-6 hidden md:block">
                  <div className="relative w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-6 bg-slate-700 rounded-sm absolute" />
                    <div className="w-6 h-16 bg-slate-700 rounded-sm absolute" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white border-y-8 border-slate-100">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border-4 border-slate-200 rounded-[2rem] hover:border-primary transition-all group bg-slate-50">
              <div className="h-16 w-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-primary">Market Grails</h3>
              <p className="text-muted-foreground font-medium">Rotating stock of vintage holos and Japanese imports. Freshly picked every week from our gazebo cases.</p>
            </div>
            
            <div className="p-8 border-4 border-slate-200 rounded-[2rem] hover:border-secondary transition-all group bg-slate-50">
              <div className="h-16 w-16 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-secondary">The Hunt</h3>
              <p className="text-muted-foreground font-medium">Dig through 10,000+ bulk cards. 10p bins for commons, or fill a whole bag of 60 for just a fiver.</p>
            </div>
            
            <div className="p-8 border-4 border-slate-200 rounded-[2rem] hover:border-accent transition-all group bg-slate-50">
              <div className="h-16 w-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-6 group-hover:rotate-0 transition-transform">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-accent-foreground">Trainer Lore</h3>
              <p className="text-muted-foreground font-medium">Use our digital lab to decode history. Every card has a story, from base set to the latest modern hits.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
