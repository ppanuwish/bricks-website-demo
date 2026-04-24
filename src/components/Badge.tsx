import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

/** Matches Figma component sets — use in Storybook; live UI relies on `:hover` / `:focus-visible`. */
export type BadgeState = "default" | "hover" | "focus";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  state?: BadgeState;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const hoverOverlayPrimary =
  "hover:[background-image:linear-gradient(90deg,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_0%,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_100%),linear-gradient(90deg,var(--color-primary)_0%,var(--color-primary)_100%)]";

const hoverDestructive =
  "hover:[background-image:linear-gradient(90deg,var(--color-button-overlay-90)_0%,var(--color-button-overlay-90)_100%),linear-gradient(90deg,var(--color-destructive)_0%,var(--color-destructive)_100%)]";

const shadowBadge =
  "shadow-[0_1px_3px_0_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent),0_1px_2px_-1px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent)]";

const focusRingDefault = "focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
const focusRingDestructive = "focus-visible:shadow-[0_0_0_3px_var(--color-destructive-focus)]";

function stateClasses(variant: BadgeVariant, state: BadgeState): string {
  if (state === "hover") {
    switch (variant) {
      case "default":
        return "[background-image:linear-gradient(90deg,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_0%,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_100%),linear-gradient(90deg,var(--color-primary)_0%,var(--color-primary)_100%)]";
      case "secondary":
        return "bg-secondary/90";
      case "outline":
        return "bg-accent text-accent-foreground";
      case "destructive":
        return "[background-image:linear-gradient(90deg,var(--color-button-overlay-90)_0%,var(--color-button-overlay-90)_100%),linear-gradient(90deg,var(--color-destructive)_0%,var(--color-destructive)_100%)]";
      default:
        return "";
    }
  }
  if (state === "focus") {
    return variant === "destructive"
      ? "shadow-[0_0_0_3px_var(--color-destructive-focus)]"
      : "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
  }
  return "";
}

function variantClasses(variant: BadgeVariant): string {
  switch (variant) {
    case "default":
      return cx(
        "border-transparent bg-primary text-primary-foreground",
        shadowBadge,
        hoverOverlayPrimary,
        focusRingDefault,
      );
    case "secondary":
      return cx(
        "border-transparent bg-secondary text-secondary-foreground",
        "hover:bg-secondary/90",
        focusRingDefault,
      );
    case "outline":
      return cx(
        "border-border bg-background text-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        focusRingDefault,
      );
    case "destructive":
      return cx(
        "border-transparent bg-destructive text-destructive-foreground",
        shadowBadge,
        hoverDestructive,
        focusRingDestructive,
      );
    default:
      return "";
  }
}

export function Badge({
  variant = "default",
  state = "default",
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex max-w-full min-w-0 shrink-0 items-center justify-center gap-[var(--spacing-1)] rounded-[var(--radius-md)] border px-[var(--spacing-2)] py-[2px] font-body text-xs font-semibold leading-4 whitespace-nowrap outline-none transition-[background-color,background-image,box-shadow,color,border-color,opacity]";

  return (
    <span
      className={cx(
        base,
        variantClasses(variant),
        state !== "default" && stateClasses(variant, state),
        className,
      )}
      {...props}
    >
      {showLeftIcon ? (leftIcon ?? null) : null}
      {children}
      {showRightIcon ? (rightIcon ?? null) : null}
    </span>
  );
}
