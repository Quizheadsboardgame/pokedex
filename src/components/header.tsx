"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="w-full z-50 py-6">
      <div className="container px-4 flex justify-center items-center">
        <Link href="/" className="w-full flex justify-center">
          <img 
            src="https://i.ibb.co/p6kVgS58/Untitled.png" 
            alt="Newton's Collectables Logo" 
            className="w-full max-w-4xl h-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
