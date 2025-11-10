import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50 py-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-4">
              Payment Cancelled
            </h1>

            <p className="text-gray-600 mb-6">
              Your payment was cancelled. No charges were made to your account.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <p className="text-sm text-yellow-800">
                If you experienced any issues during checkout, please contact our support team.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/tools"
                className="block bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors font-medium"
              >
                Browse Tools
              </Link>

              <Link
                href="/dashboard"
                className="block bg-white text-primary border border-primary px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/"
                className="block text-secondary hover:text-primary text-sm font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
