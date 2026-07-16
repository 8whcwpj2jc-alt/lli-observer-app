import { OBSERVER_SELECTION_CONSIDERATIONS, PARTICIPANT_COMMITMENT, OBSERVER_COMMITMENT } from "@/lib/content";

export default function SelectionGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Choosing Your Observers</h1>
      <p className="text-stone-500 mb-8">
        This is not a passive decision. Choose people you can be genuinely open with, and who won&apos;t be defensive
        about giving you honest feedback. Asking someone to be an observer is meaningful — let them know what it
        means to you to have them on this journey.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-stone-700 mb-3">What to look for</h2>
        <ul className="list-disc list-inside space-y-2 text-stone-600">
          {OBSERVER_SELECTION_CONSIDERATIONS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-medium text-stone-700 mb-3">Your commitment to your observers</h2>
        <p className="text-stone-600 whitespace-pre-wrap bg-white/80 backdrop-blur-sm border border-stone-200 rounded-lg p-4">
          {PARTICIPANT_COMMITMENT}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium text-stone-700 mb-3">What your observers are committing to</h2>
        <p className="text-stone-600 whitespace-pre-wrap bg-white/80 backdrop-blur-sm border border-stone-200 rounded-lg p-4">
          {OBSERVER_COMMITMENT}
        </p>
      </section>
    </div>
  );
}
