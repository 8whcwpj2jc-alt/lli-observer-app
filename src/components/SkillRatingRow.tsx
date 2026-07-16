"use client";

import { useState } from "react";
import { RATING_SCALE_LEGEND } from "@/lib/content";

export function SkillRatingRow({
  skillId,
  name,
  initialRating,
  initialDesire,
  initialNotes,
}: {
  skillId: number;
  name: string;
  initialRating: number | null;
  initialDesire: number | null;
  initialNotes: string | null;
}) {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [desire, setDesire] = useState<number | null>(initialDesire);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const score = rating && desire ? rating * desire : null;

  async function save(nextRating: number | null, nextDesire: number | null, nextNotes: string) {
    setSaving(true);
    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId, rating: nextRating, desire: nextDesire, notes: nextNotes }),
      });
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h3 className="font-medium text-stone-800">{name}</h3>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-1.5 text-stone-600">
            Rating
            <select
              value={rating ?? ""}
              onChange={(e) => {
                const v = e.target.value ? Number(e.target.value) : null;
                setRating(v);
                save(v, desire, notes);
              }}
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
              value={desire ?? ""}
              onChange={(e) => {
                const v = e.target.value ? Number(e.target.value) : null;
                setDesire(v);
                save(rating, v, notes);
              }}
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
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={() => save(rating, desire, notes)}
        placeholder="Define this skill in your own words, your rationale, and your answers to the thought questions above..."
        rows={3}
        className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
      <div className="text-xs text-stone-400 mt-1 h-4">
        {saving ? "Saving..." : savedAt ? "Saved" : ""}
      </div>
    </div>
  );
}
