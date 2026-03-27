import { createContext, useContext } from "react";
import type { User } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  register: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authData = useFirebaseAuth();

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
}