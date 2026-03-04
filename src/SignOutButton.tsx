"use client";
import { useAuth } from "@/lib/auth-context";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
    >
      <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
      Sign Out
    </button>
  );
}
