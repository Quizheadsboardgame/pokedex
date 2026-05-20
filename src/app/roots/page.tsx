import { Badge } from "@/components/ui/badge";
import { Star, Zap } from "lucide-react";
import Image from "next/image";

export default function RootsPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <section className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-accent text-accent-foreground font-black px-6 py-2 rounded-full border-2 border-primary uppercase italic">Our Journey</Badge>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-primary leading-[0.8]">The Trainer's <br /> <span className="text-secondary">Market Origin</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="pokedex-frame p-2">
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image 
                    src="https://picsum.photos/seed/roots-poke/800/800" 
                    alt="Early days at the market" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xl font-medium leading-relaxed text-muted-foreground">
                Newton's Rarefinds didn't start with a storefront or a massive inventory. It started with a single binder of 1999 Base Set cards and a passion for the community in Bury St Edmunds.
              </p>
            </div>
            
            <div className="space-y-12 pt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <Star className="fill-current" />
                  <h3 className="text-2xl font-black uppercase italic">Born in the Market</h3>
                </div>
                <p className="text-lg leading-relaxed font-medium">
                  We believe the best way to collect is in person. Trading stories, sharing pull-day excitement, and helping a new generation of trainers start their journey at Stall #42.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Zap className="fill-current" />
                  <h3 className="text-2xl font-black uppercase italic">The 10p Legend</h3>
                </div>
                <p className="text-lg leading-relaxed font-medium">
                  Our famous 10p bulk bins are a staple of the Bury market. We ensure every kid (and big kid) can walk away with a handful of favorites without breaking the bank.
                </p>
              </div>

              <div className="p-8 bg-primary rounded-3xl text-white border-b-8 border-black/20">
                <h4 className="text-xl font-black uppercase italic mb-2">A Family Affair</h4>
                <p className="font-medium opacity-90">
                  Newton's is local, family-run, and focused on keeping the hobby friendly and accessible for everyone in Suffolk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}