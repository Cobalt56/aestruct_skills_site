import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-24 md:py-32 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI Tools for M&E Back-Office Operations
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 leading-relaxed">
            Save 20-40% on administrative time.
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
            Focus on storytelling, not paperwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tools"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-xl text-center"
              aria-label="Explore our AI tools"
            >
              Explore Our Tools
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-xl text-center"
              aria-label="Schedule a consultation"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent opacity-10 rounded-tl-full blur-3xl" />
    </section>
  );
}
