"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";

interface Metric {
  id: string;
  metricName: string;
  metricValue: string;
  displayOrder: number;
}

export default function SuccessMetricsSection() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/metrics");
      if (!response.ok) throw new Error("Failed to fetch metrics");
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setError("Failed to load metrics");
      // Fallback to default metrics
      setMetrics([
        {
          id: "1",
          metricName: "ROI",
          metricValue: "800-1500%",
          displayOrder: 1,
        },
        {
          id: "2",
          metricName: "Time Savings",
          metricValue: "20-40%",
          displayOrder: 2,
        },
        {
          id: "3",
          metricName: "Production-Ready Tools",
          metricValue: "7",
          displayOrder: 3,
        },
        {
          id: "4",
          metricName: "Industry Experience",
          metricValue: "30+ years",
          displayOrder: 4,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50" aria-label="Success metrics">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-8 text-center animate-pulse"
              >
                <div className="h-12 bg-gray-200 rounded mb-4" />
                <div className="h-6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" aria-label="Success metrics">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Measurable Results
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Real impact for media and entertainment professionals
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <FadeInSection key={metric.id} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-accent">
                <AnimatedCounter value={metric.metricValue} />
                <div className="text-gray-700 font-medium mt-3 text-lg">
                  {metric.metricName}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing sample data
          </p>
        )}
      </div>
    </section>
  );
}
