import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password || String(password).length < 8) {
    return NextResponse.json(
      { error: "A token and a password of at least 8 characters are required." },
      { status: 400 }
    );
  }

  const { rows } = await db.execute({
    sql: `SELECT id, user_id, expires_at, used_at FROM invite_tokens
          WHERE token = ? AND purpose = 'reset'`,
    args: [token],
  });

  const row = rows[0];
  if (!row) {
    return NextResponse.json({ error: "Invalid or unknown reset link." }, { status: 400 });
  }
  if (row.used_at) {
    return NextResponse.json({ error: "This reset link has already been used." }, { status: 400 });
  }
  if (new Date(String(row.expires_at)) < new Date()) {
    return NextResponse.json({ error: "This reset link has expired." }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  await db.execute({
    sql: "UPDATE users SET password_hash = ? WHERE id = ?",
    args: [passwordHash, row.user_id],
  });
  await db.execute({
    sql: "UPDATE invite_tokens SET used_at = datetime('now') WHERE id = ?",
    args: [row.id],
  });

  return NextResponse.json({ ok: true });
}
