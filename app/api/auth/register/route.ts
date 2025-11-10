import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createStripeCustomer } from "@/lib/stripe";
import { sendVerificationEmail } from "@/lib/email-enhanced";
import { randomBytes } from "crypto";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex");

    // Create Stripe customer
    let stripeCustomerId: string | null = null;
    try {
      stripeCustomerId = await createStripeCustomer(email, name);
    } catch (error) {
      console.error("Error creating Stripe customer:", error);
      // Continue with registration even if Stripe fails
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        verificationToken,
        stripeCustomerId,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, name, verificationToken);
    } catch (error) {
      console.error("Error sending verification email:", error);
      // User is created, but email failed
      // Could implement retry logic or notify admin
    }

    return NextResponse.json(
      {
        message:
          "Registration successful! Please check your email to verify your account.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
