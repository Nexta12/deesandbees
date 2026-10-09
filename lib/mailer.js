import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465;
  const user = process.env.USER_EMAIL;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransporter({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export function emailBaseTemplate({ title, headerText, content }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title || "Dees & Bees Global"}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { margin: 4px 0 0 0; color: #f59e0b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .body { padding: 32px 24px; font-size: 15px; line-height: 1.6; color: #334155; }
        .otp-badge { background: #eff6ff; color: #1d4ed8; font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 14px 24px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px dashed #93c5fd; }
        .footer { background: #f1f5f9; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Dees & Bees Global</h1>
          <p>${headerText || "International Education Services"}</p>
        </div>
        <div class="body">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Dees & Bees Global Resources. All rights reserved.</p>
          <p>UK: +44 735 964 1827 | NG: +234 706 922 3328 | info@deesandbeesglobal.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendContactNotification({ fullName, email, phone, address, message }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email transporter not configured. Skipping email dispatch.");
    return { success: false, reason: "Transporter not configured" };
  }

  const to = process.env.OFFICIAL_EMAIL || "info@deesandbeesglobal.com";
  const html = emailBaseTemplate({
    title: "New Student Enquiry - Dees & Bees",
    headerText: "Student Admissions Notification",
    content: `
      <h2 style="margin-top:0; color:#0f172a;">New Contact & Application Enquiry</h2>
      <p>A new student enquiry has been submitted through the website portal:</p>
      <table style="width:100%; border-collapse:collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; font-weight: 600; color: #475569; width: 120px;">Name:</td><td style="padding: 8px; color: #0f172a;">${fullName}</td></tr>
        <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Email:</td><td style="padding: 8px; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Phone:</td><td style="padding: 8px; color: #0f172a;">${phone || "N/A"}</td></tr>
        <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Location:</td><td style="padding: 8px; color: #0f172a;">${address || "N/A"}</td></tr>
      </table>
      <div style="background:#f8fafc; border-left: 4px solid #3b82f6; padding: 14px; border-radius: 4px; margin: 16px 0;">
        <strong style="display:block; margin-bottom: 6px; color:#1e293b;">Message / Request Details:</strong>
        <p style="margin:0; white-space: pre-line;">${message}</p>
      </div>
    `,
  });

  try {
    await transporter.sendMail({
      from: `"Dees & Bees Global" <${process.env.USER_EMAIL}>`,
      to,
      subject: `New Student Enquiry: ${fullName}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return { success: false, error: error.message };
  }
}

export async function sendOtpEmail({ email, name, otp }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email transporter not configured. OTP:", otp);
    return { success: false, reason: "Transporter not configured" };
  }

  const html = emailBaseTemplate({
    title: "Password Reset OTP - Dees & Bees",
    headerText: "Account Verification Code",
    content: `
      <h2 style="margin-top:0; color:#0f172a;">Hello ${name || "User"},</h2>
      <p>Use the 6-digit one-time password below to reset your account password. This verification code expires in <strong>10 minutes</strong>.</p>
      <div class="otp-badge">${otp}</div>
      <p style="color:#64748b; font-size:13px;">If you did not request this password reset, please ignore this email or contact support immediately.</p>
    `,
  });

  try {
    await transporter.sendMail({
      from: `"Dees & Bees Global" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: `Your Verification Code: ${otp}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return { success: false, error: error.message };
  }
}
