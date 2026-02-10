"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight } from "lucide-react";

type AuthTab = "login" | "register";

export default function AuthPage() {
  const { login, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const validateGmail = (email: string) => {
    return email.toLowerCase().endsWith("@gmail.com");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateGmail(formData.email)) {
      toast.error("Only @gmail.com emails are allowed");
      return;
    }

    if (activeTab === "register" && formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = activeTab === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      updateUser(data.user);
      toast.success(activeTab === "login" ? "Logged in successfully" : "Account created successfully");
      void navigate("/admin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      if (credentialResponse.credential) {
        await login(credentialResponse.credential);
        toast.success("Signed in with Google successfully");
        void navigate("/admin");
      }
    } catch {
      toast.error("Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Tab Selection */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 text-sm font-semibold transition-all ${
              activeTab === "login" ? "text-purple-600 bg-white" : "text-gray-500 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-4 text-sm font-semibold transition-all ${
              activeTab === "register" ? "text-purple-600 bg-white" : "text-gray-500 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === "login" ? "Welcome Back" : "Join EventSphere"}
            </h1>
            <p className="text-gray-500 text-sm">
              {activeTab === "login" ? "Enter your credentials to access your account" : "Sign up with your Gmail to start planning events"}
            </p>
          </div>

          <form onSubmit={(e) => { void handleEmailAuth(e); }} className="space-y-4 mb-8">
            {activeTab === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Gmail Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {activeTab === "login" ? "Sign In" : "Sign Up"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-xs shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden border border-gray-100">
              <GoogleLogin
                onSuccess={(response) => { void handleGoogleSuccess(response); }}
                onError={() => toast.error("Google Login Failed")}
                useOneTap
                theme="outline"
                shape="pill"
                width="100%"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to EventSphere's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
