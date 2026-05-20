"use client";

import Link from "next/link";
import { Menu, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 bg-primary rounded-full">
            <Disc className="text-black h-6 w-6 record-spin" />
          </div>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl tracking-tighter text-primary">
              NEWTON'S <span className="text-foreground">VINYLS</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">Browse</Link>
          <Link href="/story-lab" className="text-sm font-medium hover:text-primary transition-colors">Story Lab</Link>
          <Link href="/roots" className="text-sm font-medium hover:text-primary transition-colors">Roots</Link>
          <Link href="/visit" className="text-sm font-medium hover:text-primary transition-colors">Visit</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-black">
            Call the Shop
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
