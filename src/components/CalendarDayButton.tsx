import type { ButtonHTMLAttributes, ReactNode } from "react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Calendar / Day Button` (node 234:27) — component property `Variant`. */
export type CalendarDayButtonVariant = "default" | "current" | "outside";

/**
 * Figma `State` (per-variant set). Used to pin visuals in Storybook / design QA.
 */
export type CalendarDayButtonState =
  | "default"
  | "hover"
  | "pressed"
  | "disabled"
  | "selected"
  | "selectedFocus";

const layout =
  "box-border flex h-[var(--height-h-8,32px)] min-h-[var(--height-h-8,32px)] w-[var(--width-w-8,32px)] min-w-[var(--width-w-8,32px)] max-w-[var(--width-w-8,32px)] flex-none justify-self-center flex-col items-center justify-center gap-[10px] rounded-md p-[var(--spacing-0,0px)] font-body text-sm font-normal leading-5 outline-none transition-[color,background-color,opacity,box-shadow]";

const primarySelected =
  "cursor-pointer bg-primary text-primary-foreground hover:bg-primary focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)]";

export type CalendarDayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: CalendarDayButtonVariant;
  /** Selected day (primary for in-month; Figma `Outside` + selected uses accent + opacity). */
  selected?: boolean;
  /**
   * When set, pins surface to a Figma `State` for Storybook / design QA.
   * Omit for normal `:hover` / `:active` / `:focus-visible` behavior.
   */
  state?: CalendarDayButtonState;
  children?: ReactNode;
};

function pinnedSurface(variant: CalendarDayButtonVariant, state: CalendarDayButtonState): string {
  if (variant === "outside") {
    switch (state) {
      case "default":
        return cx(layout, "bg-transparent text-muted-foreground opacity-50");
      case "hover":
        return cx(layout, "cursor-pointer bg-accent text-foreground opacity-50");
      case "pressed":
        return cx(layout, "cursor-pointer bg-accent text-muted-foreground opacity-30");
      case "selected":
        return cx(layout, "cursor-pointer bg-accent text-muted-foreground opacity-50");
      case "disabled":
        return cx(layout, "cursor-not-allowed bg-transparent text-muted-foreground opacity-50");
      default:
        return cx(layout, "bg-transparent text-muted-foreground opacity-50");
    }
  }

  if (variant === "current") {
    switch (state) {
      case "hover":
        return cx(layout, "cursor-pointer bg-accent text-accent-foreground brightness-[0.97]");
      case "default":
      default:
        return cx(layout, "bg-accent text-accent-foreground");
    }
  }

  switch (state) {
    case "default":
      return cx(layout, "bg-transparent text-foreground");
    case "hover":
      return cx(layout, "cursor-pointer bg-accent text-accent-foreground");
    case "pressed":
      return cx(layout, "cursor-pointer bg-accent text-accent-foreground opacity-90");
    case "disabled":
      return cx(layout, "cursor-not-allowed bg-transparent text-foreground opacity-50");
    case "selected":
      return cx(layout, primarySelected);
    case "selectedFocus":
      return cx(
        layout,
        "cursor-pointer bg-primary text-primary-foreground hover:bg-primary outline-none shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)]"
      );
    default:
      return cx(layout, "bg-transparent text-foreground");
  }
}

function interactiveSurface(
  variant: CalendarDayButtonVariant,
  selected: boolean,
  presentationDisabled: boolean
): string {
  if (presentationDisabled) {
    return cx(layout, "cursor-not-allowed bg-transparent text-foreground opacity-50");
  }

  if (variant === "outside") {
    if (selected) {
      return cx(
        layout,
        "cursor-pointer bg-accent text-muted-foreground opacity-50 hover:bg-accent hover:opacity-50",
        "active:bg-accent active:opacity-30"
      );
    }
    return cx(
      layout,
      "cursor-pointer bg-transparent text-muted-foreground opacity-50",
      "hover:bg-accent hover:text-foreground hover:opacity-50",
      "active:bg-accent active:opacity-30 active:text-muted-foreground"
    );
  }

  if (selected) {
    return cx(layout, primarySelected);
  }

  if (variant === "current") {
    return cx(
      layout,
      "cursor-pointer bg-accent text-accent-foreground hover:bg-muted focus-visible:bg-muted"
    );
  }

  return cx(
    layout,
    "cursor-pointer bg-transparent text-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:bg-muted"
  );
}

/**
 * Calendar grid day cell (Figma `Calendar / Day Button`, node 234:27).
 * Uses `--height-h-8`, `--width-w-8`, `--spacing-0`, `--color-button-focus-outline`, and semantic colors from `theme.css`.
 */
export function CalendarDayButton({
  variant = "default",
  selected = false,
  state: stateProp,
  className,
  disabled,
  children = "1",
  type = "button",
  ...props
}: CalendarDayButtonProps) {
  const presentationDisabled = Boolean(disabled);
  const surface =
    stateProp !== undefined
      ? pinnedSurface(variant, stateProp)
      : interactiveSurface(variant, selected, presentationDisabled);

  return (
    <button
      type={type}
      disabled={presentationDisabled}
      className={cx(surface, className)}
      {...props}
    >
      {children}
    </button>
  );
}
