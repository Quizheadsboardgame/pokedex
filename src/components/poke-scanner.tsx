
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

interface PokeScannerProps {
  className?: string;
  interval?: number;
  aspectRatio?: "square" | "video" | "auto";
}

export function PokeScanner({ className, interval = 3000, aspectRatio = "square" }: PokeScannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PlaceHolderImages.length);
        setIsFlashing(false);
      }, 150); // Sharp flash effect
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  if (PlaceHolderImages.length === 0) return null;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg bg-black group",
      aspectRatio === "square" && "aspect-square",
      aspectRatio === "video" && "aspect-video",
      className
    )}>
      {/* Visual Content Layer */}
      <div className={cn(
        "relative w-full h-full transition-opacity duration-300",
        isFlashing ? "opacity-30" : "opacity-100"
      )}>
        <Image
          src={PlaceHolderImages[currentIndex].imageUrl}
          alt={PlaceHolderImages[currentIndex].description}
          fill
          className="object-cover"
        />
        
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
        
        {/* Animated Scan Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-[scan_3s_linear_infinite]" />
      </div>

      {/* Flash Effect Layer */}
      <div className={cn(
        "absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 z-10",
        isFlashing ? "opacity-80" : "opacity-0"
      )} />

      {/* UI Elements */}
      <div className="absolute top-2 left-2 flex gap-1 z-20">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
      </div>
      
      <div className="absolute bottom-2 right-2 flex flex-col items-end z-20">
        <div className="text-[8px] font-mono text-white/70 leading-none drop-shadow-md">ID: {PlaceHolderImages[currentIndex].id.toUpperCase()}</div>
        <div className="text-[8px] font-mono text-primary font-bold leading-none animate-pulse">LIVE FEED...</div>
      </div>
    </div>
  );
}
