import { Zap } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
              <Zap className="text-accent" size={20} />
            </div>
            <img 
              src="https://i.ibb.co/cSGJN4Cm/IMG-2551.png" 
              alt="Newton's Collectables" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase">
            <a href="/browse" className="hover:text-accent transition-colors">The Bins</a>
            <a href="/story-lab" className="hover:text-accent transition-colors">Lore Lab</a>
            <a href="/roots" className="hover:text-accent transition-colors">Roots</a>
            <a href="/visit" className="hover:text-accent transition-colors">Visit</a>
          </nav>
        </div>
        <div className="text-center text-xs opacity-60">
          <p>© 2024 Newton's Collectables. Locally trading at Bury St Edmunds Market. Not affiliated with Nintendo or TPC.</p>
        </div>
      </div>
    </footer>
  );
}
