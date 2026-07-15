import { NextRequest, NextResponse } from "next/server";
import { getObserverByToken, addObserverFeedback } from "@/lib/data";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const observer = await getObserverByToken(token);
  if (!observer) {
    return NextResponse.json({ error: "Invalid observer link." }, { status: 404 });
  }

  const { skillId, note } = await request.json();
  if (!note || !String(note).trim()) {
    return NextResponse.json({ error: "note is required." }, { status: 400 });
  }

  await addObserverFeedback(observer.id, skillId ? Number(skillId) : null, null, String(note).trim());
  return NextResponse.json({ ok: true });
}
