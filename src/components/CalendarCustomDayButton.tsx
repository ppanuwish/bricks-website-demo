import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { CalendarDayButtonState, CalendarDayButtonVariant } from "./CalendarDayButton";

/** @see CalendarDayButton — same Figma `State` enum. */
export type CalendarCustomDayButtonState = CalendarDayButtonState;
/** @see CalendarDayButton — same Figma `Variant` enum. */
export type CalendarCustomDayButtonVariant = CalendarDayButtonVariant;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const layout =
  "group flex h-[var(--height-h-12,48px)] w-[var(--width-w-12,48px)] shrink-0 flex-col items-center justify-center gap-[var(--spacing-1,4px)] rounded-md p-[var(--spacing-0,0px)] font-body outline-none transition-[color,background-color,opacity,box-shadow]";

const primarySelected =
  "cursor-pointer bg-primary text-primary-foreground hover:bg-primary focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)]";

export type CalendarCustomDayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: CalendarDayButtonVariant;
  selected?: boolean;
  /** Second line (Figma `extraText`, e.g. price). */
  subtitle?: ReactNode;
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

const primaryLine = "block w-full text-center text-sm font-normal leading-none";
const secondaryLine = "block w-full text-center text-xs font-normal leading-none";

function captionClasses(
  variant: CalendarDayButtonVariant,
  selected: boolean,
  presentationDisabled: boolean,
  stateProp: CalendarDayButtonState | undefined,
  line: "primary" | "secondary"
): string {
  const lineClass = line === "primary" ? primaryLine : secondaryLine;
  if (stateProp === "selectedFocus" || (stateProp === "selected" && variant === "default")) {
    return cx(lineClass, "text-primary-foreground");
  }
  if (stateProp === "selected" && variant === "outside") {
    return cx(lineClass, "text-muted-foreground");
  }
  if (stateProp === "hover" && variant === "outside") {
    return cx(lineClass, "text-foreground");
  }
  if (stateProp === "hover" || stateProp === "pressed") {
    return cx(lineClass, "text-accent-foreground");
  }
  if (presentationDisabled) {
    return cx(lineClass, "text-foreground");
  }
  if (selected && variant !== "outside") {
    return cx(lineClass, "text-primary-foreground");
  }
  if (selected && variant === "outside") {
    return cx(lineClass, "text-muted-foreground");
  }
  if (variant === "current") {
    return cx(lineClass, "text-accent-foreground");
  }
  if (variant === "outside") {
    return cx(lineClass, "text-muted-foreground");
  }
  if (line === "secondary") {
    return cx(secondaryLine, "text-muted-foreground group-hover:text-accent-foreground");
  }
  return cx(primaryLine, "text-foreground group-hover:text-accent-foreground");
}

/**
 * Two-line calendar day (e.g. day + price). Figma `Calendar / Custom Day Button` (node 17921:42281).
 * Reuses the same `Variant` / `State` model as {@link CalendarDayButton}; dimensions use `--width-w-12` / `--height-h-12` and `--spacing-1` from `theme.css`.
 */
export function CalendarCustomDayButton({
  variant = "default",
  selected = false,
  subtitle = "$100",
  state: stateProp,
  className,
  disabled,
  children = "1",
  type = "button",
  ...props
}: CalendarCustomDayButtonProps) {
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
      <span className={captionClasses(variant, selected, presentationDisabled, stateProp, "primary")}>
        {children}
      </span>
      <span className={captionClasses(variant, selected, presentationDisabled, stateProp, "secondary")}>
        {subtitle}
      </span>
    </button>
  );
}
