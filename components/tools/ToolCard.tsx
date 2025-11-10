"use client";

import { useState } from "react";
import ToolModal from "./ToolModal";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  skillFileUrl?: string | null;
  promptContent?: string | null;
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [showModal, setShowModal] = useState(false);

  // Extract key benefits from description (assumes description has bullet points)
  const benefits = tool.description
    .split("\n")
    .filter((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .slice(0, 3);

  // Get short description (first paragraph)
  const shortDescription = tool.description.split("\n")[0];

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-t-4 border-accent flex flex-col h-full">
        {/* Tool icon placeholder */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
          <span className="text-3xl">🛠️</span>
        </div>

        {/* Tool name */}
        <h3 className="text-2xl font-bold text-primary mb-3">{tool.name}</h3>

        {/* Short description */}
        <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
          {shortDescription}
        </p>

        {/* Key benefits */}
        {benefits.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-600 mb-2">
              Key Benefits:
            </h4>
            <ul className="space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-accent mr-2 flex-shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 mt-auto">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Learn More
          </button>

          {/* Coming soon badge */}
          <div className="bg-highlight/20 border border-highlight text-gray-700 text-center py-2 px-4 rounded-lg text-sm font-medium">
            Coming Soon: Purchase & Download
          </div>
        </div>

        {/* Price tag */}
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-accent">${tool.price}</span>
          <span className="text-gray-500 text-sm ml-2">one-time</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ToolModal tool={tool} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
