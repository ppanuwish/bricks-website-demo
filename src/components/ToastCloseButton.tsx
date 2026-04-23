import type { ButtonHTMLAttributes } from "react";
import { X } from "lucide-react";

/** Matches Figma component property `State` (Default / Hover). */
export type ToastCloseButtonVisualState = "default" | "hover";

export type ToastCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Destructive toast — icon uses `--color-destructive` (Figma property `distructive`). */
  destructive?: boolean;
  /** Filled destructive surface (e.g. destructive `Toast`) — icon uses `--color-destructive-foreground`. */
  onDestructiveSurface?: boolean;
  /**
   * Visual state for Storybook / design parity with Figma.
   * Interactive buttons use `default` + native hover; set `hover` to lock the hovered look.
   */
  state?: ToastCloseButtonVisualState;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const focusRingDefault = "focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
const focusRingDestructive = "focus-visible:shadow-[0_0_0_3px_var(--color-destructive-focus)]";

/**
 * Toast dismiss control — Figma `ToastCloseButton` (Icon / X, spacing/1 padding, opacity states).
 */
export function ToastCloseButton({
  destructive = false,
  onDestructiveSurface = false,
  state = "default",
  className,
  disabled,
  type = "button",
  "aria-label": ariaLabel = "Close",
  ...props
}: ToastCloseButtonProps) {
  const forcedHover = state === "hover";

  const opacityClasses =
    disabled !== true && !forcedHover
      ? "opacity-50 hover:opacity-100"
      : forcedHover && !disabled
        ? "opacity-100"
        : "opacity-50";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button-icon,var(--radius-md))] p-[var(--spacing-1)] outline-none transition-opacity",
        "disabled:pointer-events-none disabled:opacity-50",
        destructive || onDestructiveSurface ? focusRingDestructive : focusRingDefault,
        "focus-visible:outline-none",
        opacityClasses,
        className,
      )}
      {...props}
    >
      <X
        aria-hidden="true"
        strokeWidth={2}
        className={cx(
          "size-4 shrink-0",
          onDestructiveSurface
            ? "text-destructive-foreground"
            : destructive
              ? "text-destructive"
              : "text-foreground",
        )}
      />
    </button>
  );
}
