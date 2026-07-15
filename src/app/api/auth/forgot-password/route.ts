import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (email) {
    const { rows } = await db.execute({
      sql: "SELECT id, name, email FROM users WHERE email = ?",
      args: [String(email).toLowerCase().trim()],
    });
    const user = rows[0];

    if (user) {
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
      await db.execute({
        sql: "INSERT INTO invite_tokens (user_id, token, purpose, expires_at) VALUES (?, ?, 'reset', ?)",
        args: [user.id, token, expiresAt],
      });
      const link = `${process.env.APP_BASE_URL}/reset-password/${token}`;
      try {
        await sendPasswordResetEmail(String(user.email), String(user.name), link);
      } catch (err) {
        console.error("Failed to send password reset email:", err);
      }
    }
  }

  // Always return the same response, whether or not the email exists, to avoid leaking which emails are registered.
  return NextResponse.json({ ok: true });
}
