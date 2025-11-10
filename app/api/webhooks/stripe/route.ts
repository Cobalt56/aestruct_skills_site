import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendPurchaseConfirmationEmail, sendSkillDeliveryEmail } from "@/lib/email-enhanced";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get order by session ID
        const order = await prisma.order.findUnique({
          where: { stripeSessionId: session.id },
          include: {
            user: true,
            product: true,
          },
        });

        if (!order) {
          console.error("Order not found for session:", session.id);
          return NextResponse.json({ received: true });
        }

        // Update order status
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "completed",
            stripePaymentId: session.payment_intent as string,
            fulfilledAt: new Date(),
          },
        });

        // Send purchase confirmation email
        try {
          await sendPurchaseConfirmationEmail(
            order.user.email,
            order.user.name,
            order.product.name,
            order.amount,
            order.id
          );
        } catch (error) {
          console.error("Error sending purchase confirmation email:", error);
          // Continue - will try to send delivery email
        }

        // Send skill delivery email with download links
        try {
          await sendSkillDeliveryEmail(
            order.user.email,
            order.user.name,
            order.product.name,
            order.amount,
            order.id,
            order.product.id
          );
        } catch (error) {
          console.error("Error sending skill delivery email:", error);
          // Don't fail webhook if email fails
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Mark order as failed
        await prisma.order.updateMany({
          where: { stripeSessionId: session.id },
          data: { status: "failed" },
        });

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Mark order as failed
        await prisma.order.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: "failed" },
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
