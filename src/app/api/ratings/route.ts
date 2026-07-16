import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { upsertRating } from "@/lib/data";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { skillId, rating, desire, definition, thought1, thought2, thought3 } = await request.json();
  if (!skillId) {
    return NextResponse.json({ error: "skillId is required." }, { status: 400 });
  }

  const clamp = (v: unknown) => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    if (Number.isNaN(n) || n < 1 || n > 5) return null;
    return n;
  };

  await upsertRating(
    session.userId,
    Number(skillId),
    clamp(rating),
    clamp(desire),
    definition ?? null,
    thought1 ?? null,
    thought2 ?? null,
    thought3 ?? null
  );

  return NextResponse.json({ ok: true });
}
