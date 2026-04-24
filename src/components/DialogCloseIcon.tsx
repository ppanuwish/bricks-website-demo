import { forwardRef, type ButtonHTMLAttributes } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

/** Figma `Dialog / Close Icon` (5056:13504) — component property `State`. */
export type DialogCloseIconState = "default" | "hover" | "focus";

export type DialogCloseIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Visual state for Storybook / design parity with Figma.
   * `default`: interactive (opacity + hover + keyboard focus).
   * `hover` | `focus`: pins that variant.
   */
  state?: DialogCloseIconState;
};

const focusBorder =
  "border-[length:var(--border-width-border-2,2px)] border-solid border-transparent";

/**
 * Dialog dismiss control — Figma `Dialog / Close Icon` (Icon / X, 16×16, opacity + ring border on focus).
 * Uses `--border-width-border-2`, `--color-ring` (via `border-ring`), `--radius-button-icon` from `theme.css`.
 */
export const DialogCloseIcon = forwardRef<HTMLButtonElement, DialogCloseIconProps>(function DialogCloseIcon(
  {
    state = "default",
    className,
    disabled,
    type = "button",
    "aria-label": ariaLabel = "Close",
    ...props
  }: DialogCloseIconProps,
  ref,
) {
  const pinnedHover = state === "hover";
  const pinnedFocus = state === "focus";

  const iconOpacity =
    disabled === true
      ? undefined
      : pinnedFocus
        ? "opacity-70"
        : pinnedHover
          ? "opacity-100"
          : "opacity-70 group-hover:opacity-100 group-focus-visible:opacity-70";

  const iconColor = twMerge(
    "size-4 shrink-0",
    disabled
      ? "text-muted-foreground"
      : pinnedFocus || pinnedHover
        ? "text-foreground"
        : "text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground",
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-slot="dialog-close-icon"
      className={twMerge(
        "group relative box-border inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--radius-button-icon,var(--radius-md))] bg-transparent outline-none transition-[opacity,border-color,color] focus-visible:outline-none",
        focusBorder,
        pinnedFocus ? "border-ring" : "focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className={twMerge("inline-flex items-center justify-center", iconOpacity)}>
        <X aria-hidden="true" strokeWidth={2} className={iconColor} />
      </span>
    </button>
  );
});

DialogCloseIcon.displayName = "DialogCloseIcon";
