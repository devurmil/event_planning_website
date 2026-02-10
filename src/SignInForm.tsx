"use client";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export function SignInForm() {
  const { login } = useAuth(); // login here expects the credential string now
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (credentialResponse: any) => {
      try {
          if (credentialResponse.credential) {
              // @ts-ignore
              await login(credentialResponse.credential);
              toast.success("Signed in successfully");
              navigate("/admin");
          }
      } catch (err) {
          setError("Authentication failed. Please try again.");
          toast.error("Authentication failed");
      }
  };

  const handleError = () => {
      setError("Google Login Failed");
      toast.error("Google Login Failed");
  };

  return (
    <div className="w-full border border-gray-200 p-6 rounded-lg bg-white shadow-sm flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        <p className="text-gray-600">Enter your credentials to access the admin panel</p>
      </div>
      
      <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
      </div>
      
      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
           Sign in with your Google account
        </p>
      </div>
    </div>
  );
}

