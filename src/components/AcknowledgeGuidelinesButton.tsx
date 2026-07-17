"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AcknowledgeGuidelinesButton({ next }: { next: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await fetch("/api/acknowledge-guidelines", { method: "POST" });
      router.push(next);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-dark disabled:opacity-50"
    >
      {loading ? "Continuing..." : "I've read this — continue"}
    </button>
  );
}
