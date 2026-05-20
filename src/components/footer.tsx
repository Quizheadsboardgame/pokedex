import { Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-primary/20">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Music2 className="text-black" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-primary">
              NEWTON'S VINYLS
            </span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium opacity-60">
            <a href="/browse" className="hover:text-primary transition-colors">The Bins</a>
            <a href="/story-lab" className="hover:text-primary transition-colors">Story Lab</a>
            <a href="/roots" className="hover:text-primary transition-colors">Our Roots</a>
            <a href="/visit" className="hover:text-primary transition-colors">Find Us</a>
          </nav>
        </div>
        <div className="text-center text-xs opacity-40">
          <p>© 2024 Newton's Vintage Vinyls. Curating the sound of Bury St Edmunds.</p>
        </div>
      </div>
    </footer>
  );
}
