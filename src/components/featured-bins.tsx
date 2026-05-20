import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Music, Headphones } from "lucide-react";
import Image from "next/image";

const ITEMS = [
  {
    title: "Blue Note Jazz Selection",
    type: "Rare Finds",
    price: "From £45",
    image: "https://picsum.photos/seed/jazz-bin/400/400",
    description: "Mint condition 1960s pressings from the legends of jazz."
  },
  {
    title: "Classic Rock Grails",
    type: "Limited",
    price: "£120",
    image: "https://picsum.photos/seed/rock-bin/400/400",
    description: "Original UK first pressings of 70s rock masterpieces."
  },
  {
    title: "The £5 Bargain Bin",
    type: "Treasure Hunt",
    price: "£5 each",
    image: "https://picsum.photos/seed/bargain-bin/400/400",
    description: "Hidden gems waiting for a second life. Fresh stock weekly!"
  }
];

export function FeaturedBins() {
  return (
    <section className="py-24 bg-black/40">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-4 tracking-tighter uppercase">
              <Headphones size={20} />
              <span>SHOP THE CRATES</span>
            </div>
            <h2 className="text-4xl font-bold text-white">Featured This Week</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Our collection is rotated every Wednesday. Visit us early at the Bury market for the best picks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ITEMS.map((item, idx) => (
            <Card key={idx} className="border-none shadow-2xl glass-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <Badge className="absolute top-4 right-4 bg-primary text-black font-bold">{item.type}</Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                <div className="text-primary font-bold text-xl">
                  {item.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}