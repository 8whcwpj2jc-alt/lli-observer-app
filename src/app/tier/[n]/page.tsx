import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getSkillsForTier, getRatingsForParticipant, getExperimentsForParticipant } from "@/lib/data";
import { TIER_META, TIER_INSTRUCTIONS_INTRO, RATING_QUESTION, RATING_SCALE_LEGEND, DESIRE_QUESTION, DESIRE_SCALE_HINT, SCORING_EXPLANATION, THOUGHT_QUESTIONS } from "@/lib/content";
import { SkillRatingRow } from "@/components/SkillRatingRow";
import { ExperimentSection } from "@/components/ExperimentSection";

export default async function TierPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const tier = Number(n);
  if (![1, 2, 3, 4].includes(tier)) notFound();

  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  const meta = TIER_META[tier as 1 | 2 | 3 | 4];
  const skills = await getSkillsForTier(tier);
  const ratings = await getRatingsForParticipant(session.userId);
  const experiments = await getExperimentsForParticipant(session.userId, tier);

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
        <div>
          <p className="font-medium text-stone-700">Thought questions to answer for each skill:</p>
          <ol className="list-decimal list-inside">
            {THOUGHT_QUESTIONS.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {skills.map((skill) => {
          const r = ratings.get(skill.id);
          return (
            <SkillRatingRow
              key={skill.id}
              skillId={skill.id}
              name={skill.name}
              initialRating={r?.rating ?? null}
              initialDesire={r?.desire ?? null}
              initialNotes={r?.notes ?? null}
            />
          );
        })}
      </div>

      <ExperimentSection tier={tier} experiments={experiments} />
    </div>
  );
}
