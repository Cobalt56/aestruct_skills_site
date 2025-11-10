import { NextRequest, NextResponse } from "next/server";
import { verifySignedUrl } from "@/lib/signed-url";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import { join } from "path";

// Rate limiting map (in-memory for MVP - use Redis in production)
const downloadAttempts = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_DOWNLOADS_PER_WINDOW = 5;

/**
 * Check rate limit for an IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = downloadAttempts.get(ip);

  if (!attempts || now > attempts.resetAt) {
    downloadAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (attempts.count >= MAX_DOWNLOADS_PER_WINDOW) {
    return false;
  }

  attempts.count++;
  return true;
}

/**
 * Get file path and content type for download
 */
function getFileInfo(
  productId: string,
  fileType: "skill" | "documentation" | "prompt"
): { path: string; contentType: string; extension: string } {
  const basePath = process.cwd();

  switch (fileType) {
    case "skill":
      return {
        path: join(basePath, "storage", "skills", `${productId}.skill`),
        contentType: "application/octet-stream",
        extension: ".skill",
      };
    case "documentation":
      return {
        path: join(basePath, "storage", "documentation", `${productId}.pdf`),
        contentType: "application/pdf",
        extension: ".pdf",
      };
    case "prompt":
      return {
        path: join(basePath, "storage", "prompts", `${productId}.txt`),
        contentType: "text/plain",
        extension: ".txt",
      };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many download attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Get token from query params
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Download token is required" },
        { status: 400 }
      );
    }

    // Verify signed URL
    const data = verifySignedUrl(token);

    if (!data) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 401 }
      );
    }

    // Verify order exists and is completed
    const order = await prisma.order.findUnique({
      where: {
        id: data.orderId,
        status: "completed",
      },
      include: {
        user: true,
        product: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not completed" },
        { status: 404 }
      );
    }

    // Verify product ID matches
    if (order.productId !== data.productId) {
      return NextResponse.json(
        { error: "Invalid product for this order" },
        { status: 403 }
      );
    }

    // Get file info
    const fileInfo = getFileInfo(data.productId, data.fileType);

    // Read file
    let fileBuffer: Buffer;
    try {
      fileBuffer = await readFile(fileInfo.path);
    } catch (error) {
      console.error("Error reading file:", error);
      return NextResponse.json(
        { error: "File not found. Please contact support." },
        { status: 404 }
      );
    }

    // Increment download count
    await prisma.order.update({
      where: { id: order.id },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    // Log download
    await logDownload(order.id, data.fileType, ip);

    // Generate filename
    const productSlug = order.product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const filename = `${productSlug}-${data.fileType}${fileInfo.extension}`;

    // Return file
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": fileInfo.contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "An error occurred during download" },
      { status: 500 }
    );
  }
}

/**
 * Log download attempt
 */
async function logDownload(
  orderId: string,
  fileType: string,
  ip: string
): Promise<void> {
  try {
    await prisma.downloadLog.create({
      data: {
        orderId,
        fileType,
        ipAddress: ip,
      },
    });
  } catch (error) {
    console.error("Error logging download:", error);
    // Don't throw - download was successful
  }
}
