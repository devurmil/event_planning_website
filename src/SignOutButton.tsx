"use client";
import { useAuth } from "@/lib/auth-context";

export function SignOutButton() {
  const { logout } = useAuth();

  return (
    <button
      className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors"
      onClick={() => logout()}
    >
      Sign Out
    </button>
  );
}
