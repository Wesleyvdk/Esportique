"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  attribute?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  enableSystem = true,
  attribute = "data-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.classList.contains("dark")
      ? "dark"
      : "light";

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    } else {
      setTheme(initialColorValue as Theme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme attribute
    if (attribute === "class") {
      root.classList.remove("light", "dark");
    } else {
      root.removeAttribute(attribute);
    }

    // Handle system theme preference
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      if (attribute === "class") {
        root.classList.add(systemTheme);
      } else {
        root.setAttribute(attribute, systemTheme);
      }
    } else {
      // Set theme attribute
      if (attribute === "class") {
        root.classList.add(theme);
      } else {
        root.setAttribute(attribute, theme);
      }
    }

    // Add dark class for dark mode styling
    if (
      theme === "dark" ||
      (theme === "system" &&
        enableSystem &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, attribute, enableSystem]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        const systemTheme = mediaQuery.matches ? "dark" : "light";

        if (attribute === "class") {
          root.classList.remove("light", "dark");
          root.classList.add(systemTheme);
        } else {
          root.setAttribute(attribute, systemTheme);
        }

        if (systemTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, attribute, enableSystem]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
