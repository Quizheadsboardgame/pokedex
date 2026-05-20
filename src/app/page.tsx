import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col font-body bg-background text-foreground">
      <Hero />
      
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">More than just a market stall</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Discover why collectors from all over Suffolk visit our boutique record exchange every week.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/browse" className="p-8 bg-secondary/40 rounded-xl hover:bg-secondary/60 transition-colors border border-white/5">
                <h3 className="font-bold text-xl text-primary mb-2">The Bins</h3>
                <p className="text-sm opacity-70 italic">Curated crates of gold.</p>
              </Link>
              <Link href="/story-lab" className="p-8 bg-secondary/40 rounded-xl hover:bg-secondary/60 transition-colors border border-white/5">
                <h3 className="font-bold text-xl text-primary mb-2">Story Lab</h3>
                <p className="text-sm opacity-70 italic">AI album insights.</p>
              </Link>
              <Link href="/visit" className="p-8 bg-secondary/40 rounded-xl hover:bg-secondary/60 transition-colors border border-white/5">
                <h3 className="font-bold text-xl text-primary mb-2">Visit Us</h3>
                <p className="text-sm opacity-70 italic">Stall #42, Bury Market.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
