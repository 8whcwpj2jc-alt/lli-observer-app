import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  getSkillsForTier,
  getRatingsForParticipant,
  getExperimentsForParticipant,
  getHighestUnlockedTier,
  getTierCompletion,
  getTopPriorityForParticipant,
} from "@/lib/data";
import { TIER_META, TIER_INSTRUCTIONS_INTRO, RATING_QUESTION, RATING_SCALE_LEGEND, DESIRE_QUESTION, DESIRE_SCALE_HINT, SCORING_EXPLANATION } from "@/lib/content";
import { TierWizard } from "@/components/TierWizard";

export default async function TierPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const tier = Number(n);
  if (![1, 2, 3, 4].includes(tier)) notFound();

  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const meta = TIER_META[tier as 1 | 2 | 3 | 4];
  const unlockedTier = await getHighestUnlockedTier(session.userId);

  if (tier > unlockedTier) {
    const blockingTier = unlockedTier as 1 | 2 | 3 | 4;
    const blocking = await getTierCompletion(session.userId, blockingTier);
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-sm text-stone-500 mb-1">Tier {tier}</p>
        <h1 className="text-2xl font-semibold text-stone-800 mb-4">{meta.title}</h1>
        <div className="rounded-lg border border-amber-300/60 bg-amber-50/70 backdrop-blur-sm p-6">
          <p className="font-medium text-stone-800 mb-2">Complete Tier {blockingTier} first</p>
          <p className="text-sm text-stone-600 mb-4">
            Each tier builds on the one before it. Finish Tier {blockingTier} ({TIER_META[blockingTier].title}) before
            moving on:
          </p>
          <ul className="text-sm text-stone-600 space-y-1 mb-4 list-disc list-inside">
            <li>
              {blocking.fullyAnsweredSkills} / {blocking.totalSkills} skills fully answered (rating, desire,
              definition, and all three thought questions)
            </li>
            <li>{blocking.hasExperiment ? "An experiment has been added ✓" : "At least one experiment still needed"}</li>
          </ul>
          <Link
            href={`/tier/${blockingTier}`}
            className="inline-block rounded bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Go to Tier {blockingTier} &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const skills = await getSkillsForTier(tier);
  const ratings = await getRatingsForParticipant(session.userId);
  const experiments = await getExperimentsForParticipant(session.userId, tier);
  const topInTier = await getTopPriorityForParticipant(session.userId, 3, tier);

  const skillStates = skills.map((skill) => {
    const r = ratings.get(skill.id);
    return {
      id: skill.id,
      name: skill.name,
      rating: r?.rating ?? null,
      desire: r?.desire ?? null,
      definition: r?.definition ?? "",
      thought1: r?.thought_response_1 ?? "",
      thought2: r?.thought_response_2 ?? "",
      thought3: r?.thought_response_3 ?? "",
    };
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-stone-500 mb-1">Tier {tier}</p>
      <h1 className="text-2xl font-semibold text-stone-800 mb-4">{meta.title}</h1>

      <div className="prose-sm text-stone-600 mb-6 space-y-3">
        <p>{meta.context}</p>
      </div>

      <div className="rounded-lg bg-amber-50/70 backdrop-blur-sm border border-amber-200/60 p-4 mb-6 text-sm text-stone-600 space-y-3">
        <p>{TIER_INSTRUCTIONS_INTRO}</p>
        <div>
          <p className="font-medium text-stone-700">Rating: &ldquo;{RATING_QUESTION}&rdquo;</p>
          <p>{RATING_SCALE_LEGEND.map((r) => `${r.value} = ${r.label}`).join(" · ")}</p>
        </div>
        <div>
          <p className="font-medium text-stone-700">Desire: &ldquo;{DESIRE_QUESTION}&rdquo;</p>
          <p>{DESIRE_SCALE_HINT}</p>
        </div>
        <p>{SCORING_EXPLANATION}</p>
      </div>

      {topInTier.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-stone-700 mb-2">Your top focus areas in this tier</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topInTier.map((p, i) => (
              <div key={p.skill_id} className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-3">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-semibold text-brand">#{i + 1}</span>
                </div>
                <p className="text-sm font-medium text-stone-800 mb-1.5">{p.skill_name}</p>
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden mb-1">
                  <div className="h-full bg-brand" style={{ width: `${(p.score / 25) * 100}%` }} />
                </div>
                <p className="text-xs text-stone-500">
                  Score {p.score} (R{p.rating} &times; D{p.desire})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <TierWizard tier={tier} initialSkills={skillStates} experiments={experiments} />
    </div>
  );
}
