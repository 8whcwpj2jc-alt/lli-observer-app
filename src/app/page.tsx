import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  getSkillsForTier,
  getRatingsForParticipant,
  getObserversForParticipant,
  getObserverFeedbackForParticipant,
  getExperimentsForParticipant,
} from "@/lib/data";
import { TIER_META } from "@/lib/content";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const ratings = await getRatingsForParticipant(session.userId);
  const tiers = [1, 2, 3, 4] as const;

  const tierSummaries = await Promise.all(
    tiers.map(async (tier) => {
      const skills = await getSkillsForTier(tier);
      let rated = 0;
      let total = 0;
      for (const s of skills) {
        const r = ratings.get(s.id);
        if (r && r.rating && r.desire) {
          rated += 1;
          total += r.rating * r.desire;
        }
      }
      return { tier, skillCount: skills.length, rated, total };
    })
  );

  const observers = await getObserversForParticipant(session.userId);
  const feedback = await getObserverFeedbackForParticipant(session.userId);
  const experiments = await getExperimentsForParticipant(session.userId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Welcome back, {session.name.split(" ")[0]}</h1>
      <p className="text-stone-500 mb-8">Here&apos;s where your journey stands.</p>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-stone-700 mb-3">Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tierSummaries.map(({ tier, skillCount, rated, total }) => (
            <Link
              key={tier}
              href={`/tier/${tier}`}
              className="block rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4 hover:border-stone-400 transition"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-medium text-stone-800">
                  Tier {tier}: {TIER_META[tier].title}
                </span>
                <span className="text-sm text-stone-500">
                  {rated}/{skillCount} rated
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-brand"
                  style={{ width: `${skillCount ? (rated / skillCount) * 100 : 0}%` }}
                />
              </div>
              {rated > 0 && (
                <p className="text-xs text-stone-500 mt-2">Combined score so far: {total}</p>
              )}
            </Link>
          ))}
        </div>
        <Link
          href="/leadership-approach"
          className="block mt-4 rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4 hover:border-stone-400 transition"
        >
          <span className="font-medium text-stone-800">Tier 5: My Leadership Approach</span>
        </Link>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-stone-700">Observers</h2>
          <Link href="/observers" className="text-sm text-stone-500 hover:underline">
            Manage &rarr;
          </Link>
        </div>
        {observers.length === 0 ? (
          <p className="text-stone-500 text-sm">
            You haven&apos;t added any observers yet. <Link href="/observers" className="underline">Add one</Link> to start collecting real-world feedback.
          </p>
        ) : (
          <p className="text-stone-600 text-sm">
            {observers.length} observer{observers.length === 1 ? "" : "s"} &middot; {feedback.length} piece{feedback.length === 1 ? "" : "s"} of feedback received
          </p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium text-stone-700 mb-3">Recent activity</h2>
        {experiments.length === 0 && feedback.length === 0 ? (
          <p className="text-stone-500 text-sm">Nothing yet — rate a few skills or add an observer to get started.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {feedback.slice(0, 5).map((f) => (
              <li key={`f-${f.id}`} className="rounded-md border border-stone-200 bg-white/80 backdrop-blur-sm p-3">
                <span className="text-stone-500">{new Date(f.created_at).toLocaleDateString()}</span>
                {" — "}
                <span className="font-medium">{f.observer_name}</span> shared feedback
                {f.skill_name ? ` on ${f.skill_name}` : ""}: <span className="text-stone-600">{f.note}</span>
              </li>
            ))}
            {experiments.slice(0, 5).map((e) => (
              <li key={`e-${e.id}`} className="rounded-md border border-stone-200 bg-white/80 backdrop-blur-sm p-3">
                <span className="text-stone-500">{new Date(e.created_at).toLocaleDateString()}</span>
                {" — "}
                Experiment (Tier {e.tier}, {e.status}): <span className="text-stone-600">{e.description}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
