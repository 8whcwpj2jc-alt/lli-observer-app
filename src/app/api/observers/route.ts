import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { addObserver } from "@/lib/data";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { name, note } = await request.json();
  if (!name || !String(name).trim()) {
    return NextResponse.json({ error: "name is required." }, { status: 400 });
  }

  const token = generateToken();
  await addObserver(session.userId, String(name).trim(), note ? String(note).trim() : null, token);

  const link = `${process.env.APP_BASE_URL}/o/${token}`;
  return NextResponse.json({ ok: true, token, link });
}
