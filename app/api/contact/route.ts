import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface ContactPayload {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { firstname, lastname = "", email, phone = "", service = "General Inquiry", message } = body;

    // Validate required fields
    if (!firstname?.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message?.trim() || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.SMTP_USER ||
      process.env.EMAIL_USER ||
      "gloebudav@gmail.com";

    const fullName = `${firstname.trim()} ${lastname.trim()}`.trim();
    const subject = `[Portfolio Contact] New message from ${fullName} - ${service}`;

    const textContent = `
New message received from your portfolio contact form:

Name: ${fullName}
Email: ${email.trim()}
Phone: ${phone.trim() || "Not provided"}
Service: ${service}

Message:
${message.trim()}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1c1c22; color: #ffffff; border-radius: 8px;">
        <h2 style="color: #00ff99; margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
          New Message from Portfolio
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6); width: 120px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; color: #ffffff;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);"><strong>Email:</strong></td>
            <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email.trim()}" style="color: #00ff99;">${email.trim()}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; color: #ffffff;">${phone.trim() || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);"><strong>Service:</strong></td>
            <td style="padding: 8px 0; color: #ffffff;">${service}</td>
          </tr>
        </table>
        <div style="background-color: #27272c; padding: 16px; border-radius: 6px; border-left: 4px solid #00ff99;">
          <h3 style="margin-top: 0; color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase;">Message:</h3>
          <p style="margin: 0; color: #ffffff; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
        </div>
        <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 24px; text-align: center;">
          Sent from David Glory Chiamaka's Portfolio Website
        </p>
      </div>
    `;

    // Strategy 1: Resend API Key if configured
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: email.trim(),
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ success: true, message: "Email sent successfully via Resend!" });
      }

      const resendError = await resendRes.json();
      console.warn("Resend API failed, falling back to SMTP if available:", resendError);
    }

    // Strategy 2: Nodemailer with SMTP credentials
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const port = Number(process.env.SMTP_PORT) || 465;
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: email.trim(),
        subject,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully!" });
    }

    // Fallback: No credentials configured yet
    const mailtoParams = new URLSearchParams({
      subject,
      body: textContent,
    });
    const mailtoUrl = `mailto:${receiverEmail}?${mailtoParams.toString()}`;

    return NextResponse.json({
      success: false,
      notConfigured: true,
      mailtoUrl,
      receiverEmail,
      message:
        "Email service is not yet configured with SMTP credentials. Please configure .env.local or click below to send directly through your email client.",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

