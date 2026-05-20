import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Zap, Waves, Flame, Shield, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CRATES = [
  {
    title: "10p Bulk Boxes",
    category: "Budget",
    count: "Thousands Available",
    price: "10p / 50p Holos",
    image: "https://picsum.photos/seed/bulk-cards/400/400",
    description: "Our legendary bulk bins. Common & Uncommon cards are just 10p. Shiny Holos and Reverse Holos are 50p each."
  },
  {
    title: "The £5 Bulk Bag",
    category: "Best Value",
    count: "60 Card Capacity",
    price: "£5 per bag",
    image: "https://picsum.photos/seed/bulk-bag/400/400",
    description: "Fill a bag with up to 60 bulk cards for a fiver. Perfect for building a deck or starting a collection."
  },
  {
    title: "Collection Binders",
    category: "Mid-Range",
    count: "5-10 Binders",
    price: "£1 - £5 Singles",
    image: "https://picsum.photos/seed/vintage-binder/400/400",
    description: "Flip through our curated binders featuring everything from classic starters to modern favorites."
  },
  {
    title: "Elite Display Cases",
    category: "High-End",
    count: "6 Fixed Cases",
    price: "£5 and Above",
    image: "https://picsum.photos/seed/modern-fullart/400/400",
    description: "Reserved for the best of the best. Around 300 premium singles including vintage holos and secret rares."
  }
];

export default function BrowsePage() {
  return (
    <div className="bg-background min-h-screen py-20">
      <section className="container px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-white font-black uppercase italic">The Market Setup</Badge>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter">Dig Through the Crates</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 font-medium">
            Our red and yellow gazebo is packed with over 10,000 cards. Here's how we organize our tables every week.
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
                    <div className="flex items-center gap-1 text-primary">
                      <Tag size={20} className="fill-current" />
                      <span className="font-black italic">{crate.price}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-medium mb-6">{crate.description}</p>
                  <div className="p-3 bg-muted rounded-xl text-xs font-bold uppercase tracking-widest text-primary flex justify-between items-center">
                    <span>Stock: {crate.count}</span>
                    <Star className="text-accent fill-accent h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-12 bg-secondary rounded-[3rem] text-white text-center border-b-8 border-black/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase italic mb-4 tracking-tighter flex items-center justify-center gap-3">
              <ShoppingBag className="h-8 w-8 text-accent" />
              The Saturday Spot
            </h3>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8 font-medium">
              Catch us outside Timpsons every Saturday for the full gazebo setup. Dig through all 6 cases and our 10p bulk bins!
            </p>
            <Link href="/visit">
              <Button size="lg" className="bg-accent text-accent-foreground font-black uppercase italic rounded-full px-12 h-14 hover:bg-accent/80 border-b-4 border-black/20">
                Get Directions
              </Button>
            </Link>
          </div>
          <Zap className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64 rotate-12" />
        </div>
      </section>
    </div>
  );
}
