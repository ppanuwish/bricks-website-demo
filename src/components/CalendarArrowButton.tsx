import type { ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Calendar / Arrow Button` (node 234:196) — `Variant=Previous|Next`, `State=Default|Hover|Focus|Disabled`. */
export type CalendarArrowButtonVariant = "previous" | "next";

/** Pinned visuals for Storybook / design QA (Figma component `State`). */
export type CalendarArrowButtonState = "default" | "hover" | "focus" | "disabled";

const focusRingVisible =
  "focus-visible:shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)] focus-visible:outline-none";

const focusRingPinned = "shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)] outline-none";

const sizeLayout =
  "flex h-[var(--height-h-8,32px)] w-[var(--width-w-8,32px)] shrink-0 items-center justify-center rounded-md outline-none transition-[opacity,background-color,box-shadow]";

export type CalendarArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: CalendarArrowButtonVariant;
  /**
   * Visual state for design parity and Storybook.
   * Matches Figma component property `State` (Default / Hover / Focus / Disabled).
   */
  state?: CalendarArrowButtonState;
};

/**
 * Calendar month navigation control (Figma `Calendar / Arrow Button`, node 234:196).
 * Uses `--custom-background-dark-input-30`, `--color-button-focus-outline`, and `--width-w-8` / `--height-h-8` from `theme.css`.
 */
export function CalendarArrowButton({
  variant = "previous",
  state: stateProp = "default",
  className,
  disabled,
  type = "button",
  ...props
}: CalendarArrowButtonProps) {
  const presentationDisabled = stateProp === "disabled" || disabled;
  const pinnedHover = stateProp === "hover";
  const pinnedFocus = stateProp === "focus";

  const surface = presentationDisabled
    ? "cursor-not-allowed bg-[var(--custom-background-dark-input-30)] opacity-50"
    : pinnedHover
      ? "bg-accent opacity-100"
      : pinnedFocus
        ? cx("bg-[var(--custom-background-dark-input-30)] opacity-50", focusRingPinned)
        : cx(
            "bg-[var(--custom-background-dark-input-30)] opacity-50",
            "hover:bg-accent hover:opacity-100",
            focusRingVisible
          );

  const Icon = variant === "next" ? ChevronRight : ChevronLeft;

  return (
    <button
      type={type}
      disabled={presentationDisabled}
      className={cx(sizeLayout, surface, className)}
      {...props}
    >
      <Icon aria-hidden className="size-4 text-foreground" strokeWidth={1.5} />
    </button>
  );
}
