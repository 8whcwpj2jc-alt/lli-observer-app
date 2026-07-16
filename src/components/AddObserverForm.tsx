"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddObserverForm({ participantName }: { participantName: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ link: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/observers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note }),
      });
      const data = await res.json();
      if (res.ok) {
        const email = `Dear ${name},

I am reaching out to invite you to join my team of observers during my journey of change and growth on the Observer app. Please know this is a deeply meaningful and powerful journey, and this request comes to you as an expression of my respect for you and our relationship.

What am I asking you to do for me?

To observe me in our normal day-to-day interactions and provide feedback based on valid information — not conjecture or opinion — using the Observer app. To have open dialogue with me whenever necessary, and help me develop experiments and actions to more fully realize specific character traits and skills I choose to pursue in my personal and professional life.

Click here to go to Observer and confirm you'll be an observer, review and commit to the Observer Commitment, and then let's connect to discuss next steps:
${data.link}

Thank you so much for being willing to help me — I look forward to taking this journey with you.

Sincerely,
${participantName}`;
        setResult({ link: data.link, email });
        setName("");
        setNote("");
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function copyEmail() {
    if (!result) return;
    await navigator.clipboard.writeText(result.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white/80 backdrop-blur-sm p-4">
      <h3 className="font-medium text-stone-800 mb-3">Add an observer</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="rounded border border-stone-300 px-2 py-1.5 text-sm flex-1 min-w-[140px]"
        />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional — e.g. how you know them)"
          className="rounded border border-stone-300 px-2 py-1.5 text-sm flex-1 min-w-[140px]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-brand text-white px-3 py-1.5 text-sm font-medium hover:bg-brand-dark disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {result && (
        <div className="mt-4 rounded-md bg-stone-50 border border-stone-200 p-3">
          <p className="text-sm font-medium text-stone-700 mb-1">Their private link:</p>
          <p className="text-sm text-stone-600 break-all mb-3">{result.link}</p>
          <p className="text-sm font-medium text-stone-700 mb-1">Ready-to-copy invite email:</p>
          <pre className="text-xs text-stone-600 whitespace-pre-wrap bg-white/80 backdrop-blur-sm border border-stone-200 rounded p-2 mb-2">
            {result.email}
          </pre>
          <button
            onClick={copyEmail}
            className="rounded border border-stone-300 px-3 py-1 text-xs hover:bg-stone-100"
          >
            {copied ? "Copied!" : "Copy email text"}
          </button>
        </div>
      )}
    </div>
  );
}
