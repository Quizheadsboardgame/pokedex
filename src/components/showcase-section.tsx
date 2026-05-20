
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Flame, Waves } from "lucide-react";
import { generateCardShowcaseDescription } from "@/ai/flows/ai-card-showcase-descriptions-flow";

async function ShowcaseItem({ category, icon: Icon, image }: { category: string, icon: any, image: string }) {
  let description = "Explore our diverse collection of cards from this era, featuring rare finds and community favorites.";
  
  try {
    const result = await generateCardShowcaseDescription({ category });
    if (result && result.description) {
      description = result.description;
    }
  } catch (error) {
    // Gracefully handle AI generation failure (e.g., missing API key)
    console.error(`Failed to generate description for ${category}:`, error);
  }
  
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-white">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="pokemon card"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg text-white">
            <Icon size={18} />
          </div>
          <h3 className="text-xl font-bold text-white">{category}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Badge variant="secondary" className="mt-4 bg-primary/10 text-primary border-none">
          Explore Collection
        </Badge>
      </CardContent>
    </Card>
  );
}

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-24 container px-4">
      <div className="flex flex-col items-center mb-16 text-center">
        <Badge className="mb-4 bg-accent text-accent-foreground font-bold hover:bg-accent/80">THE ARCHIVE</Badge>
        <h2 className="text-4xl font-headline font-bold mb-4">Card Eras & Types</h2>
        <p className="text-muted-foreground max-w-2xl">
          From the classic 1999 Base Set to the latest modern releases, our stall in Bury St Edmunds is packed with history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ShowcaseItem 
          category="Vintage Classics" 
          icon={Shield} 
          image="https://picsum.photos/seed/vintage-card-1/600/400"
        />
        <ShowcaseItem 
          category="Rare Holos" 
          icon={Zap} 
          image="https://picsum.photos/seed/rare-holo-1/600/400"
        />
        <ShowcaseItem 
          category="Modern Full Arts" 
          icon={Flame} 
          image="https://picsum.photos/seed/modern-art-1/600/400"
        />
        <ShowcaseItem 
          category="Common Bulk" 
          icon={Waves} 
          image="https://picsum.photos/seed/bulk-cards-1/600/400"
        />
        <ShowcaseItem 
          category="Sealed Products" 
          icon={Shield} 
          image="https://picsum.photos/seed/sealed-pack-1/600/400"
        />
        <ShowcaseItem 
          category="Japanese Imports" 
          icon={Zap} 
          image="https://picsum.photos/seed/japanese-card-1/600/400"
        />
      </div>
    </section>
  );
}
