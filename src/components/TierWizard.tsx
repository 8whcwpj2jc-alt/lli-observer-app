"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RATING_SCALE_LEGEND,
  THOUGHT_QUESTIONS,
  THOUGHT_QUESTION_EXAMPLES,
  DEFINITION_EXAMPLE,
} from "@/lib/content";
import { ExperimentSection } from "./ExperimentSection";

type SkillState = {
  id: number;
  name: string;
  rating: number | null;
  desire: number | null;
  definition: string;
  thought1: string;
  thought2: string;
  thought3: string;
};

type Experiment = {
  id: number;
  description: string;
  status: string;
  created_at: string;
};

export function TierWizard({
  tier,
  initialSkills,
  experiments,
}: {
  tier: number;
  initialSkills: SkillState[];
  experiments: Experiment[];
}) {
  const router = useRouter();
  const [skills, setSkills] = useState(initialSkills);
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const totalSteps = skills.length + 1; // + Experiment step
  const onExperimentStep = index === skills.length;
  const current = skills[Math.min(index, skills.length - 1)];
  const score = current.rating && current.desire ? current.rating * current.desire : null;

  async function save(updated: SkillState) {
    setSaving(true);
    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillId: updated.id,
          rating: updated.rating,
          desire: updated.desire,
          definition: updated.definition,
          thought1: updated.thought1,
          thought2: updated.thought2,
          thought3: updated.thought3,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  function updateLocal(field: keyof SkillState, value: string | number | null) {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function updateAndSave(field: keyof SkillState, value: string | number | null) {
    const updated = { ...skills[index], [field]: value };
    setSkills((prev) => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
    save(updated);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm text-stone-500">
        <span>
          {onExperimentStep ? "Final step" : `Skill ${index + 1} of ${skills.length}`} &middot; Step {index + 1} of{" "}
          {totalSteps}
        </span>
        <span className="h-4">{saving ? "Saving..." : ""}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.map((s, i) => {
          const answered = s.rating !== null && s.desire !== null;
          const isCurrent = i === index && !onExperimentStep;
          return (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              title={s.name}
              className={`h-7 min-w-7 px-1.5 rounded-full text-xs font-medium border transition ${
                isCurrent
                  ? "bg-brand text-white border-brand"
                  : answered
                    ? "bg-brand/15 text-brand border-brand/30 hover:border-brand/60"
                    : "bg-white/60 text-stone-500 border-stone-300 hover:border-stone-400"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          onClick={() => setIndex(skills.length)}
          title="Experiment: strategies & actions"
          className={`h-7 px-2.5 rounded-full text-xs font-medium border transition ${
            onExperimentStep
              ? "bg-brand text-white border-brand"
              : "bg-white/60 text-stone-500 border-stone-300 hover:border-stone-400"
          }`}
        >
          &#10003;
        </button>
      </div>

      {onExperimentStep ? (
        <ExperimentSection tier={tier} experiments={experiments} />
      ) : (
        <div className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-medium text-stone-800">{current.name}</h3>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-1.5 text-stone-600">
                Rating
                <select
                  value={current.rating ?? ""}
                  onChange={(e) => updateAndSave("rating", e.target.value ? Number(e.target.value) : null)}
                  className="rounded border border-stone-300 px-1.5 py-1"
                >
                  <option value="">–</option>
                  {RATING_SCALE_LEGEND.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.value}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-1.5 text-stone-600">
                Desire
                <select
                  value={current.desire ?? ""}
                  onChange={(e) => updateAndSave("desire", e.target.value ? Number(e.target.value) : null)}
                  className="rounded border border-stone-300 px-1.5 py-1"
                >
                  <option value="">–</option>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <span className="text-stone-500">
                Score: <span className="font-medium text-stone-700">{score ?? "–"}</span>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Define this skill in your own words</label>
            <textarea
              value={current.definition}
              onChange={(e) => updateLocal("definition", e.target.value)}
              onBlur={() => save(skills[index])}
              placeholder={DEFINITION_EXAMPLE}
              rows={3}
              className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>

          {THOUGHT_QUESTIONS.map((q, i) => {
            const field = (["thought1", "thought2", "thought3"] as const)[i];
            return (
              <div key={i}>
                <label className="block text-sm font-medium text-stone-700 mb-1">{q}</label>
                <textarea
                  value={current[field]}
                  onChange={(e) => updateLocal(field, e.target.value)}
                  onBlur={() => save(skills[index])}
                  placeholder={THOUGHT_QUESTION_EXAMPLES[i]}
                  rows={2}
                  className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          &larr; Previous
        </button>
        {onExperimentStep ? (
          <button
            onClick={() => router.push("/")}
            className="rounded bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Back to dashboard
          </button>
        ) : (
          <button
            onClick={() => setIndex((i) => Math.min(totalSteps - 1, i + 1))}
            className="rounded bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
