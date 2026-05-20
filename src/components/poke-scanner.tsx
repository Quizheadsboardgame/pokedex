
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

  // Filter out the logo if we want purely collection images for scanning
  const scannerImages = PlaceHolderImages.filter(img => img.id !== "stall-logo");

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % scannerImages.length);
        setIsFlashing(false);
      }, 150); // Fast flash effect
    }, interval);

    return () => clearInterval(timer);
  }, [scannerImages.length, interval]);

  if (scannerImages.length === 0) return null;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg bg-black group",
      aspectRatio === "square" && "aspect-square",
      aspectRatio === "video" && "aspect-video",
      className
    )}>
      <div className={cn(
        "relative w-full h-full transition-opacity duration-300",
        isFlashing ? "opacity-0" : "opacity-100"
      )}>
        <Image
          src={scannerImages[currentIndex].imageUrl}
          alt={scannerImages[currentIndex].description}
          fill
          className="object-cover"
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        {/* Moving Scanner Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-[scan_3s_linear_infinite]" />
      </div>

      {/* Flash overlay */}
      <div className={cn(
        "absolute inset-0 bg-white pointer-events-none transition-opacity duration-150",
        isFlashing ? "opacity-100" : "opacity-0"
      )} />

      {/* Corner Data Decorations */}
      <div className="absolute top-2 left-2 flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
      </div>
      <div className="absolute bottom-2 right-2 flex flex-col items-end">
        <div className="text-[8px] font-mono text-white/50 leading-none">ID: {scannerImages[currentIndex].id.toUpperCase()}</div>
        <div className="text-[8px] font-mono text-primary leading-none">LIVE FEED...</div>
      </div>
    </div>
  );
}

// Add keyframes to globals.css or handle via style tag
