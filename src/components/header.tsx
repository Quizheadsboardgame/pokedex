"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-20 items-center px-4">
        {/* Logo Section - Maximized width */}
        <div className="flex-1 flex items-center justify-center md:justify-start overflow-hidden">
          <Link href="/" className="flex items-center group w-full">
            <img 
              src="https://i.ibb.co/p6kVgS58/Untitled.png" 
              alt="Newton's Rarefinds Logo" 
              className="h-14 md:h-16 w-auto max-w-full object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Navigation Dropdown - Positioned to sit 'over' the logo area on the right */}
        <div className="absolute right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="font-black uppercase italic border-4 border-primary text-primary bg-background/80 backdrop-blur hover:bg-primary/10 rounded-2xl h-12 px-6 shadow-[0_4px_0_0_rgba(180,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all"
              >
                Explore
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white border-4 border-primary rounded-[2rem] shadow-2xl p-3 mt-2 overflow-hidden animate-in fade-in zoom-in duration-200"
            >
              <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 cursor-pointer mb-1 outline-none">
                <Link href="/browse" className="w-full font-black uppercase italic p-3 text-lg text-primary block">
                  Crates
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 cursor-pointer mb-1 outline-none">
                <Link href="/story-lab" className="w-full font-black uppercase italic p-3 text-lg text-primary block">
                  Lore Lab
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 cursor-pointer mb-1 outline-none">
                <Link href="/roots" className="w-full font-black uppercase italic p-3 text-lg text-primary block">
                  Our Story
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 cursor-pointer outline-none">
                <Link href="/visit" className="w-full font-black uppercase italic p-3 text-lg text-primary block border-t-2 border-primary/10 pt-4 mt-2">
                  Find Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
