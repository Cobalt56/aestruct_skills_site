import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Get user with Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not found. Please contact support." },
        { status: 400 }
      );
    }

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: "Product not found or not available" },
        { status: 404 }
      );
    }

    // Check if user already purchased this product
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: user.id,
        productId: product.id,
        status: "completed",
      },
    });

    if (existingOrder) {
      return NextResponse.json(
        { error: "You have already purchased this product" },
        { status: 400 }
      );
    }

    // Create pending order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        amount: product.price,
        status: "pending",
      },
    });

    // Create Stripe Checkout session
    const checkoutSession = await createCheckoutSession(
      user.stripeCustomerId,
      product.id,
      product.name,
      product.price,
      user.id
    );

    // Update order with session ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: checkoutSession.id,
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "An error occurred during checkout" },
      { status: 500 }
    );
  }
}
