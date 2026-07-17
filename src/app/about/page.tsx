import { APP_NAME, APP_TAGLINE, BACKGROUND_RATIONALE } from "@/lib/content";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-stone-800">{APP_NAME}</h1>
      <p className="text-stone-500 mb-8">{APP_TAGLINE}</p>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-stone-800">Background &amp; Rationale</h2>
        {BACKGROUND_RATIONALE.map((section) => (
          <div key={section.heading}>
            <h3 className="text-lg font-medium text-stone-700 mb-2">{section.heading}</h3>
            {section.body.map((para, i) => (
              <p key={i} className="text-stone-600 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
