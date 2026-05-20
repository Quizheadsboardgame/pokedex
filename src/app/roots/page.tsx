import { Badge } from "@/components/ui/badge";

export default function RootsPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <section className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary text-primary-foreground font-bold">OUR ROOTS</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-primary tracking-tighter">The Analog Heart of <br /> Bury St Edmunds</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-start">
            <div className="space-y-6">
              <p className="text-xl opacity-80 leading-relaxed">
                Newton's Vintage Vinyls began as a single crate of rare jazz tucked under a kitchen table. 
                What started as a personal obsession with the warmth of the Blue Note sound soon spilled out into the historic market of Bury St Edmunds.
              </p>
              <p className="text-xl opacity-80 leading-relaxed">
                Today, we stand in the same spot where traders have gathered for centuries, but with a different kind of commerce: 
                the exchange of memories, sonic textures, and the tactile joy of the 12-inch LP.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-xl opacity-80 leading-relaxed">
                We believe music is more than just data. It's the crackle between tracks, the artwork on a gatefold sleeve, 
                and the physical history of a record that has passed through dozens of hands before reaching yours.
              </p>
              <p className="text-xl opacity-80 leading-relaxed">
                Whether you're hunting for a first-press Pink Floyd grail or a budget-friendly soul classic, 
                we're here to guide your ears to their next favorite story.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
