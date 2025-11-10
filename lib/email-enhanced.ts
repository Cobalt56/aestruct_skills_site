/**
 * Enhanced email sending utilities with template support
 */

import { sendEmail } from "./email-provider";
import {
  verificationEmailTemplate,
  passwordResetEmailTemplate,
  orderConfirmationEmailTemplate,
  purchaseConfirmationEmailTemplate,
} from "./email-templates";
import { generateDownloadLinks } from "./signed-url";
import { prisma } from "./prisma";

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string | null,
  token: string
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your AEstruct account",
    html: verificationEmailTemplate(name, verificationUrl),
  });

  // Log email sent
  await logEmailSent(email, "verification");
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string | null,
  token: string
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your AEstruct password",
    html: passwordResetEmailTemplate(name, resetUrl),
  });

  // Log email sent
  await logEmailSent(email, "password_reset");
}

/**
 * Send purchase confirmation email (immediate after payment)
 */
export async function sendPurchaseConfirmationEmail(
  email: string,
  name: string | null,
  productName: string,
  amount: number,
  orderId: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: `Order Confirmation - ${productName}`,
    html: purchaseConfirmationEmailTemplate(name, productName, amount, orderId),
  });

  // Log email sent
  await logEmailSent(email, "purchase_confirmation", orderId);
}

/**
 * Send skill delivery email with download links
 */
export async function sendSkillDeliveryEmail(
  email: string,
  name: string | null,
  productName: string,
  amount: number,
  orderId: string,
  productId: string
): Promise<void> {
  // Generate signed download links (valid for 7 days)
  const downloadLinks = generateDownloadLinks(orderId, productId, 7);

  await sendEmail({
    to: email,
    subject: `Your ${productName} is Ready for Download! 📥`,
    html: orderConfirmationEmailTemplate(
      name,
      productName,
      amount,
      orderId,
      downloadLinks
    ),
  });

  // Log email sent
  await logEmailSent(email, "skill_delivery", orderId);
}

/**
 * Log email sent to database
 */
async function logEmailSent(
  email: string,
  type: string,
  orderId?: string
): Promise<void> {
  try {
    await prisma.emailLog.create({
      data: {
        email,
        type,
        orderId,
        sentAt: new Date(),
        status: "sent",
      },
    });
  } catch (error) {
    console.error("Error logging email:", error);
    // Don't throw - email was sent successfully
  }
}

/**
 * Resend delivery email for an order (admin function)
 */
export async function resendDeliveryEmail(orderId: string): Promise<void> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      product: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "completed") {
    throw new Error("Order is not completed");
  }

  await sendSkillDeliveryEmail(
    order.user.email,
    order.user.name,
    order.product.name,
    order.amount,
    order.id,
    order.product.id
  );
}
