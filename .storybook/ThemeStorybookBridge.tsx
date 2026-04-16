import { useLayoutEffect, type ReactNode } from "react";
import { useTheme, type Mode, type Theme } from "../src/theme/ThemeProvider";

export function ThemeStorybookBridge({
  theme,
  mode,
  children,
}: {
  theme: Theme;
  mode: Mode;
  children: ReactNode;
}) {
  const { setTheme, setMode } = useTheme();
  useLayoutEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  useLayoutEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return <>{children}</>;
}

export function storybookThemeFromGlobal(value: unknown): Theme {
  if (value === "c-law" || value === "nia") return value;
  return "bricks";
}

export function storybookModeFromGlobal(value: unknown): Mode {
  return value === "dark" ? "dark" : "light";
}
