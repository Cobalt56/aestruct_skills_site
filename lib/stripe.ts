import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function createStripeCustomer(
  email: string,
  name?: string | null
): Promise<string> {
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      source: "aestruct_registration",
    },
  });

  return customer.id;
}

export async function createCheckoutSession(
  customerId: string,
  productId: string,
  productName: string,
  amount: number,
  userId: string
): Promise<Stripe.Checkout.Session> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    metadata: {
      userId,
      productId,
    },
  });

  return session;
}
