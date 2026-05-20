
export function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.ibb.co/cSGJN4Cm/IMG-2551.png" 
              alt="Newton's Collectables" 
              className="h-14 w-auto"
            />
            <span className="text-xl font-black italic uppercase">Newton's Collectables</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase italic">
            <a href="/browse" className="hover:text-accent transition-colors">Trade In Cards</a>
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
