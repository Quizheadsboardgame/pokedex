
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b-[6px] border-black/10 shadow-lg">
      <div className="container flex h-24 items-center px-4">
        {/* Navigation Dropdown - Far Left */}
        <div className="flex-none">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="font-black uppercase italic border-4 border-black/20 text-primary bg-white hover:bg-slate-100 rounded-2xl h-14 px-4 sm:px-8 shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-none transition-all flex gap-3 text-lg"
              >
                <Menu className="h-6 w-6" />
                <span className="hidden sm:inline">Explore</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-64 bg-slate-50 border-[6px] border-primary rounded-[2.5rem] shadow-2xl p-4 mt-2 overflow-hidden animate-in fade-in zoom-in duration-200"
            >
              <DropdownMenuItem asChild className="rounded-2xl focus:bg-primary/10 cursor-pointer mb-2 outline-none p-0 overflow-hidden">
                <Link href="/" className="w-full font-black uppercase italic p-4 text-xl text-primary block hover:bg-primary/5">
                  Find Stall
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-2xl focus:bg-primary/10 cursor-pointer mb-2 outline-none p-0 overflow-hidden">
                <Link href="/browse" className="w-full font-black uppercase italic p-4 text-xl text-primary block hover:bg-primary/5">
                  Trade In Cards
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logo Section - Centered and Full Length */}
        <div className="flex-1 flex items-center justify-center overflow-hidden ml-4">
          <Link href="/" className="flex items-center group w-full max-w-md justify-center">
            <img 
              src="https://i.ibb.co/p6kVgS58/Untitled.png" 
              alt="Newton's Collectables Logo" 
              className="h-16 md:h-20 w-auto max-w-full object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Balance spacer for desktop to keep logo perfectly centered */}
        <div className="hidden sm:block flex-none w-[70px] md:w-[136px]" />
      </div>
    </header>
  );
}
