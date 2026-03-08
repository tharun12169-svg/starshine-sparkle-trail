import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ADMIN_DEFAULT_KEY = "influencehub_admin_default_theme";
const USER_PREF_KEY = "influencehub_user_theme";

function getAdminDefault(): Theme {
  return (localStorage.getItem(ADMIN_DEFAULT_KEY) as Theme) || "light";
}

function getUserPref(): Theme | null {
  return localStorage.getItem(USER_PREF_KEY) as Theme | null;
}

export function setAdminDefaultTheme(theme: Theme) {
  localStorage.setItem(ADMIN_DEFAULT_KEY, theme);
}

export function getAdminDefaultTheme(): Theme {
  return getAdminDefault();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getUserPref() || getAdminDefault();
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    localStorage.setItem(USER_PREF_KEY, t);
    setThemeState(t);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
