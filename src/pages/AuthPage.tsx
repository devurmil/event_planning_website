"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, Sparkles } from "lucide-react";

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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (activeTab === "register") {
        toast.success("Account created successfully. Please sign in.");
        setActiveTab("login");
        setFormData({ ...formData, password: "" });
      } else {
        updateUser(data.user);
        toast.success("Logged in successfully");

        if (data.user.role === "admin") {
          void navigate("/admin");
        } else {
          void navigate("/");
        }
      }
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
        const user = await login(credentialResponse.credential);
        toast.success("Signed in with Google successfully");
        if (user.role === "admin") {
          void navigate("/admin");
        } else {
          void navigate("/");
        }
      }
    } catch {
      toast.error("Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Decorative Image Side - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">EventSphere</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Crafting events that <span className="text-purple-400">inspire</span> and <span className="text-pink-400">connect</span>.
            </h1>
            <p className="text-lg text-gray-300">
              Join thousands of planners creating unforgettable experiences. From intimate gatherings to grand celebrations, we bring your vision to life.
            </p>
          </div>

          <div className="text-sm text-gray-400 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p>Joined by 10,000+ creators</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-gray-50/50">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">

          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center justify-center p-3 bg-purple-100 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {activeTab === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === "login"
                ? "Enter your details to access your dashboard."
                : "Enter your details to get started with EventSphere."}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex p-1 bg-gray-100/80 rounded-xl mb-8 relative">
            <div
              className={`absolute inset-y-1 w-1/2 bg-white shadow-sm rounded-lg transition-all duration-300 ease-in-out transform ${activeTab === "register" ? "translate-x-full" : "translate-x-0"}`}
            />
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 overflow-hidden relative z-10 py-2.5 text-sm font-medium rounded-lg transition-colors text-center ${activeTab === "login" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 overflow-hidden relative z-10 py-2.5 text-sm font-medium rounded-lg transition-colors text-center ${activeTab === "register" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { void handleEmailAuth(e); }} className="space-y-5">
            {activeTab === "register" && (
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {activeTab === "login" ? "Sign in" : "Create account"}
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={(response) => { void handleGoogleSuccess(response); }}
                  onError={() => toast.error("Google Login Failed")}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  text={activeTab === 'login' ? 'signin_with' : 'signup_with'}
                  width="350"
                  logo_alignment="center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
