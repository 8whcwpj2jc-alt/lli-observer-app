import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { addLeadershipApproachEntry } from "@/lib/data";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { body } = await request.json();
  if (!body || !String(body).trim()) {
    return NextResponse.json({ error: "body is required." }, { status: 400 });
  }

  await addLeadershipApproachEntry(session.userId, String(body).trim());
  return NextResponse.json({ ok: true });
}
