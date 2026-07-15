import { Resend } from "resend";

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

const FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";

export async function sendInviteEmail(to: string, name: string, link: string) {
  const resend = getClient();
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — invite link for ${to}: ${link}`);
    return;
  }
  await resend.emails.send({
    from: FROM,
    to,
    subject: "You're invited to LLI Observer",
    html: `
      <p>Hi ${name},</p>
      <p>You've been invited to the LLI Observer leadership-development tool. Click below to set your password and get started:</p>
      <p><a href="${link}">${link}</a></p>
      <p>This link will expire in 7 days.</p>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, name: string, link: string) {
  const resend = getClient();
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — reset link for ${to}: ${link}`);
    return;
  }
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your LLI Observer password",
    html: `
      <p>Hi ${name},</p>
      <p>Click below to reset your password:</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn't request this, you can ignore this email. This link expires in 1 hour.</p>
    `,
  });
}
