"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/dashboard";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50 py-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-4">
              Payment Successful!
            </h1>

            <p className="text-gray-600 mb-6">
              Thank you for your purchase! Your Claude Skill is now available for download.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-sm text-green-800">
                We've sent a confirmation email with download instructions.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors font-medium"
              >
                Go to Dashboard
              </Link>

              <p className="text-sm text-gray-500">
                Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
              </p>
            </div>

            {sessionId && (
              <p className="mt-6 text-xs text-gray-400">
                Transaction ID: {sessionId.slice(0, 20)}...
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
