import FadeInSection from "./FadeInSection";

export default function SocialProofSection() {
  // Placeholder testimonials - will be replaced with database content later
  const testimonials = [
    {
      quote:
        "AEstruct's tools have transformed our production workflow. What used to take hours now takes minutes.",
      author: "Production Manager",
      company: "Major Studio",
      role: "Post-Production",
    },
    {
      quote:
        "The ROI was immediate. We recovered our investment in the first month through time savings alone.",
      author: "Line Producer",
      company: "Independent Production Company",
      role: "Film Production",
    },
    {
      quote:
        "Finally, AI tools that actually understand production needs. Not just generic automation.",
      author: "Operations Director",
      company: "Streaming Platform",
      role: "Content Operations",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100" aria-label="Client testimonials">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Trusted by Industry Professionals
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            See what production teams are saying about AEstruct
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-accent h-full flex flex-col">
                <div className="text-accent text-4xl mb-4" aria-hidden="true">
                  &ldquo;
                </div>
                <p className="text-gray-700 mb-6 flex-grow leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Client testimonials and case studies coming soon
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
