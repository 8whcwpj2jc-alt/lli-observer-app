"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Skill = { id: number; tier: number; name: string };

export function ObserverFeedbackForm({ token, skills }: { token: string; skills: Skill[] }) {
  const router = useRouter();
  const [skillId, setSkillId] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/observer/${token}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: skillId || null, note }),
      });
      if (res.ok) {
        setNote("");
        setSkillId("");
        setSubmitted(true);
        router.refresh();
        setTimeout(() => setSubmitted(false), 3000);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white/80 backdrop-blur-sm rounded-lg border border-stone-200 p-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          What skill or attribute is this about? (optional)
        </label>
        <select
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
          className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
        >
          <option value="">General feedback</option>
          {[1, 2, 3, 4].map((tier) => (
            <optgroup key={tier} label={`Tier ${tier}`}>
              {skills
                .filter((s) => s.tier === tier)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Your feedback</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="What did you observe? Stick to what you actually saw or heard, not general impressions."
          className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-dark disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send feedback"}
      </button>
      {submitted && <p className="text-sm text-green-700">Thank you — your feedback has been shared.</p>}
    </form>
  );
}
