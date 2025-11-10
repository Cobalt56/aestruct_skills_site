import { Resend } from "resend";
import nodemailer from "nodemailer";

export type EmailProvider = "resend" | "smtp";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// SMTP transport
const smtpTransport = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

/**
 * Send email using configured provider
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const provider = (process.env.EMAIL_PROVIDER || "smtp") as EmailProvider;
  const from = options.from || process.env.EMAIL_FROM || "noreply@aestruct.com";

  try {
    if (provider === "resend") {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY not configured");
      }

      await resend.emails.send({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } else {
      // SMTP
      await smtpTransport.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    }

    // Log successful email send
    console.log(`Email sent successfully to ${options.to} via ${provider}`);
  } catch (error) {
    console.error(`Failed to send email via ${provider}:`, error);
    throw error;
  }
}
