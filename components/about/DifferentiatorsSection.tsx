import FadeInSection from "@/components/home/FadeInSection";

export default function DifferentiatorsSection() {
  const differentiators = [
    {
      title: "Industry-Specific, Not Generic",
      description:
        "Built for M&E workflows, not adapted from generic business AI. Every tool addresses real production challenges.",
      icon: "🎯",
    },
    {
      title: "Back-Office Focus",
      description:
        "We automate administrative tasks—script breakdowns, rights clearance, budgeting—not creative content generation.",
      icon: "📋",
    },
    {
      title: "Proven ROI",
      description:
        "800-1500% return on investment with 20-40% time savings on administrative work. Results from day one.",
      icon: "💰",
    },
    {
      title: "Small Team Expertise",
      description:
        "Purpose-built for small to mid-sized production companies with limited HR resources and tight budgets.",
      icon: "👥",
    },
    {
      title: "30 Years Experience",
      description:
        "Deep understanding of production workflows gained through three decades of industry transformation.",
      icon: "⭐",
    },
    {
      title: "Production-Ready Tools",
      description:
        "No pilots or experiments. Seven fully functional Claude Skills ready to deploy immediately.",
      icon: "✅",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Why AEstruct vs. Generic AI Tools?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            We're not another AI consulting firm. We're production professionals
            who build AI tools.
          </p>
        </FadeInSection>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full">
                <div className="text-5xl mb-4" role="img" aria-label={item.title}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
