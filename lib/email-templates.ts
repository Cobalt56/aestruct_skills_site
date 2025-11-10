/**
 * Email template utilities and HTML templates
 */

export function getEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .button {
          display: inline-block;
          padding: 14px 28px;
          background-color: #3B82F6;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #2563EB;
        }
        .button-success {
          background-color: #10B981;
        }
        .button-success:hover {
          background-color: #059669;
        }
        .info-box {
          background-color: #F3F4F6;
          border-left: 4px solid #3B82F6;
          padding: 16px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .download-section {
          background-color: #F9FAFB;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          padding: 24px;
          margin: 24px 0;
        }
        .download-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #E5E7EB;
        }
        .download-item:last-child {
          border-bottom: none;
        }
        .download-icon {
          width: 40px;
          height: 40px;
          background-color: #3B82F6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
        }
        .download-details {
          flex: 1;
        }
        .download-title {
          font-weight: 600;
          color: #1F2937;
          margin: 0 0 4px 0;
        }
        .download-description {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }
        .footer {
          background-color: #F9FAFB;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #E5E7EB;
        }
        .footer p {
          margin: 8px 0;
          font-size: 14px;
          color: #6B7280;
        }
        .footer a {
          color: #3B82F6;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        h2 {
          color: #1F2937;
          margin-top: 0;
        }
        h3 {
          color: #374151;
          margin: 20px 0 12px 0;
        }
        p {
          margin: 12px 0;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${content}
        <div class="footer">
          <p><strong>AEstruct</strong> - AI Solutions for Media & Entertainment</p>
          <p>
            Need help? Contact us at <a href="mailto:support@aestruct.com">support@aestruct.com</a>
          </p>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} AEstruct. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function verificationEmailTemplate(name: string | null, verificationUrl: string): string {
  const content = `
    <div class="header">
      <h1>Welcome to AEstruct!</h1>
    </div>
    <div class="content">
      <h2>Verify Your Email${name ? `, ${name}` : ""}</h2>
      <p>Thank you for registering! Please verify your email address to complete your registration and access all features.</p>

      <div style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>

      <div class="info-box">
        <p style="margin: 0;"><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
        <p style="word-break: break-all; margin: 8px 0 0 0;">${verificationUrl}</p>
      </div>

      <p style="margin-top: 24px; color: #6B7280; font-size: 14px;">
        This verification link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `;

  return getEmailTemplate(content);
}

export function passwordResetEmailTemplate(name: string | null, resetUrl: string): string {
  const content = `
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <h2>Password Reset Request</h2>
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>

      <div style="text-align: center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </div>

      <div class="info-box">
        <p style="margin: 0;"><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
        <p style="word-break: break-all; margin: 8px 0 0 0;">${resetUrl}</p>
      </div>

      <p style="margin-top: 24px; color: #6B7280; font-size: 14px;">
        This password reset link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>
  `;

  return getEmailTemplate(content);
}

