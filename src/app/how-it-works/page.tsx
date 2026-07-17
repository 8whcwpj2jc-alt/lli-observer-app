import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { HOW_IT_WORKS } from "@/lib/content";

export default async function HowItWorksPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">How This App Works</h1>
      <p className="text-stone-500 mb-8">
        A quick guide to navigating the app itself. For the leadership content and framing behind it, see{" "}
        <Link href="/participant-guidelines" className="underline">
          Participant Guidelines
        </Link>{" "}
        instead.
      </p>

      <div className="space-y-6">
        {HOW_IT_WORKS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-medium text-stone-700 mb-1">{section.heading}</h2>
            <p className="text-stone-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
