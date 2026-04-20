import { useTheme, THEMES, type Theme } from "./ThemeProvider";

const THEME_LABELS: Record<Theme, string> = {
  bricks: "Bricks",
  nia: "NIA",
  "c-law": "C-Law",
};

export function ThemeSwitcher() {
  const { theme, setTheme, mode, toggleMode } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card p-2 text-card-foreground">
      <div className="flex gap-1">
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            aria-pressed={theme === t}
            className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
              theme === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {THEME_LABELS[t]}
          </button>
        ))}
      </div>

      <span className="h-6 w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        className="rounded-sm border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {mode === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
