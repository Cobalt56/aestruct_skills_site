import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function FinalCTASection() {
  return (
    <section
      className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeInSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 leading-relaxed">
              Join production teams saving 20-40% on administrative time.
              <br />
              Focus on what matters: great storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/tools"
                className="inline-block bg-accent hover:bg-accent-dark text-white font-bold px-10 py-5 rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl text-lg min-w-[200px] text-center"
                aria-label="Browse all tools"
              >
                Browse All Tools
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl text-lg min-w-[200px] text-center"
                aria-label="Get started with consultation"
              >
                Get Started Today
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-gray-200 mb-4">
                Questions? We're here to help.
              </p>
              <Link
                href="/contact"
                className="text-accent hover:text-accent-light underline font-semibold transition-colors"
                aria-label="Contact us"
              >
                Contact us for a free consultation
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent opacity-20 rounded-tr-full blur-3xl" />
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-highlight opacity-20 rounded-bl-full blur-3xl" />
    </section>
  );
}
