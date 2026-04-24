import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Circle } from "lucide-react";

import { BadgeNumber } from "./BadgeNumber";

export type TabsTriggerState = "default" | "focus" | "disabled";

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Selected tab (Figma property `active`). */
  active?: boolean;
  /**
   * Visual interaction state for design parity and Storybook.
   * Matches Figma component property `State` (Default / Focus / Disabled).
   */
  state?: TabsTriggerState;
  /** Renders a count badge (uses `BadgeNumber`). */
  badge?: boolean;
  badgeContent?: ReactNode;
  showIcon?: boolean;
  leftIcon?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `shadow/sm` — uses `--shadow-sm-*` from `src/styles/theme.css` (@theme + LAYER 1). */
const tabsActiveShadow =
  "shadow-[var(--shadow-sm-1-offset-x)_var(--shadow-sm-1-offset-y)_var(--shadow-sm-1-blur-radius)_var(--shadow-sm-1-spread-radius)_var(--shadow-sm-1-color),var(--shadow-sm-2-offset-x)_var(--shadow-sm-2-offset-y)_var(--shadow-sm-2-blur-radius)_var(--shadow-sm-2-spread-radius)_var(--shadow-sm-2-color)]";

const focusRing = "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";

export function TabsTrigger({
  active = false,
  state = "default",
  badge = false,
  badgeContent = "8",
  showIcon = false,
  leftIcon,
  className,
  disabled,
  children = "Tabs Text",
  type = "button",
  ...props
}: TabsTriggerProps) {
  const presentationDisabled = state === "disabled" || disabled;
  const forcedFocus = state === "focus";

  const surface = presentationDisabled
    ? "cursor-not-allowed border-0 bg-transparent text-muted-foreground opacity-50"
    : forcedFocus
      ? cx(
          "border border-solid border-ring bg-background text-foreground",
          focusRing,
        )
      : active
        ? cx(
            "box-border border-0 rounded-[var(--border-radius-rounded-md)] bg-[var(--custom-background-dark-input-30)] text-foreground [border-bottom:var(--border-width-border-2)_solid_var(--base-primary)]",
            tabsActiveShadow,
            "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]",
          )
        : cx(
            "border-0 bg-transparent text-foreground shadow-none",
            "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]",
          );

  const icon = leftIcon ?? <Circle className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />;

  return (
    <button
      type={type}
      disabled={presentationDisabled}
      aria-selected={active}
      role="tab"
      className={cx(
        "inline-flex max-w-full shrink-0 items-center justify-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-[var(--spacing-1)] font-body text-sm font-semibold leading-5 transition-[color,box-shadow,border-color,border-radius,opacity,background-color]",
        surface,
        className,
      )}
      {...props}
    >
      {showIcon ? icon : null}
      <span className="min-w-0 truncate whitespace-nowrap">{children}</span>
      {badge ? (
        <BadgeNumber variant="default" state="default" className="shrink-0">
          {badgeContent}
        </BadgeNumber>
      ) : null}
    </button>
  );
}
