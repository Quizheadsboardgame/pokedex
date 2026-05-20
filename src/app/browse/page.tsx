import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Waves, Flame, Shield } from "lucide-react";
import Image from "next/image";

const CRATES = [
  {
    title: "The 10p Bulk Bins",
    category: "Entry Level",
    count: "10,000+ Cards",
    image: "https://picsum.photos/seed/bulk-cards/400/400",
    description: "The classic market experience. Dig for your favorites, energy, and trainers. 10p each or 15 for £1!"
  },
  {
    title: "Vintage Holo binder",
    category: "Collector",
    count: "Rare Finds",
    image: "https://picsum.photos/seed/vintage-binder/400/400",
    description: "Wizards of the Coast era classics. Base set, Jungle, Fossil, and Neo series holos in great condition."
  },
  {
    title: "Modern Full Arts",
    category: "High End",
    count: "New Arrivals",
    image: "https://picsum.photos/seed/modern-fullart/400/400",
    description: "The latest hits from Scarlet & Violet, Crown Zenith, and more. Stunning artwork and top-tier pulls."
  },
  {
    title: "Japanese Exclusives",
    category: "Import",
    count: "Unique Stock",
    image: "https://picsum.photos/seed/japan-poke/400/400",
    description: "High-quality Japanese card stock featuring exclusive artwork not released in the Western market."
  }
];

export default function BrowsePage() {
  return (
    <div className="bg-background min-h-screen py-20">
      <section className="container px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white font-black uppercase italic">The Market Crates</Badge>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter">Explore the Archive</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 font-medium">
            Visit us at Stall #42 in Bury Market to dig through these crates in person. Stock updated every Wednesday!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CRATES.map((crate, idx) => (
            <Card key={idx} className="pokedex-frame group">
              <div className="flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-48 h-48 lg:h-auto overflow-hidden">
                  <Image 
                    src={crate.image} 
                    alt={crate.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="pokedex-button bg-red-500" />
                    <div className="pokedex-button bg-yellow-400" />
                    <div className="pokedex-button bg-green-400" />
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-secondary/10 text-secondary font-bold uppercase">{crate.category}</Badge>
                      <h3 className="text-2xl font-black uppercase italic leading-none">{crate.title}</h3>
                    </div>
                    <Star className="text-accent fill-accent" size={24} />
                  </div>
                  <p className="text-muted-foreground font-medium mb-6">{crate.description}</p>
                  <div className="p-3 bg-muted rounded-xl text-xs font-bold uppercase tracking-widest text-primary">
                    Estimated Volume: {crate.count}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-12 bg-secondary rounded-[3rem] text-white text-center border-b-8 border-black/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase italic mb-4 tracking-tighter">Looking for something specific?</h3>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8 font-medium">
              We have thousands of cards in storage. If you're looking for a specific character or set to complete your collection, give us a shout!
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground font-black uppercase italic rounded-full px-12 h-14 hover:bg-accent/80">
              Message the Stall
            </Button>
          </div>
          <Zap className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64 rotate-12" />
        </div>
      </section>
    </div>
  );
}