import FadeInSection from "@/components/home/FadeInSection";

export default function TimelineSection() {
  const timeline = [
    {
      era: "1990s",
      title: "Analog to Digital",
      description:
        "Witnessed and contributed to the fundamental shift from analog tape-based workflows to digital production and post-production systems.",
      icon: "📼",
    },
    {
      era: "2000s",
      title: "On-Premise to Cloud",
      description:
        "Led cloud migration initiatives, moving production infrastructure from physical servers to scalable cloud platforms, revolutionizing collaboration.",
      icon: "☁️",
    },
    {
      era: "2010s",
      title: "Streaming Revolution",
      description:
        "Adapted production workflows for the streaming era, optimizing processes for rapid content delivery and global distribution.",
      icon: "📺",
    },
    {
      era: "2020s",
      title: "AI Transformation",
      description:
        "Now pioneering practical AI applications for back-office operations, bringing 30 years of production expertise to the latest technological revolution.",
      icon: "🤖",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            30-Year Industry Journey
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            Three decades of transformation expertise across every major
            technological shift in media and entertainment
          </p>
        </FadeInSection>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <FadeInSection key={index} delay={index * 150}>
                  <div
                    className={`flex flex-col md:flex-row gap-8 items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:text-right md:pr-12">
                      {index % 2 === 0 ? (
                        <div className="md:text-right">
                          <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                            {item.era}
                          </span>
                          <h3 className="text-2xl font-bold text-primary mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ) : (
                        <div className="md:hidden">
                          <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                            {item.era}
                          </span>
                          <h3 className="text-2xl font-bold text-primary mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 z-10">
                      <div className="w-20 h-20 bg-white border-4 border-accent rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl" role="img" aria-label={item.title}>
                          {item.icon}
                        </span>
                      </div>
                    </div>

                    {/* Content (right side for odd items on desktop) */}
                    <div className="flex-1 md:pl-12">
                      {index % 2 !== 0 && (
                        <div className="hidden md:block md:text-left">
                          <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                            {item.era}
                          </span>
                          <h3 className="text-2xl font-bold text-primary mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
