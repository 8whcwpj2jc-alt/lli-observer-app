import { SetPasswordForm } from "@/components/SetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-stone-800 mb-6">Choose a new password</h1>
        <SetPasswordForm
          token={token}
          endpoint="/api/auth/reset-password"
          successRedirect="/login"
          submitLabel="Reset password"
        />
      </div>
    </div>
  );
}
