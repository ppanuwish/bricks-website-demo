import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_LABELS } from "../constants/pages";
import { goToPage } from "../lib/navigation";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "./Button";
import enLogo from "../assets/en-logo.svg";

function ModeSwitch({ className = "" }: { className?: string }) {
  const { mode, setMode } = useTheme();
  const seg =
    "rounded-full px-3 py-1.5 font-body text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  return (
    <div
      className={`inline-flex rounded-full border border-border bg-muted/50 p-0.5 ${className}`}
      role="group"
      aria-label="Color mode"
    >
      <button
        type="button"
        aria-pressed={mode === "light"}
        onClick={() => setMode("light")}
        className={`${seg} ${
          mode === "light"
            ? "bg-card text-foreground shadow-sm"
            : "text-foreground/55 hover:text-foreground"
        }`}
      >
        Light
      </button>
      <button
        type="button"
        aria-pressed={mode === "dark"}
        onClick={() => setMode("dark")}
        className={`${seg} ${
          mode === "dark"
            ? "bg-card text-foreground shadow-sm"
            : "text-foreground/55 hover:text-foreground"
        }`}
      >
        Dark
      </button>
    </div>
  );
}

export function Nav() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"Product" | "Industries" | null>(
    null
  );
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const nav = navRef.current;
      if (!nav) return;
      if (!nav.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const go = (key: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    goToPage((to) => navigate(to), key);
  };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[100] bg-card/50 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10">
        <div
          onClick={() => go("home")}
          className="flex cursor-pointer items-center gap-2.5"
        >
          <img
            src={enLogo}
            alt="Bricks"
            className="h-[26px] w-auto"
            draggable={false}
          />
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center text-foreground md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d={mobileOpen ? "M6 6L18 18M18 6L6 18" : "M4 7H20M4 12H20M4 17H20"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {[
            { label: "Product", items: ["build", "monitor", "optimize"] },
            { label: "Industries", items: ["finserv", "health"] },
          ].map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === group.label
                      ? null
                      : (group.label as "Product" | "Industries")
                  )
                }
                className="inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
              >
                {group.label}
              </button>
              <div
                className={`absolute left-0 top-full min-w-[200px] rounded-lg border border-border bg-card py-1.5 shadow-xl backdrop-blur-md ${
                  openDropdown === group.label ? "block" : "hidden group-hover:block"
                }`}
              >
                {group.items.map((k) => (
                  <div
                    key={k}
                    onClick={() => go(k)}
                    className="cursor-pointer px-5 py-2.5 font-body text-[13px] font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                  >
                    {PAGE_LABELS[k]}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <span
            onClick={() => go("about")}
            className="inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            About
          </span>
          <span
            onClick={() => go("blog")}
            className="inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            Blog
          </span>
          <span
            onClick={() => go("contact")}
            className="inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            Contact Us
          </span>
          <ModeSwitch className="ml-2 shrink-0" />
          <Button onClick={() => go("contact")} className="ml-4" size="sm" variant="default">
            Get started
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card/50 px-6 py-4 text-foreground backdrop-blur-xl backdrop-saturate-150 md:hidden">
          <div className="flex flex-col gap-3 font-body text-sm">
            <button
              type="button"
              onClick={() => go("home")}
              className="text-left transition-colors hover:text-primary"
            >
              Home
            </button>
            <div className="pt-1">
              <p className="mb-2 text-xs uppercase tracking-wide opacity-60">Product</p>
              <div className="flex flex-col gap-2 pl-3">
                {["build", "monitor", "optimize"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => go(k)}
                    className="text-left transition-colors hover:text-primary"
                  >
                    {PAGE_LABELS[k]}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-xs uppercase tracking-wide opacity-60">Industries</p>
              <div className="flex flex-col gap-2 pl-3">
                {["finserv", "health"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => go(k)}
                    className="text-left transition-colors hover:text-primary"
                  >
                    {PAGE_LABELS[k]}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => go("about")}
              className="text-left transition-colors hover:text-primary"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => go("blog")}
              className="text-left transition-colors hover:text-primary"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => go("contact")}
              className="text-left transition-colors hover:text-primary"
            >
              Contact Us
            </button>
            <div className="flex justify-start pt-1">
              <ModeSwitch />
            </div>
            <Button onClick={() => go("contact")} size="sm" fullWidth variant="default">
              Get started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
