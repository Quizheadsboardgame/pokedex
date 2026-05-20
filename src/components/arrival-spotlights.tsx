
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Calendar } from "lucide-react";
import Image from "next/image";

const SPOTLIGHTS = [
  {
    title: "Vivid Voltage Pikachu VMAX",
    type: "New Arrival",
    price: "£185",
    image: "https://picsum.photos/seed/pika-spot/400/400",
    description: "Mint condition, freshly pulled from a local collection."
  },
  {
    title: "Base Set Shadowless Mewtwo",
    type: "Classic Gem",
    price: "£240",
    image: "https://picsum.photos/seed/mew-spot/400/400",
    description: "A piece of history from the original 1999 set."
  },
  {
    title: "10p Bulk Box Reloaded",
    type: "Deal",
    price: "10p each",
    image: "https://picsum.photos/seed/bulk-spot/400/400",
    description: "Over 5,000 cards added for younger collectors this week!"
  }
];

export function ArrivalSpotlights() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <TrendingUp size={18} />
              <span>MARKET UPDATES</span>
            </div>
            <h2 className="text-3xl font-headline font-bold">Newton's Hot Picks</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Updated weekly! See what's newly arrived at our stall in Bury St Edmunds before they're gone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPOTLIGHTS.map((item, idx) => (
            <Card key={idx} className="border-none shadow-xl glass-card overflow-hidden">
              <div className="relative h-48">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{item.type}</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex items-center text-primary font-bold text-xl">
                  {item.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
