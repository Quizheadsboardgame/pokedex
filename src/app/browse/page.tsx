
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ShoppingBag, Tag, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PokeScanner } from "@/components/poke-scanner";

const CRATES = [
  {
    title: "10p Bulk Boxes",
    category: "Budget",
    count: "Thousands",
    price: "10p / 50p",
    image: "https://i.ibb.co/qLXkrXW0/IMG-2587.png",
    description: "Our legendary bins. Common & Uncommon cards are just 10p. Shiny Holos and Reverse Holos are 50p each."
  },
  {
    title: "The £5 Bulk Bag",
    category: "Value",
    count: "60 Cards",
    price: "£5 Bag",
    image: "https://i.ibb.co/ksXqvXPs/IMG-2599.png",
    description: "Fill a bag with up to 60 bulk cards for a fiver. Perfect for building a deck or starting a collection."
  },
  {
    title: "Market Binders",
    category: "Mid-Range",
    count: "10 Binders",
    price: "£1 - £5",
    image: "https://i.ibb.co/gMQRfMcH/IMG-2598.png",
    description: "Flip through our curated binders featuring classics from base set to modern hits."
  },
  {
    title: "Display Grails",
    category: "High-End",
    count: "300+ Singles",
    price: "£5+",
    image: "https://i.ibb.co/nqzq2CFX/IMG-2597.png",
    description: "Reserved for the best of the best. Premium singles including vintage holos and secret rares."
  }
];

export default function BrowsePage() {
  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <section className="container px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white font-black uppercase italic border-2 border-white">The Market Vault</Badge>
          <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground">Inventory Analysis</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 font-medium italic">
            "Analyzing 10,000+ collectibles... Data retrieved for Stall #42."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CRATES.map((crate, idx) => (
            <div key={idx} className="pokedex-frame p-1">
              <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden h-full">
                <div className="relative w-full lg:w-48 h-48 lg:h-auto pokedex-screen-glass">
                  <Image 
                    src={crate.image} 
                    alt={crate.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-secondary/10 text-secondary font-bold uppercase">{crate.category}</Badge>
                      <h3 className="text-2xl font-black uppercase italic leading-none text-foreground">{crate.title}</h3>
                    </div>
                    <div className="text-primary">
                      <Tag size={20} className="fill-current" />
                    </div>
                  </div>
                  <div className="pokedex-screen p-4">
                    <p className="text-white text-sm font-medium italic digital-text opacity-90">{crate.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-black italic text-primary">{crate.price}</span>
                    <Badge className="bg-slate-800 text-white font-bold">{crate.count}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Scanner Widget */}
        <div className="mt-16 text-center">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Real-time scanner feed</p>
            <div className="max-w-md mx-auto pokedex-frame p-2">
                <PokeScanner aspectRatio="video" interval={2000} className="rounded-2xl" />
            </div>
        </div>

        <div className="mt-20 pokedex-frame p-8 md:p-12 bg-secondary text-white border-none">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-4 tracking-tighter flex items-center justify-center md:justify-start gap-3">
                <ShoppingBag className="h-8 w-8 text-accent" />
                Live Market Link
              </h3>
              <p className="text-lg opacity-90 font-medium italic">
                Catch us outside Timpsons every Saturday. Dig through all cases and our famous 10p bulk bins!
              </p>
            </div>
            <Link href="/visit">
              <Button size="lg" className="bg-accent text-accent-foreground font-black uppercase italic rounded-full px-12 h-14 hover:bg-accent/80 border-b-4 border-black/20">
                Route Map
                <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <Zap className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
        </div>
      </section>
    </div>
  );
}
