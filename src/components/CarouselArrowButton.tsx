import type { ButtonHTMLAttributes } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { twMerge } from "tailwind-merge";

/** Figma Carousel / CarouselArrowButton (239:851) — `shadow/xs` from `theme.css`. */
const carouselArrowShadowXs =
  "shadow-[var(--shadow-xs-offset-x)_var(--shadow-xs-offset-y)_var(--shadow-xs-blur-radius)_var(--shadow-xs-spread-radius)_var(--shadow-xs-color)]";

const focusRingVisible =
  "focus-visible:shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)] focus-visible:outline-none focus-visible:border-ring";

const focusRingPinned =
  "border-ring shadow-[0px_0px_0px_3px_var(--color-button-focus-outline)] outline-none";

const sizeLayout =
  "relative box-border flex h-[var(--height-h-8,32px)] w-[var(--width-w-8,32px)] shrink-0 items-center justify-center overflow-hidden rounded-full border border-solid p-[10px] transition-[background-color,border-color,box-shadow,opacity]";

/** Figma `Orientation` — `Horizontal` (`ArrowLeft` / `ArrowRight`) | `Vertical` (`ArrowUp` / `ArrowDown`). */
export type CarouselArrowButtonOrientation = "horizontal" | "vertical";

/** Figma `Variant` — `Previous` | `Next`. */
export type CarouselArrowButtonVariant = "previous" | "next";

/** Pinned visuals for Storybook / QA (Figma `State`: Default | Hover | Focus | Disabled). */
export type CarouselArrowButtonState = "default" | "hover" | "focus" | "disabled";

export type CarouselArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  orientation?: CarouselArrowButtonOrientation;
  variant?: CarouselArrowButtonVariant;
  state?: CarouselArrowButtonState;
};

/**
 * Carousel navigation control (Figma `Carousel / CarouselArrowButton`, node 239:851).
 * Icons: Lucide — horizontal `ArrowLeft` / `ArrowRight`, vertical `ArrowUp` / `ArrowDown`.
 * Uses `--custom-background-dark-input-30`, `--custom-accent-dark-input-50`, `--shadow-xs-*`,
 * `--color-button-focus-outline`, and `--width-w-8` / `--height-h-8` from `theme.css`.
 */
export function CarouselArrowButton({
  orientation = "horizontal",
  variant = "previous",
  state: stateProp = "default",
  className,
  disabled,
  type = "button",
  ...props
}: CarouselArrowButtonProps) {
  const presentationDisabled = stateProp === "disabled" || disabled;
  const pinnedHover = stateProp === "hover";
  const pinnedFocus = stateProp === "focus";

  const surface = presentationDisabled
    ? twMerge(
        "cursor-not-allowed border-input bg-[var(--custom-background-dark-input-30)] opacity-50",
        carouselArrowShadowXs,
      )
    : pinnedHover
      ? twMerge(
          "border-input bg-[var(--custom-accent-dark-input-50)]",
          carouselArrowShadowXs,
        )
      : pinnedFocus
        ? twMerge(
            "bg-[var(--custom-background-dark-input-30)]",
            carouselArrowShadowXs,
            focusRingPinned,
          )
        : twMerge(
            "border-input bg-[var(--custom-background-dark-input-30)]",
            carouselArrowShadowXs,
            "hover:border-input hover:bg-[var(--custom-accent-dark-input-50)]",
            focusRingVisible,
          );

  const iconClassName = "size-4 shrink-0 text-foreground";
  const iconStroke = 1.5;

  return (
    <button
      type={type}
      disabled={presentationDisabled}
      data-slot="carousel-arrow-button"
      className={twMerge(sizeLayout, surface, className)}
      {...props}
    >
      {orientation === "horizontal" ? (
        variant === "previous" ? (
          <ArrowLeft aria-hidden className={iconClassName} strokeWidth={iconStroke} />
        ) : (
          <ArrowRight aria-hidden className={iconClassName} strokeWidth={iconStroke} />
        )
      ) : variant === "previous" ? (
        <ArrowUp aria-hidden className={iconClassName} strokeWidth={iconStroke} />
      ) : (
        <ArrowDown aria-hidden className={iconClassName} strokeWidth={iconStroke} />
      )}
    </button>
  );
}
