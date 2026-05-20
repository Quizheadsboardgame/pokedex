
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, ShoppingBag, Layers, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const INVENTORY = [
  {
    title: "Display Cases",
    category: "High-End",
    count: "6 Cases / 300+ Singles",
    price: "£5+",
    image: "https://i.ibb.co/nqzq2CFX/IMG-2597.png",
    description: "Our premium selection. Mint condition singles, graded grails, and rare vintage holos protected in acrylic cases."
  },
  {
    title: "Market Binders",
    category: "Mid-Range",
    count: "10 Binders",
    price: "£1 - £5",
    image: "https://i.ibb.co/ksXqvXPs/IMG-2599.png",
    description: "Flip through curated binders filled with nostalgic classics, modern full arts, and Japanese imports."
  },
  {
    title: "The £5 Bulk Bag",
    category: "Legendary Value",
    count: "Up to 60 Cards",
    price: "£5 / Bag",
    image: "https://i.ibb.co/ksXqvXPs/IMG-2599.png",
    description: "Our best seller! Fill a whole bag with your favorites from our bulk selection. Perfect for starting a master set."
  },
  {
    title: "10p Bulk Boxes",
    category: "Budget Digging",
    count: "Thousands",
    price: "10p - 50p",
    image: "https://i.ibb.co/qLXkrXW0/IMG-2587.png",
    description: "The famous bins. Commons & Uncommons are 10p. Holos and Reverse Holos are just 50p each."
  }
];

export default function BrowsePage() {
  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <section className="container px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white font-black uppercase italic border-2 border-white">Inventory Analysis</Badge>
          <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground">The Market Vault</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 font-medium italic">
            "Scanning 10,000+ collectibles... Data retrieved for Stall #42."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {INVENTORY.map((item, idx) => (
            <div key={idx} className="pokedex-frame p-1">
              <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden h-full">
                <div className="relative w-full lg:w-56 h-56 lg:h-auto pokedex-screen-glass">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  </div>
                </div>
                <div className="flex-1 p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-secondary/10 text-secondary font-bold uppercase">{item.category}</Badge>
                      <h3 className="text-3xl font-black uppercase italic leading-none text-foreground">{item.title}</h3>
                    </div>
                    <div className="text-primary">
                      <Tag size={24} className="fill-current" />
                    </div>
                  </div>
                  
                  <div className="pokedex-screen p-5">
                    <p className="text-white text-sm font-medium italic digital-text opacity-90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Unit Price</p>
                      <span className="font-black italic text-2xl text-primary">{item.price}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">In Stock</p>
                      <Badge className="bg-slate-800 text-white font-bold px-3 py-1">{item.count}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pokedex-frame p-8 md:p-12 bg-secondary text-white border-none">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-4 tracking-tighter flex items-center justify-center md:justify-start gap-4">
                <ShoppingBag className="h-10 w-10 text-accent" />
                Ready to Trade?
              </h3>
              <p className="text-lg opacity-90 font-medium italic">
                Our gazebo is packed and ready every week. Catch us at Bury Market to dig through these bins in person!
              </p>
            </div>
            <Link href="/visit">
              <Button size="lg" className="bg-accent text-accent-foreground font-black uppercase italic rounded-full px-12 h-16 text-lg hover:bg-accent/80 border-b-6 border-black/20 transition-all">
                Stall Location
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
