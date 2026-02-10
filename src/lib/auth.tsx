import { useState, useEffect, ReactNode } from "react";
import { googleLogout } from '@react-oauth/google';
import { AuthContext, User, useAuth } from "./auth-context";

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

  // We will expose a login function that takes the credential string
  const loginWithCredential = async (credential: string) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/google', {
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

  const updateUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login: loginWithCredential, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hooks are now in auth-context.tsx to avoid HMR issues

export function Authenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : null;
}

export function Unauthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : null;
}

