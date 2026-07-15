import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  getUserById,
  getSkillsForTier,
  getRatingsForParticipant,
  getExperimentsForParticipant,
  getLeadershipApproachEntries,
  getObserversForParticipant,
  getObserverFeedbackForParticipant,
} from "@/lib/data";
import { TIER_META } from "@/lib/content";

export default async function ParticipantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/");

  const { id } = await params;
  const participantId = Number(id);
  const participant = await getUserById(participantId);
  if (!participant || participant.role !== "participant") notFound();

  const ratings = await getRatingsForParticipant(participantId);
  const tiers = [1, 2, 3, 4] as const;
  const tierData = await Promise.all(
    tiers.map(async (tier) => ({
      tier,
      skills: await getSkillsForTier(tier),
      experiments: await getExperimentsForParticipant(participantId, tier),
    }))
  );
  const leadershipEntries = await getLeadershipApproachEntries(participantId);
  const observers = await getObserversForParticipant(participantId);
  const feedback = await getObserverFeedbackForParticipant(participantId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <p className="text-sm text-stone-500 mb-1">Participant (read-only)</p>
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">{participant.name}</h1>
      <p className="text-stone-500 mb-8">{participant.email}</p>

      {tierData.map(({ tier, skills, experiments }) => (
        <section key={tier} className="mb-10">
          <h2 className="text-lg font-medium text-stone-700 mb-3">
            Tier {tier}: {TIER_META[tier].title}
          </h2>
          <div className="space-y-2">
            {skills.map((s) => {
              const r = ratings.get(s.id);
              const score = r?.rating && r?.desire ? r.rating * r.desire : null;
              return (
                <div key={s.id} className="rounded border border-stone-200 bg-white p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-800">{s.name}</span>
                    <span className="text-stone-500">
                      {r?.rating ?? "–"} / {r?.desire ?? "–"} → score {score ?? "–"}
                    </span>
                  </div>
                  {r?.notes && <p className="text-stone-600 mt-1">{r.notes}</p>}
                </div>
              );
            })}
          </div>
          {experiments.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-stone-600 mb-1">Experiments</p>
              <ul className="text-sm text-stone-600 space-y-1">
                {experiments.map((e) => (
                  <li key={e.id}>
                    [{e.status}] {e.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-lg font-medium text-stone-700 mb-3">Tier 5: My Leadership Approach</h2>
        {leadershipEntries.length === 0 ? (
          <p className="text-sm text-stone-400">Nothing written yet.</p>
        ) : (
          <ul className="space-y-2">
            {leadershipEntries.map((entry, i) => (
              <li key={entry.id} className="rounded border border-stone-200 bg-white p-3 text-sm">
                <p className="text-xs text-stone-400 mb-1">
                  {i === 0 ? "Current — " : ""}
                  {new Date(entry.created_at).toLocaleString()}
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{entry.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium text-stone-700 mb-3">Observers ({observers.length})</h2>
        {observers.map((o) => {
          const theirFeedback = feedback.filter((f) => f.observer_id === o.id);
          return (
            <div key={o.id} className="rounded border border-stone-200 bg-white p-3 text-sm mb-2">
              <div className="flex justify-between">
                <span className="font-medium text-stone-800">{o.name}</span>
                <span className="text-stone-500">{o.status}</span>
              </div>
              {theirFeedback.map((f) => (
                <p key={f.id} className="text-stone-600 mt-1">
                  {new Date(f.created_at).toLocaleDateString()}
                  {f.skill_name ? ` · ${f.skill_name}` : ""}: {f.note}
                </p>
              ))}
            </div>
          );
        })}
      </section>
    </div>
  );
}
