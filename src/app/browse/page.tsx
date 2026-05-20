import { FeaturedBins } from "@/components/featured-bins";
import { MusicShowcase } from "@/components/music-showcase";

export default function BrowsePage() {
  return (
    <div className="bg-background pt-10">
      <FeaturedBins />
      <MusicShowcase />
    </div>
  );
}
