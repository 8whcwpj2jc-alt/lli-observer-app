import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password || String(password).length < 8) {
    return NextResponse.json(
      { error: "A token and a password of at least 8 characters are required." },
      { status: 400 }
    );
  }

  const { rows } = await db.execute({
    sql: `SELECT it.id as invite_id, it.expires_at, it.used_at, u.id as user_id, u.name, u.role
          FROM invite_tokens it JOIN users u ON u.id = it.user_id
          WHERE it.token = ? AND it.purpose = 'invite'`,
    args: [token],
  });

  const row = rows[0];
  if (!row) {
    return NextResponse.json({ error: "Invalid or unknown invite link." }, { status: 400 });
  }
  if (row.used_at) {
    return NextResponse.json({ error: "This invite link has already been used." }, { status: 400 });
  }
  if (new Date(String(row.expires_at)) < new Date()) {
    return NextResponse.json({ error: "This invite link has expired." }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  await db.execute({
    sql: "UPDATE users SET password_hash = ? WHERE id = ?",
    args: [passwordHash, row.user_id],
  });
  await db.execute({
    sql: "UPDATE invite_tokens SET used_at = datetime('now') WHERE id = ?",
    args: [row.invite_id],
  });

  await setSessionCookie({
    userId: Number(row.user_id),
    role: row.role as "admin" | "participant",
    name: String(row.name),
  });

  return NextResponse.json({ ok: true });
}
