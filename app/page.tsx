import HeroSection from "@/components/home/HeroSection";
import SuccessMetricsSection from "@/components/home/SuccessMetricsSection";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <SuccessMetricsSection />
      <ValuePropositionSection />
      <SocialProofSection />
      <FinalCTASection />
    </main>
  );
}
