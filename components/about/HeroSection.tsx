import FadeInSection from "@/components/home/FadeInSection";

export default function AboutHeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AEstruct
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Transforming media & entertainment back-office operations through
              practical AI solutions
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
