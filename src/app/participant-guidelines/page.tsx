import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PARTICIPANT_GUIDELINES } from "@/lib/content";
import { AcknowledgeGuidelinesButton } from "@/components/AcknowledgeGuidelinesButton";

export default async function ParticipantGuidelinesPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const { next } = await searchParams;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Participant Guidelines</h1>
      <p className="text-stone-500 mb-8">
        {session.guidelinesAcknowledged
          ? "For your reference — you can revisit this anytime from the menu."
          : "Please read this before you begin."}
      </p>

      <div className="space-y-4 mb-8">
        {PARTICIPANT_GUIDELINES.map((para, i) => (
          <p key={i} className="text-stone-600 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {!session.guidelinesAcknowledged && <AcknowledgeGuidelinesButton next={next || "/"} />}
    </div>
  );
}
