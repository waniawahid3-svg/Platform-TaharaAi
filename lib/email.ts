// lib/email.ts
// Real email sending via Gmail SMTP (nodemailer).
// Uses a Gmail App Password — no domain verification required.

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const fromName = 'Tahara AI';
const fromEmail = process.env.GMAIL_USER;

export async function sendOTPEmail(to: string, code: string, purpose: 'verify' | 'reset') {
  const subject = purpose === 'verify'
    ? 'Verify your Tahara AI account'
    : 'Reset your Tahara AI password';

  const action = purpose === 'verify' ? 'verification' : 'password reset';

  try {
    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#0f172a;">Tahara AI</h2>
          <p>Your ${action} code is:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:4px;padding:16px 24px;background:#f1f5f9;border-radius:8px;text-align:center;margin:16px 0;">
            ${code}
          </div>
          <p style="color:#64748b;font-size:14px;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return info;
  } catch (error) {
    console.error('Gmail send error:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: 'Welcome to Tahara AI',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#0f172a;">Welcome, ${name}</h2>
          <p>Your Tahara AI account is now verified and ready.</p>
          <p>You can sign in at any time to manage your AI assurance runs.</p>
        </div>
      `,
    });

    return info;
  } catch (error) {
    console.error('Gmail welcome email error:', error);
    // Don't throw — welcome email is non-critical
  }
}