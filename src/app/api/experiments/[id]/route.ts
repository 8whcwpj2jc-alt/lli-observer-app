import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateExperimentStatus } from "@/lib/data";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();
  if (!["active", "completed", "abandoned"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  await updateExperimentStatus(session.userId, Number(id), status);
  return NextResponse.json({ ok: true });
}
