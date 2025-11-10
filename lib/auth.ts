import { NextRequest } from "next/server";

// Simple password protection for MVP
// In Phase 2, this will be replaced with proper authentication
export function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return false;
  }

  // Expected format: "Bearer <password>"
  const [type, password] = authHeader.split(" ");

  if (type !== "Bearer") {
    return false;
  }

  // For MVP, use a simple hardcoded password
  // TODO: Replace with proper authentication in Phase 2
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  return password === ADMIN_PASSWORD;
}

export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: "Unauthorized" }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
