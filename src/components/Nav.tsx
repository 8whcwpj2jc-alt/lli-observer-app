import Link from "next/link";
import { getSession } from "@/lib/session";
import { getHighestUnlockedTier } from "@/lib/data";
import { LogoutButton } from "./LogoutButton";

const ADMIN_LINKS = [
  { href: "/admin", label: "Participants" },
  { href: "/admin/practitioner-guide", label: "Practitioner Guide" },
];

export async function Nav() {
  const session = await getSession();
  if (!session) return null;

  let participantLinks: { href: string; label: string; locked?: boolean }[] = [];
  if (session.role !== "admin") {
    const unlockedTier = await getHighestUnlockedTier(session.userId);
    participantLinks = [
      { href: "/", label: "Dashboard" },
      { href: "/how-it-works", label: "How This App Works" },
      { href: "/tier/1", label: "Tier 1", locked: 1 > unlockedTier },
      { href: "/tier/2", label: "Tier 2", locked: 2 > unlockedTier },
      { href: "/tier/3", label: "Tier 3", locked: 3 > unlockedTier },
      { href: "/tier/4", label: "Tier 4", locked: 4 > unlockedTier },
      { href: "/leadership-approach", label: "Leadership Approach", locked: 5 > unlockedTier },
      { href: "/observers", label: "Observers" },
      { href: "/resources", label: "Resources" },
      { href: "/about", label: "About" },
      { href: "/participant-guidelines", label: "Participant Guidelines" },
    ];
  }

  const links = session.role === "admin" ? ADMIN_LINKS : participantLinks;

  return (
    <header className="border-b border-stone-200/70 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={session.role === "admin" ? "/admin" : "/"} className="font-semibold text-brand shrink-0">
          Love &ndash; Lead
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 flex-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand hover:underline">
              {l.label}
              {"locked" in l && l.locked ? " \u{1F512}" : ""}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-stone-500 shrink-0">
          <span>{session.name}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
