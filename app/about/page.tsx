import AboutHeroSection from "@/components/about/HeroSection";
import BioSection from "@/components/about/BioSection";
import TimelineSection from "@/components/about/TimelineSection";
import DifferentiatorsSection from "@/components/about/DifferentiatorsSection";
import TargetMarketSection from "@/components/about/TargetMarketSection";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHeroSection />
      <BioSection />
      <TimelineSection />
      <DifferentiatorsSection />
      <TargetMarketSection />
    </main>
  );
}
