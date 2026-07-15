import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllParticipantsSummary } from "@/lib/data";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/");

  const participants = await getAllParticipantsSummary();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-stone-800">Participants</h1>
        <Link
          href="/admin/participants/new"
          className="rounded bg-stone-800 text-white px-4 py-2 text-sm font-medium hover:bg-stone-700"
        >
          + Add participant
        </Link>
      </div>

      {participants.length === 0 ? (
        <p className="text-stone-500">No participants yet — add the first one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Tier 1</th>
                <th className="py-2 pr-4">Tier 2</th>
                <th className="py-2 pr-4">Tier 3</th>
                <th className="py-2 pr-4">Tier 4</th>
                <th className="py-2 pr-4">Observers</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-b border-stone-100">
                  <td className="py-2 pr-4 text-stone-800 font-medium">{p.name}</td>
                  <td className="py-2 pr-4 text-stone-500">{p.email}</td>
                  {[1, 2, 3, 4].map((t) => (
                    <td key={t} className="py-2 pr-4 text-stone-600">
                      {p.tierScores[t].rated}/{p.tierScores[t].skillCount}
                    </td>
                  ))}
                  <td className="py-2 pr-4 text-stone-600">{p.observerCount}</td>
                  <td className="py-2">
                    <Link href={`/admin/participants/${p.id}`} className="text-stone-500 hover:underline">
                      View &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
