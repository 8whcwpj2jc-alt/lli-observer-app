import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getLeadershipApproachEntries } from "@/lib/data";
import { TIER5_CONTEXT, TIER5_INSTRUCTIONS } from "@/lib/content";
import { LeadershipApproachForm } from "@/components/LeadershipApproachForm";

export default async function LeadershipApproachPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const entries = await getLeadershipApproachEntries(session.userId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-stone-500 mb-1">Tier 5</p>
      <h1 className="text-2xl font-semibold text-stone-800 mb-4">My Leadership Approach</h1>

      <p className="text-stone-600 mb-3">{TIER5_CONTEXT}</p>
      <p className="text-stone-600 mb-8">{TIER5_INSTRUCTIONS}</p>

      <div className="mb-10">
        <LeadershipApproachForm />
      </div>

      {entries.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-stone-700 mb-3">History</h2>
          <ul className="space-y-4">
            {entries.map((entry, i) => (
              <li key={entry.id} className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4">
                <p className="text-xs text-stone-400 mb-2">
                  {i === 0 ? "Current — " : ""}
                  {new Date(entry.created_at).toLocaleString()}
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{entry.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
