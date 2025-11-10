"use client";

import { useEffect } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  skillFileUrl?: string | null;
  promptContent?: string | null;
}

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{tool.name}</h2>
              <p className="text-gray-200">
                {tool.type.charAt(0).toUpperCase() + tool.type.slice(1)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl leading-none"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Description
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              {tool.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-gray-600 mb-1">One-time price</h4>
                <p className="text-3xl font-bold text-accent">${tool.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Includes lifetime updates
                </p>
              </div>
            </div>
          </div>

          {/* Coming soon notice */}
          <div className="bg-highlight/10 border-2 border-highlight rounded-lg p-4 mb-6">
            <p className="text-center font-semibold text-gray-700">
              Purchase & download functionality coming in Phase 2
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                window.location.href = "/contact";
              }}
              className="flex-1 bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact for More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
