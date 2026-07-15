import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const { rows } = await db.execute({
    sql: "SELECT id, email, password_hash, name, role FROM users WHERE email = ?",
    args: [String(email).toLowerCase().trim()],
  });

  const user = rows[0];
  if (!user || !user.password_hash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(password, String(user.password_hash));
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await setSessionCookie({
    userId: Number(user.id),
    role: user.role as "admin" | "participant",
    name: String(user.name),
  });

  return NextResponse.json({ ok: true, role: user.role });
}
