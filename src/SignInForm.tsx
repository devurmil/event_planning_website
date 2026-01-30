"use client";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function SignInForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        <p className="text-gray-600">Enter your credentials to access the admin panel</p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          // Simulate network delay
          setTimeout(() => {
            login();
            toast.success("Signed in successfully");
            navigate("/admin");
            setSubmitting(false);
          }, 500);
        }}
      >
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="email"
          name="email"
          placeholder="Email (any)"
          required
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          name="password"
          placeholder="Password (any)"
          required
        />
        <button 
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50" 
            type="submit" 
            disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
           (This is a mock login. Any email/password will work)
        </p>
      </div>
    </div>
  );
}

