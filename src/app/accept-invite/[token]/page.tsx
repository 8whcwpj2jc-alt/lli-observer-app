import { SetPasswordForm } from "@/components/SetPasswordForm";

export default async function AcceptInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Welcome to Love &ndash; Lead</h1>
        <p className="text-sm text-stone-500 mb-6">Set a password to get started.</p>
        <SetPasswordForm
          token={token}
          endpoint="/api/auth/accept-invite"
          successRedirect="/"
          submitLabel="Set password & sign in"
        />
      </div>
    </div>
  );
}
