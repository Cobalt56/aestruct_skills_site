import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";

async function getUser Orders(userId: string) {
  return await prisma.order.findMany({
    where: {
      userId,
      status: "completed",
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user.name}!</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{session.user.name || "Not set"}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">
              Your Purchases
            </h2>
            <Link
              href="/tools"
              className="text-secondary hover:text-primary text-sm font-medium"
            >
              Browse Tools →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-600 mb-4">No purchases yet</p>
              <Link
                href="/tools"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors font-medium"
              >
                Browse Claude Skills
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary mb-1">
                        {order.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Purchased on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.downloadCount} download
                        {order.downloadCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/dashboard/downloads/${order.id}`}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-center text-sm"
                      >
                        Download
                      </Link>
                      <span className="text-sm text-gray-600 text-center">
                        ${order.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