export function orderConfirmationEmailTemplate(
  name: string | null,
  productName: string,
  amount: number,
  orderId: string,
  downloadLinks: {
    skillFile: string;
    documentation: string;
    promptContent: string;
  }
): string {
  const content = `
    <div class="header">
      <h1>🎉 Thank You for Your Purchase!</h1>
    </div>
    <div class="content">
      <h2>Your Order is Confirmed</h2>
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>Thank you for purchasing <strong>${productName}</strong>! Your order has been confirmed and your Claude Skill is ready for download.</p>

      <div class="info-box">
        <p style="margin: 0;"><strong>Order Details:</strong></p>
        <p style="margin: 4px 0 0 0;">Product: ${productName}</p>
        <p style="margin: 4px 0 0 0;">Amount: $${amount.toFixed(2)}</p>
        <p style="margin: 4px 0 0 0;">Order ID: ${orderId}</p>
      </div>

      <h3>📥 Download Your Files</h3>
      <p>Your purchase includes the following files:</p>

      <div class="download-section">
        <div class="download-item">
          <div class="download-icon">
            <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
            </svg>
          </div>
          <div class="download-details">
            <p class="download-title">.skill File</p>
            <p class="download-description">Claude Skills package - Ready to import into Claude</p>
          </div>
          <a href="${downloadLinks.skillFile}" class="button button-success" style="margin: 0;">Download</a>
        </div>

        <div class="download-item">
          <div class="download-icon">
            <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
              <path d="M9 2h2v6h-2V2zm0 8h2v8h-2v-8zM3 8h3v2H3V8zm11 0h3v2h-3V8zM1 14h5v2H1v-2zm13 0h5v2h-5v-2z"/>
            </svg>
          </div>
          <div class="download-details">
            <p class="download-title">Documentation</p>
            <p class="download-description">Installation guide and user manual (PDF)</p>
          </div>
          <a href="${downloadLinks.documentation}" class="button button-success" style="margin: 0;">Download</a>
        </div>

        <div class="download-item">
          <div class="download-icon">
            <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
              <path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h12v2H4v-2z"/>
            </svg>
          </div>
          <div class="download-details">
            <p class="download-title">Prompt Content</p>
            <p class="download-description">Standalone text file with prompt instructions</p>
          </div>
          <a href="${downloadLinks.promptContent}" class="button button-success" style="margin: 0;">Download</a>
        </div>
      </div>

      <div class="info-box" style="background-color: #FEF3C7; border-color: #F59E0B;">
        <p style="margin: 0; color: #92400E;">
          <strong>⏰ Important:</strong> Download links are valid for 7 days. After that, you can request new links from your dashboard.
        </p>
      </div>

      <h3>🚀 Quick Start Guide</h3>
      <ol>
        <li>Download the .skill file and documentation</li>
        <li>Open Claude.ai and navigate to Skills settings</li>
        <li>Click "Import Skill" and select the downloaded .skill file</li>
        <li>Follow the installation guide in the documentation</li>
        <li>Start using your new AI-powered workflow!</li>
      </ol>

      <h3>💡 Need Help?</h3>
      <p>Check out these resources:</p>
      <ul>
        <li><a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard">Your Dashboard</a> - Access your purchases anytime</li>
        <li><a href="mailto:support@aestruct.com">support@aestruct.com</a> - Our support team is here to help</li>
        <li>Documentation - Step-by-step guides included in your download</li>
      </ul>

      <p style="margin-top: 32px;">Happy creating! 🎬✨</p>
    </div>
  `;

  return getEmailTemplate(content);
}

export function purchaseConfirmationEmailTemplate(
  name: string | null,
  productName: string,
  amount: number,
  orderId: string
): string {
  const content = `
    <div class="header">
      <h1>Order Confirmation</h1>
    </div>
    <div class="content">
      <h2>Thank You for Your Purchase!</h2>
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>We've received your payment for <strong>${productName}</strong>. Your order is being processed.</p>

      <div class="info-box">
        <p style="margin: 0;"><strong>Order Summary:</strong></p>
        <p style="margin: 8px 0 0 0;">Product: ${productName}</p>
        <p style="margin: 4px 0 0 0;">Amount: $${amount.toFixed(2)}</p>
        <p style="margin: 4px 0 0 0;">Order ID: ${orderId}</p>
        <p style="margin: 4px 0 0 0;">Date: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
      </div>

      <h3>What's Next?</h3>
      <p>You will receive a separate email within a few minutes containing:</p>
      <ul>
        <li>Download links for your .skill file</li>
        <li>Comprehensive documentation and guides</li>
        <li>Installation instructions</li>
        <li>Access to support resources</li>
      </ul>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" class="button">Go to Dashboard</a>
      </div>

      <p style="color: #6B7280; font-size: 14px; margin-top: 24px;">
        If you don't receive your delivery email within 10 minutes, please check your spam folder or contact support.
      </p>
    </div>
  `;

  return getEmailTemplate(content);
}
