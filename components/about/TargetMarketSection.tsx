import FadeInSection from "@/components/home/FadeInSection";

export default function TargetMarketSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
              Built for Production Companies Like Yours
            </h2>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
              <div className="space-y-6 text-gray-700">
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Our Ideal Client
                  </h3>
                  <p className="text-lg leading-relaxed">
                    Small to mid-sized production companies facing the reality of
                    doing more with less. You're producing quality content but
                    drowning in administrative overhead. Your team is stretched
                    thin, and you can't afford to hire a full back-office staff.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-primary mb-3 text-lg">
                      Your Challenges:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>Limited HR resources and budget constraints</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>
                          Hours spent on script breakdowns and rights clearance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>
                          Manual budget tracking and production reporting
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>Need for quick ROI and proven solutions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-6">
                    <h4 className="font-bold text-primary mb-3 text-lg">
                      Our Solutions:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span>20-40% reduction in administrative time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span>
                          Automated script analysis and breakdown generation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span>
                          AI-powered rights clearance and budget forecasting
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span>800-1500% ROI within first 6 months</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-center text-lg italic text-gray-600">
                    "We don't replace your creative team—we free them up to focus
                    on storytelling while we handle the paperwork."
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
