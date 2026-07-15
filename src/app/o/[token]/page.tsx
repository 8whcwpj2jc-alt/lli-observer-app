import { notFound } from "next/navigation";
import { getObserverByToken, getFeedbackForObserver, getAllSkills } from "@/lib/data";
import { OBSERVER_COMMITMENT } from "@/lib/content";
import { ObserverFeedbackForm } from "@/components/ObserverFeedbackForm";

export default async function ObserverPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const observer = await getObserverByToken(token);
  if (!observer) notFound();

  const [pastFeedback, skills] = await Promise.all([getFeedbackForObserver(observer.id), getAllSkills()]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <p className="text-sm text-stone-500 mb-1">Observer feedback for</p>
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">{observer.participant_name}</h1>
      <p className="text-stone-500 mb-6">Hi {observer.name} — thank you for being one of their observers.</p>

      <details className="mb-6 text-sm text-stone-600 bg-stone-100 rounded-lg border border-stone-200 p-4">
        <summary className="cursor-pointer font-medium text-stone-700">
          Reminder: what you committed to as an observer
        </summary>
        <p className="mt-2 whitespace-pre-wrap">{OBSERVER_COMMITMENT}</p>
      </details>

      <div className="mb-10">
        <ObserverFeedbackForm token={token} skills={skills} />
      </div>

      {pastFeedback.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-stone-700 mb-3">Feedback you&apos;ve shared before</h2>
          <ul className="space-y-2">
            {pastFeedback.map((f) => (
              <li key={f.id} className="text-sm rounded-md border border-stone-200 bg-white p-3">
                <span className="text-stone-400">{new Date(f.created_at).toLocaleDateString()}</span>
                {f.skill_name ? ` · ${f.skill_name}` : " · General"} — <span className="text-stone-700">{f.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
