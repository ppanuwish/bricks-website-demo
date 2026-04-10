import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_LABELS } from "../constants/pages";
import { goToPage } from "../lib/navigation";
import { Button } from "./Button";
import enLogo from "../assets/en-logo.svg";

export function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname;
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"Product" | "Industries" | null>(
    null
  );
  const navRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const parseRgba = (color: string) => {
      const m = color.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
      );
      if (!m) return null;
      return {
        r: Number(m[1]),
        g: Number(m[2]),
        b: Number(m[3]),
        a: m[4] == null ? 1 : Number(m[4]),
      };
    };

    const isBricksDarkGray = (r: number, g: number, b: number) =>
      Math.abs(r - 26) <= 2 && Math.abs(g - 26) <= 2 && Math.abs(b - 26) <= 2;

    const sampleBackground = () => {
      const nav = navRef.current;
      if (!nav) {
        // #region agent log
        fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "3e05c1",
          },
          body: JSON.stringify({
            sessionId: "3e05c1",
            location: "Nav.tsx:sampleBackground",
            message: "sample skipped (no nav ref)",
            data: { scrollY: window.scrollY },
            timestamp: Date.now(),
            hypothesisId: "H4",
          }),
        }).catch(() => {});
        // #endregion
        return;
      }

      const x = Math.max(1, Math.floor(window.innerWidth / 2));
      const y = Math.min(window.innerHeight - 1, 80);
      const stack = document.elementsFromPoint(x, y);

      const behind = stack.find((el) => !nav.contains(el));
      if (!behind) {
        // #region agent log
        fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "3e05c1",
          },
          body: JSON.stringify({
            sessionId: "3e05c1",
            location: "Nav.tsx:sampleBackground",
            message: "sample skipped (no behind element)",
            data: { scrollY: window.scrollY, stackLen: stack.length },
            timestamp: Date.now(),
            hypothesisId: "H4",
          }),
        }).catch(() => {});
        // #endregion
        return;
      }

      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "3e05c1",
        },
        body: JSON.stringify({
          sessionId: "3e05c1",
          location: "Nav.tsx:sampleBackground",
          message: "sample invoked",
          data: {
            scrollY: window.scrollY,
            behindTag: behind.tagName,
            page,
          },
          timestamp: Date.now(),
          runId: "post-fix",
          hypothesisId: "H1",
        }),
      }).catch(() => {});
      // #endregion

      let node: Element | null = behind;
      while (node) {
        const style = window.getComputedStyle(node);
        const parsed = parseRgba(style.backgroundColor);
        if (parsed && parsed.a > 0 && isBricksDarkGray(parsed.r, parsed.g, parsed.b)) {
          // #region agent log
          fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "3e05c1",
            },
            body: JSON.stringify({
              sessionId: "3e05c1",
              location: "Nav.tsx:sampleBackground",
              message: "sample result",
              data: {
                isDarkBackground: true,
                reason: "bricks-dark-gray",
                bg: style.backgroundColor,
                nodeTag: node.tagName,
              },
              timestamp: Date.now(),
              hypothesisId: "H2",
            }),
          }).catch(() => {});
          // #endregion
          setIsDarkBackground(true);
          return;
        }
        if (parsed && parsed.a > 0) {
          // #region agent log
          fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "3e05c1",
            },
            body: JSON.stringify({
              sessionId: "3e05c1",
              location: "Nav.tsx:sampleBackground",
              message: "sample result",
              data: {
                isDarkBackground: false,
                reason: "opaque-non-bricks",
                bg: style.backgroundColor,
                nodeTag: node.tagName,
              },
              timestamp: Date.now(),
              hypothesisId: "H2",
            }),
          }).catch(() => {});
          // #endregion
          setIsDarkBackground(false);
          return;
        }
        node = node.parentElement;
      }
      // #region agent log
      fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "3e05c1",
        },
        body: JSON.stringify({
          sessionId: "3e05c1",
          location: "Nav.tsx:sampleBackground",
          message: "sample result",
          data: { isDarkBackground: false, reason: "no-opaque-bg-walk" },
          timestamp: Date.now(),
          hypothesisId: "H2",
        }),
      }).catch(() => {});
      // #endregion
      setIsDarkBackground(false);
    };

    const onChange = () => {
      requestAnimationFrame(sampleBackground);
    };

    onChange();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [page]);

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
    // #region agent log
    fetch("http://127.0.0.1:7936/ingest/449f2fce-bbee-4d84-9fb6-516c7de4bf98", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "3e05c1",
      },
      body: JSON.stringify({
        sessionId: "3e05c1",
        location: "Nav.tsx:go",
        message: "navigate via Nav",
        data: { key, scrollY: window.scrollY },
        timestamp: Date.now(),
        hypothesisId: "H3",
      }),
    }).catch(() => {});
    // #endregion
    setMobileOpen(false);
    setOpenDropdown(null);
    goToPage((to) => navigate(to), key);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[100] bg-transparent backdrop-blur-xl transition-all duration-500 ${
        isScrolling
          ? isDarkBackground
            ? "border-b border-white/[0.06]"
            : "border-b border-bricks-darkgray/10"
          : "border-b border-transparent"
      }`}
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
          className={`flex h-9 w-9 items-center justify-center md:hidden ${
            isDarkBackground ? "text-white" : "text-bricks-darkgray"
          }`}
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
                className={`inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide transition-colors hover:text-bricks-red ${
                  isDarkBackground ? "text-white/60" : "text-bricks-darkgray/70"
                }`}
              >
                {group.label}
              </button>
              <div
                className={`absolute left-0 top-full min-w-[200px] rounded-[10px] border py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md ${
                  openDropdown === group.label ? "block" : "hidden group-hover:block"
                } ${
                  isDarkBackground
                    ? "border-white/[0.08] bg-bricks-darkgray"
                    : "border-bricks-darkgray/10 bg-white"
                }`}
              >
                {group.items.map((k) => (
                  <div
                    key={k}
                    onClick={() => go(k)}
                    className={`cursor-pointer px-5 py-2.5 font-body text-[13px] font-medium transition-colors hover:bg-white/5 ${
                      isDarkBackground
                        ? "text-white/80 hover:text-bricks-red"
                        : "text-bricks-darkgray/80 hover:text-bricks-red"
                    }`}
                  >
                    {PAGE_LABELS[k]}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <span
            onClick={() => go("about")}
            className={`inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide transition-colors hover:text-bricks-red ${
              isDarkBackground ? "text-white/60" : "text-bricks-darkgray/70"
            }`}
          >
            About
          </span>
          <span
            onClick={() => go("blog")}
            className={`inline-block cursor-pointer px-4 py-2 font-body text-[13px] font-medium tracking-wide transition-colors hover:text-bricks-red ${
              isDarkBackground ? "text-white/60" : "text-bricks-darkgray/70"
            }`}
          >
            Blog
          </span>
          <Button
            onClick={() => go("contact")}
            className="ml-4"
            size="sm"
            variant={isDarkBackground ? "default" : "secondary"}
          >
            Get started
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`border-t px-6 py-4 md:hidden ${
            isDarkBackground
              ? "border-white/10 bg-bricks-darkgray text-white"
              : "border-bricks-darkgray/10 bg-white text-bricks-darkgray"
          }`}
        >
          <div className="flex flex-col gap-3 font-body text-sm">
            <button
              type="button"
              onClick={() => go("home")}
              className="text-left transition-colors hover:text-bricks-red"
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
                    className="text-left transition-colors hover:text-bricks-red"
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
                    className="text-left transition-colors hover:text-bricks-red"
                  >
                    {PAGE_LABELS[k]}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => go("about")}
              className="text-left transition-colors hover:text-bricks-red"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => go("blog")}
              className="text-left transition-colors hover:text-bricks-red"
            >
              Blog
            </button>
            <Button
              onClick={() => go("contact")}
              size="sm"
              fullWidth
              variant={isDarkBackground ? "default" : "secondary"}
            >
              Get started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
