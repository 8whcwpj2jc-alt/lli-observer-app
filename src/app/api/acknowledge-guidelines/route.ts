import { NextResponse } from "next/server";
import { getSession, setSessionCookie } from "@/lib/session";
import { acknowledgeGuidelines } from "@/lib/data";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  await acknowledgeGuidelines(session.userId);

  await setSessionCookie({ ...session, guidelinesAcknowledged: true });

  return NextResponse.json({ ok: true });
}
