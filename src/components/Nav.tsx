import Link from "next/link";
import { getSession } from "@/lib/session";
import { LogoutButton } from "./LogoutButton";

const PARTICIPANT_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/tier/1", label: "Tier 1" },
  { href: "/tier/2", label: "Tier 2" },
  { href: "/tier/3", label: "Tier 3" },
  { href: "/tier/4", label: "Tier 4" },
  { href: "/leadership-approach", label: "Leadership Approach" },
  { href: "/observers", label: "Observers" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const ADMIN_LINKS = [
  { href: "/admin", label: "Participants" },
  { href: "/admin/practitioner-guide", label: "Practitioner Guide" },
];

export async function Nav() {
  const session = await getSession();
  if (!session) return null;

  const links = session.role === "admin" ? ADMIN_LINKS : PARTICIPANT_LINKS;

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={session.role === "admin" ? "/admin" : "/"} className="font-semibold text-stone-800 shrink-0">
          Love &ndash; Lead
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 flex-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-stone-900 hover:underline">
              {l.label}
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
