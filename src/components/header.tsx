
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="w-full z-50 py-4 relative bg-primary shadow-lg border-b-8 border-black/10">
      <div className="container px-4 flex items-center h-20 md:h-32">
        {/* Menu Button - Far Left */}
        <div className="z-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-white/20 rounded-xl border-4 border-white/30 text-white">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-50 border-r-8 border-primary">
              <SheetHeader className="mb-8 border-b-4 border-slate-200 pb-4 text-left">
                <SheetTitle className="text-3xl font-black italic uppercase text-primary">Explore</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6">
                <Link 
                  href="/" 
                  className="text-2xl font-black italic uppercase hover:text-primary transition-colors"
                >
                  Find Us
                </Link>
                <Link 
                  href="/browse" 
                  className="text-2xl font-black italic uppercase hover:text-primary transition-colors"
                >
                  Trade In Cards
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Full Width Centered */}
        <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
          <Link href="/" className="w-full max-w-5xl pointer-events-auto flex justify-center">
            <img 
              src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
              alt="Newton's Collectables Logo" 
              className="w-full h-auto max-h-16 md:max-h-28 object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
