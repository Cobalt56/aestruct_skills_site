"use client";

import { useEffect, useState } from "react";
import ToolCard from "@/components/tools/ToolCard";
import FadeInSection from "@/components/home/FadeInSection";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  skillFileUrl?: string | null;
  promptContent?: string | null;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools");
      if (!response.ok) throw new Error("Failed to fetch tools");
      const data = await response.json();
      setTools(data);
    } catch (err) {
      console.error("Error fetching tools:", err);
      setError("Failed to load tools");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Claude Skills for Production
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                Seven production-ready AI tools designed to save 20-40% on
                administrative time. No pilots, no experiments—just solutions
                that work.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-6 animate-pulse"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-8 bg-gray-200 rounded mb-3" />
                  <div className="h-20 bg-gray-200 rounded mb-4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchTools}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                No tools available yet. Check back soon!
              </p>
              <a
                href="/contact"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
              >
                Contact Us for Updates
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <FadeInSection key={tool.id} delay={index * 100}>
                  <ToolCard tool={tool} />
                </FadeInSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Ready to Transform Your Production Workflow?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Contact us to learn more about how these tools can save your team
              hundreds of hours on administrative tasks.
            </p>
            <a
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-bold px-10 py-4 rounded-lg transition-colors text-lg"
            >
              Get Started
            </a>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
