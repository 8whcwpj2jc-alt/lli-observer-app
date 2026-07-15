import { RESOURCES } from "@/lib/content";

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-800 mb-1">Resources</h1>
      <p className="text-stone-500 mb-8">Further reading on leadership, referenced throughout this program.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-300 text-stone-500">
              <th className="py-2 pr-4">Year</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {RESOURCES.map((r, i) => (
              <tr key={i} className="border-b border-stone-100">
                <td className="py-2 pr-4 text-stone-500 align-top">{r.year}</td>
                <td className="py-2 pr-4 text-stone-800 align-top">{r.title}</td>
                <td className="py-2 text-stone-600 align-top whitespace-nowrap">{r.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
