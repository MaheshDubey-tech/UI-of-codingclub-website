"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
export type UserRole = "member" | "core" | "admin";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [role, setRoleState] = useState<UserRole>("admin"); // Default to admin so all features are visible by default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedRole = localStorage.getItem("role") as UserRole | null;
    if (savedRole) {
      setRoleState(savedRole);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
