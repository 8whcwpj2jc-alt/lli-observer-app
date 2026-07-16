"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Experiment = {
  id: number;
  description: string;
  status: string;
  created_at: string;
};

export function ExperimentSection({ tier, experiments }: { tier: number; experiments: Experiment[] }) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/experiments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, description }),
      });
      setDescription("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/experiments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4">
      <h3 className="font-medium text-stone-800 mb-1">Experiment: strategies &amp; actions</h3>
      <p className="text-sm text-stone-500 mb-3">
        Turn what you found above into a concrete strategy or action for this tier.
      </p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Ask for feedback after every 1:1 this month"
          className="flex-1 rounded border border-stone-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-brand text-white px-3 py-1.5 text-sm font-medium hover:bg-brand-dark disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {experiments.length > 0 && (
        <ul className="space-y-2">
          {experiments.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-3 text-sm border-t border-stone-100 pt-2">
              <span className={e.status === "completed" ? "line-through text-stone-400" : "text-stone-700"}>
                {e.description}
              </span>
              <select
                value={e.status}
                onChange={(ev) => updateStatus(e.id, ev.target.value)}
                className="rounded border border-stone-300 px-1.5 py-1 text-xs shrink-0"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
