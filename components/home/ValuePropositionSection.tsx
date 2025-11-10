import FadeInSection from "./FadeInSection";

export default function ValuePropositionSection() {
  const valueProps = [
    {
      title: "Industry Expertise",
      description: "30 years transformation experience",
      details:
        "Deep understanding of media and entertainment workflows, challenges, and opportunities. We've been there, done that.",
      icon: "🎯",
    },
    {
      title: "Practical Solutions",
      description: "Back-office efficiency, not content generation",
      details:
        "Focus on administrative time-savers: script breakdown, call sheets, production reports, budgeting, and scheduling automation.",
      icon: "⚡",
    },
    {
      title: "Measurable Results",
      description: "ROI-focused, time-saving tools",
      details:
        "Every tool is designed to deliver quantifiable time and cost savings. See results from day one with production-ready solutions.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-label="Value proposition">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Why AEstruct?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            We understand the unique challenges of media and entertainment
            back-office operations because we've lived them.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {valueProps.map((prop, index) => (
            <FadeInSection key={index} delay={index * 150}>
              <div className="text-center group">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-4xl" role="img" aria-label={prop.title}>
                    {prop.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">
                  {prop.title}
                </h3>
                <p className="text-accent font-semibold mb-4 text-lg">
                  {prop.description}
                </p>
                <p className="text-gray-600 leading-relaxed">{prop.details}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
