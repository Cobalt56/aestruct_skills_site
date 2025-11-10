import FadeInSection from "@/components/home/FadeInSection";

export default function BioSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Placeholder for logo/image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-xl">
                  <span className="text-6xl font-bold text-white">AE</span>
                </div>
              </div>

              {/* Bio content */}
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Emil & AEstruct Consultancy
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    AEstruct is a solo consultancy founded by Emil, bringing over
                    30 years of media and entertainment industry expertise to the
                    AI revolution. We specialize in developing practical AI tools
                    that solve real back-office challenges.
                  </p>
                  <p>
                    Unlike generic AI solutions, AEstruct focuses exclusively on
                    the unique workflows of media production companies. Our Claude
                    Skills are purpose-built for script analysis, rights
                    clearance, budget forecasting, and production management—not
                    content generation.
                  </p>
                  <p>
                    We understand the pressures facing small to mid-sized
                    production companies: limited HR resources, tight budgets, and
                    the constant demand for efficiency. Our tools deliver
                    measurable ROI, typically saving 20-40% on administrative
                    time.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
