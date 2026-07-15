"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LeadershipApproachForm() {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/leadership-approach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      setBody("");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        placeholder="Write your leadership approach as you understand it today..."
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-stone-800 text-white px-4 py-2 text-sm font-medium hover:bg-stone-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save new entry"}
      </button>
    </form>
  );
}
