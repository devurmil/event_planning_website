import { createContext, useContext } from "react";

export interface User {
  email: string;
  name: string;
  picture: string;
  googleId: string;
  role: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credential: string) => Promise<User>;
  logout: () => void;
  updateUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useConvexAuth() {
  return useAuth();
}
