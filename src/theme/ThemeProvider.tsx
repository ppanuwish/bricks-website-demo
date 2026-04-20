import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const THEMES = ["bricks", "nia", "c-law"] as const;
export type Theme = (typeof THEMES)[number];
export type Mode = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  mode: Mode;
  setTheme: (t: Theme) => void;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = "app-theme";
const MODE_KEY = "app-mode";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "bricks";
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  return saved && (THEMES as readonly string[]).includes(saved) ? saved : "bricks";
}

function getInitialMode(): Mode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(MODE_KEY) as Mode | null;
  if (saved === "light" || saved === "dark") return saved;
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mode, setModeState] = useState<Mode>(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", mode === "dark");
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(MODE_KEY, mode);
  }, [theme, mode]);

  // Sync across browser tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && e.newValue) {
        setThemeState(e.newValue as Theme);
      } else if (e.key === MODE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setModeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value: ThemeContextValue = {
    theme,
    mode,
    setTheme: setThemeState,
    setMode: setModeState,
    toggleMode: () => setModeState((m) => (m === "light" ? "dark" : "light")),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
