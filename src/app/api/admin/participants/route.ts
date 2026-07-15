import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { sendInviteEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const { name, email } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: "name and email are required." }, { status: 400 });
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  const { rows: existing } = await db.execute({
    sql: "SELECT id FROM users WHERE email = ?",
    args: [normalizedEmail],
  });
  if (existing[0]) {
    return NextResponse.json({ error: "A user with that email already exists." }, { status: 400 });
  }

  const { rows } = await db.execute({
    sql: "INSERT INTO users (email, name, role) VALUES (?, ?, 'participant') RETURNING id",
    args: [normalizedEmail, String(name).trim()],
  });
  const userId = Number(rows[0].id);

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
  await db.execute({
    sql: "INSERT INTO invite_tokens (user_id, token, purpose, expires_at) VALUES (?, ?, 'invite', ?)",
    args: [userId, token, expiresAt],
  });

  const link = `${process.env.APP_BASE_URL}/accept-invite/${token}`;
  await sendInviteEmail(normalizedEmail, String(name).trim(), link);

  return NextResponse.json({ ok: true, link });
}
