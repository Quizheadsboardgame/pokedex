
"use client";

import { useState } from "react";
import { MapPin, Instagram, Mail, Phone, Globe, Rotate3d } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessCardPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4 gap-8">
      {/* 3D Card Container */}
      <div 
        className="group perspective-2000 w-full max-w-[1050px] aspect-[1.75/1] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(
          "relative w-full h-full transition-all duration-1000 preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}>
          
          {/* FRONT FACE */}
          <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border-[16px] border-[#e74c3c]">
            {/* Decorative Graphic Background */}
            <div className="absolute top-0 right-0 w-2/5 h-full bg-[#e74c3c] skew-x-[-15deg] translate-x-1/4 z-0 shadow-[-20px_0_40px_rgba(0,0,0,0.2)]" />
            <div className="absolute bottom-0 left-0 w-1/4 h-8 bg-accent z-0" />

            <div className="relative z-10 h-full p-12 md:p-20 flex flex-col justify-between">
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

              <div className="flex justify-between items-end">
                <p className="text-4xl md:text-6xl font-black text-[#1a1a1a] uppercase italic leading-none">
                  Local & <span className="text-[#e74c3c]">Family Run</span>
                </p>
                <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                  <Rotate3d size={16} /> Tap to Flip
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-20" />
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border-[16px] border-[#2d3436]">
            {/* Pokedex Red Accents */}
            <div className="absolute top-0 left-0 w-full h-4 bg-[#e74c3c]" />
            <div className="absolute bottom-0 left-0 w-full h-4 bg-[#e74c3c]" />
            <div className="absolute top-0 left-0 w-1/3 h-full bg-[#e74c3c]/5 skew-x-[15deg] -translate-x-1/4" />

            <div className="relative z-10 h-full p-12 md:p-20 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="text-accent font-black uppercase tracking-[0.4em] digital-text text-xl">CONTACT REGISTRY</div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-[#e74c3c] rounded-2xl text-white">
                        <MapPin size={40} />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-black uppercase tracking-widest text-[#e74c3c]">Find Us</p>
                        <p className="text-3xl md:text-5xl font-black uppercase italic">Market Square, IP33 1BT</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-[#e74c3c] rounded-2xl text-white">
                        <Instagram size={40} />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-black uppercase tracking-widest text-[#e74c3c]">Socials</p>
                        <p className="text-3xl md:text-5xl font-black uppercase italic">@newtons_collectables</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#e74c3c]/10 p-6 rounded-[2.5rem] border-4 border-[#e74c3c]/20">
                   <div className="text-center">
                     <div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">WED</div>
                     <div className="text-accent font-black text-4xl italic">&</div>
                     <div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">SAT</div>
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-end border-t-8 border-white/5 pt-8">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-white">
                    <Mail size={32} className="text-accent" />
                    <span className="text-xl md:text-3xl font-black italic">Hello@tradeintcg.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <Globe size={32} className="text-[#e74c3c]" />
                    <span className="text-xl md:text-3xl font-black italic">tradeintcg.com</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl md:text-6xl font-black text-accent uppercase italic leading-none">ELITE TRAINER</p>
                  <p className="text-white/40 font-black uppercase tracking-[0.5em] digital-text text-xs mt-2">ACCESS GRANTED</p>
                </div>
              </div>
            </div>
            {/* Digital Grid Overlay */}
            <div className="absolute inset-0 digital-grid opacity-10 pointer-events-none" />
          </div>

        </div>
      </div>
      
      {/* Instructions */}
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-8">
          <div className="text-white/40 text-sm font-black uppercase tracking-[0.4em] digital-text flex items-center gap-2">
            <Rotate3d size={16} /> Tap Card to Spin
          </div>
          <div className="text-white/40 text-sm font-black uppercase tracking-[0.4em] digital-text">
            Capture Front & Back
          </div>
        </div>
        <p className="text-[#e74c3c] text-xs font-black uppercase italic tracking-widest bg-[#e74c3c]/10 py-2 px-6 rounded-full inline-block border border-[#e74c3c]/20">
          High Resolution Asset Creator Mode
        </p>
      </div>
    </div>
  );
}
