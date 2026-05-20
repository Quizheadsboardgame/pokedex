
"use client";

import Link from "next/link";
import { Search, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PokedexHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 bg-primary rounded-full border-2 border-white shadow-sm overflow-hidden">
            <Zap className="text-accent h-6 w-6" />
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline font-bold text-xl tracking-tight text-primary">
              NEWTON'S <span className="text-accent-foreground">RAREFINDS</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#showcase" className="text-sm font-medium hover:text-primary transition-colors">Showcase</Link>
          <Link href="#generator" className="text-sm font-medium hover:text-primary transition-colors">Lore Lab</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Our Story</Link>
          <Link href="#visit" className="text-sm font-medium hover:text-primary transition-colors">Visit Us</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-bold">
            Find Us
          </Button>
        </div>
      </div>
    </header>
  );
}
