import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic2, Music, Zap, Flame } from "lucide-react";
import { generateVinylCategoryDescription } from "@/ai/flows/vinyl-category-descriptions-flow";

async function ShowcaseItem({ category, icon: Icon, image }: { category: string, icon: any, image: string }) {
  let description = "A timeless journey through sound. Discover the records that shaped generations.";
  
  try {
    const result = await generateVinylCategoryDescription({ category });
    if (result && result.description) {
      description = result.description;
    }
  } catch (error) {
    console.error(`Failed to generate description for ${category}:`, error);
  }
  
  return (
    <Card className="overflow-hidden group hover:shadow-[0_0_40px_rgba(255,191,0,0.1)] transition-all duration-500 border-none bg-secondary/30">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="p-3 bg-primary rounded-full text-black">
            <Icon size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tighter">{category}</h3>
        </div>
      </div>
      <CardContent className="p-8">
        <p className="text-muted-foreground leading-relaxed italic">
          "{description}"
        </p>
        <div className="mt-6 flex items-center text-xs font-bold text-primary uppercase tracking-widest gap-2">
          <span>View Archive</span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MusicShowcase() {
  return (
    <section id="showcase" className="py-32 container px-4">
      <div className="flex flex-col items-center mb-20 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-bold px-4 py-1">THE LIBRARY</Badge>
        <h2 className="text-5xl font-bold mb-6 text-white tracking-tighter">Sonic Eras</h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          From early acoustic jazz to the synthesizers of the 80s, our archives span the history of recorded sound.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ShowcaseItem 
          category="Hard Bop & Jazz" 
          icon={Mic2} 
          image="https://picsum.photos/seed/jazz-showcase/800/600"
        />
        <ShowcaseItem 
          category="Psychedelic Rock" 
          icon={Zap} 
          image="https://picsum.photos/seed/psych-rock/800/600"
        />
        <ShowcaseItem 
          category="Roots & Reggae" 
          icon={Flame} 
          image="https://picsum.photos/seed/reggae/800/600"
        />
        <ShowcaseItem 
          category="Indie & Alternative" 
          icon={Music} 
          image="https://picsum.photos/seed/indie/800/600"
        />
      </div>
    </section>
  );
}