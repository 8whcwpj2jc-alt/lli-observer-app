"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewParticipantPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setLink(data.link);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-6">Add a participant</h1>

      {link ? (
        <div className="rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-stone-700 mb-2">
            Participant created. If Resend is configured, an invite email was sent automatically. Otherwise, share
            this link with them directly:
          </p>
          <p className="text-sm text-stone-600 break-all bg-stone-50 border border-stone-200 rounded p-2 mb-4">
            {link}
          </p>
          <div className="flex gap-3">
            <Link href="/admin" className="text-sm text-stone-500 hover:underline">
              &larr; Back to participants
            </Link>
            <button
              onClick={() => {
                setLink(null);
                setName("");
                setEmail("");
              }}
              className="text-sm text-stone-500 hover:underline"
            >
              Add another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-stone-800 text-white py-2 text-sm font-medium hover:bg-stone-700 disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create & send invite"}
          </button>
        </form>
      )}
    </div>
  );
}
