import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getObserversForParticipant, getObserverFeedbackForParticipant } from "@/lib/data";
import { AddObserverForm } from "@/components/AddObserverForm";

export default async function ObserversPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const observers = await getObserversForParticipant(session.userId);
  const allFeedback = await getObserverFeedbackForParticipant(session.userId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Observers</h1>
      <p className="text-stone-500 mb-2">
        People you&apos;ve chosen to give you real, day-to-day feedback on your journey.
      </p>
      <p className="text-stone-500 mb-6 text-sm">
        Not sure who to pick? See the <Link href="/selection-guide" className="underline">observer selection guide</Link>.
      </p>

      <div className="mb-8">
        <AddObserverForm participantName={session.name} />
      </div>

      <div className="space-y-4">
        {observers.map((o) => {
          const theirFeedback = allFeedback.filter((f) => f.observer_id === o.id);
          return (
            <div key={o.id} className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-stone-800">{o.name}</h3>
                <span className="text-xs rounded-full px-2 py-0.5 bg-stone-100 text-stone-500">{o.status}</span>
              </div>
              {o.note && <p className="text-sm text-stone-500 mb-2">{o.note}</p>}
              {theirFeedback.length === 0 ? (
                <p className="text-sm text-stone-400">No feedback submitted yet.</p>
              ) : (
                <ul className="space-y-1.5 mt-2">
                  {theirFeedback.map((f) => (
                    <li key={f.id} className="text-sm text-stone-600 border-t border-stone-100 pt-1.5">
                      <span className="text-stone-400">{new Date(f.created_at).toLocaleDateString()}</span>
                      {f.skill_name ? ` · ${f.skill_name}` : ""} — {f.note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        {observers.length === 0 && (
          <p className="text-stone-500 text-sm">No observers yet — add your first one above.</p>
        )}
      </div>
    </div>
  );
}
