import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { addExperiment } from "@/lib/data";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { tier, skillId, description } = await request.json();
  if (!tier || !description || !String(description).trim()) {
    return NextResponse.json({ error: "tier and description are required." }, { status: 400 });
  }

  await addExperiment(session.userId, Number(tier), skillId ? Number(skillId) : null, String(description).trim());

  return NextResponse.json({ ok: true });
}
