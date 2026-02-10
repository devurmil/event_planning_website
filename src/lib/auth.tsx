import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

interface User {
  email: string;
  name: string;
  picture: string;
  googleId: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for auth state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } catch (e) {
            console.error("Failed to parse stored user", e);
            localStorage.removeItem("user");
        }
    }
    setIsLoading(false);
  }, []);

  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
      try {
          // Get the ID token from the response (or access token if using implicit flow, but we need ID token for backend verification usually)
          // Actually useGoogleLogin with default flow (implicit) returns access_token.
          // Better to use credentialResponse from GoogleLogin component or explicit flow.
          // But to keep it in context, let's use the GoogleLogin component in the form and pass the credential to the context.
          // OR, exposes a function that takes the credential.
      } catch (error) {
          console.error("Login failed", error);
      }
  };
  
  // We will expose a login function that takes the credential string
  const loginWithCredential = async (credential: string) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const data = await response.json();
        const userData = data.user;

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
          console.error("Backend auth error:", error);
          throw error;
      }
  };


  const logout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login: loginWithCredential as any, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function Authenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : null;
}

export function Unauthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : null;
}

// Mock useConvexAuth to maintain compatibility if needed, or just standard hook
export function useConvexAuth() {
    return useAuth();
}
