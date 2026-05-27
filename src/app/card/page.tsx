
"use client";

import { MapPin, Instagram, Mail, Phone, Globe } from "lucide-react";

export default function BusinessCardPage() {
  return (
    <div className="min-h-screen w-full bg-[#121212] flex items-center justify-center p-4">
      {/* High-Resolution Business Card */}
      <div className="w-full max-w-[1050px] aspect-[1.75/1] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative border-[16px] border-[#e74c3c] group animate-in zoom-in-95 duration-1000">
        
        {/* Decorative Graphic Background */}
        <div className="absolute top-0 right-0 w-2/5 h-full bg-[#e74c3c] skew-x-[-15deg] translate-x-1/4 z-0 shadow-[-20px_0_40px_rgba(0,0,0,0.2)]" />
        <div className="absolute bottom-0 left-0 w-1/4 h-8 bg-accent z-0" />

        <div className="relative z-10 h-full p-12 md:p-20 flex flex-col justify-between">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-9xl font-black uppercase italic text-[#1a1a1a] leading-none tracking-tighter">
                Newton's
              </h1>
              <h2 className="text-5xl md:text-[5.5rem] font-black uppercase italic text-[#e74c3c] leading-none tracking-tighter">
                Collectables
              </h2>
              <div className="h-4 w-64 bg-accent mt-6 shadow-sm" />
              <p className="text-xl md:text-3xl font-black text-[#1a1a1a] uppercase italic mt-4 tracking-tight">
                Bury St Edmunds Market Stall
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-[#e74c3c]/10">
                <img 
                  src="https://i.ibb.co/20z0HgH3/Untitled-12-February-2026-at-13-11-20-1.png" 
                  alt="Newton's Collectables Logo" 
                  className="h-28 md:h-48 object-contain"
                />
              </div>
              <p className="mt-4 text-[10px] md:text-sm font-black text-white uppercase tracking-[0.5em] digital-text z-20">EST. 2023</p>
            </div>
          </div>

          {/* Footer / Contact Section */}
          <div className="flex justify-between items-end">
            <div className="space-y-6 md:space-y-10">
              <div className="flex items-center gap-5 text-[#1a1a1a]">
                <div className="p-3 bg-[#e74c3c]/10 rounded-2xl">
                  <MapPin size={40} className="text-[#e74c3c]" />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-black text-[#e74c3c] uppercase tracking-widest">Find Us</p>
                  <p className="text-2xl md:text-4xl font-black uppercase italic">Market Square, IP33 1BT</p>
                </div>
              </div>
              
              <div className="flex items-center gap-12 pt-2">
                <div className="flex items-center gap-4 text-[#1a1a1a]">
                  <Instagram size={36} className="text-[#e74c3c]" />
                  <span className="text-xl md:text-3xl font-black italic">@newtons_collectables</span>
                </div>
                <div className="flex items-center gap-4 text-[#1a1a1a]">
                  <Mail size={36} className="text-[#e74c3c]" />
                  <span className="text-xl md:text-3xl font-black italic">Hello@tradeintcg.com</span>
                </div>
              </div>
            </div>

            <div className="text-right pb-2">
              <div className="flex items-center justify-end gap-3 text-[#e74c3c] mb-2">
                <Globe size={24} />
                <span className="text-sm md:text-lg font-black uppercase tracking-widest digital-text">www.tradeintcg.com</span>
              </div>
              <p className="text-3xl md:text-5xl font-black text-[#1a1a1a] uppercase italic leading-none">Local & Family Run</p>
            </div>
          </div>
        </div>

        {/* Glossy Overlay for that "Premium Card" look */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-20" />
      </div>
      
      {/* Screenshot Instructions */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center space-y-2">
        <p className="text-white/40 text-sm font-black uppercase tracking-[0.4em] digital-text">Press CMD+SHIFT+4 or WIN+SHIFT+S to Capture Card</p>
        <p className="text-[#e74c3c] text-xs font-black uppercase italic tracking-widest">High Resolution Design Mode Active</p>
      </div>
    </div>
  );
}
