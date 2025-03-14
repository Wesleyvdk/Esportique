"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_NAME } from "./cookies";

type TeamUser = {
  created_at: string;
  deleted_at: string | null;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  team: Team;
  team_id: string;
  updated_at: string;
};

type Team = {
  created_at: string;
  deleted_at: string | null;
  handle: string;
  id: string;
  logo?: string;
  name: string;
  updated_at: string;
};

type AuthContextType = {
  teamData: TeamUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [teamData, setTeamData] = useState<TeamUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include", // Important for cookies
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          setTeamData(data.user);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setToken(data.token);
      setTeamData(data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("team_token");
    localStorage.removeItem("team");
    setToken(null);
    setTeamData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        teamData,
        token,
        isLoading,
        isAuthenticated: !!teamData && !!token,
        login,
        logout,
      }}
    >
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
