import { createHmac } from "crypto";

export interface SignedUrlData {
  orderId: string;
  productId: string;
  fileType: "skill" | "documentation" | "prompt";
  expiresAt: number;
}

/**
 * Generate a signed download URL that expires after a specified time
 */
export function generateSignedUrl(data: SignedUrlData): string {
  const secret = process.env.DOWNLOAD_URL_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("No secret configured for signed URLs");
  }

  // Create payload
  const payload = JSON.stringify(data);
  const payloadBase64 = Buffer.from(payload).toString("base64url");

  // Generate signature
  const signature = createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  // Combine payload and signature
  const token = `${payloadBase64}.${signature}`;

  // Build URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/api/download?token=${token}`;
}

/**
 * Verify and decode a signed URL token
 */
export function verifySignedUrl(token: string): SignedUrlData | null {
  const secret = process.env.DOWNLOAD_URL_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("No secret configured for signed URLs");
  }

  try {
    // Split token into payload and signature
    const [payloadBase64, providedSignature] = token.split(".");

    if (!payloadBase64 || !providedSignature) {
      return null;
    }

    // Verify signature
    const expectedSignature = createHmac("sha256", secret)
      .update(payloadBase64)
      .digest("base64url");

    if (providedSignature !== expectedSignature) {
      console.error("Invalid signature");
      return null;
    }

    // Decode payload
    const payload = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const data: SignedUrlData = JSON.parse(payload);

    // Check expiration
    if (Date.now() > data.expiresAt) {
      console.error("Token expired");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error verifying signed URL:", error);
    return null;
  }
}

/**
 * Generate download links for a product
 */
export function generateDownloadLinks(
  orderId: string,
  productId: string,
  expirationDays: number = 7
): {
  skillFile: string;
  documentation: string;
  promptContent: string;
} {
  const expiresAt = Date.now() + expirationDays * 24 * 60 * 60 * 1000;

  return {
    skillFile: generateSignedUrl({
      orderId,
      productId,
      fileType: "skill",
      expiresAt,
    }),
    documentation: generateSignedUrl({
      orderId,
      productId,
      fileType: "documentation",
      expiresAt,
    }),
    promptContent: generateSignedUrl({
      orderId,
      productId,
      fileType: "prompt",
      expiresAt,
    }),
  };
}
