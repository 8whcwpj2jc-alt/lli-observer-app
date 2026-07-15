import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PRACTITIONER_GUIDE_CLIENT, PRACTITIONER_GUIDE_PARTICIPANT } from "@/lib/content";

export default async function PractitionerGuidePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Practitioner Guide</h1>
      <p className="text-stone-500 mb-8">Your own reference — not shown to participants.</p>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-stone-700 mb-3">Client interactions</h2>
        <div className="space-y-4">
          {PRACTITIONER_GUIDE_CLIENT.map((item) => (
            <div key={item.heading}>
              <h3 className="font-medium text-stone-800 mb-1">{item.heading}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-stone-700 mb-3">Participant interactions</h2>
        <div className="space-y-4">
          {PRACTITIONER_GUIDE_PARTICIPANT.map((item) => (
            <div key={item.heading}>
              <h3 className="font-medium text-stone-800 mb-1">{item.heading}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
