import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

function classesForSize(size: ButtonSize) {
  switch (size) {
    case "default":
      return "h-9 px-4 py-2 text-sm";
    case "sm":
      return "h-8 px-3 text-xs";
    case "lg":
      return "h-10 px-8 text-sm";
    case "icon":
      return "h-9 w-9";
  }
}

export function Button({
  variant = "default",
  size = "default",
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  className,
  type,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-body font-semibold tracking-wide outline-none transition-colors disabled:pointer-events-none disabled:opacity-50";

  // From Figma: shadow/xs + focus/default (0 0 0 3px rgba(163,163,163,0.5))
  const shadows =
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus-visible:shadow-[0_0_0_3px_rgba(163,163,163,0.5)]";

  const variantClasses = (() => {
    switch (variant) {
      case "default":
        return [
          "border border-transparent bg-primary text-primary-foreground",
          // Figma hover uses a subtle white overlay on top of primary.
          "hover:bg-[color-mix(in_srgb,var(--color-primary)_90%,white)]",
        ].join(" ");
      case "secondary":
        return [
          "border border-secondary bg-[var(--color-secondary-surface)] text-secondary",
          "hover:bg-[color-mix(in_srgb,var(--color-secondary-surface)_80%,white)]",
        ].join(" ");
      case "outline":
        return [
          "border border-input bg-[var(--color-outline-surface)] text-foreground",
          "focus-visible:border-ring hover:bg-accent hover:text-accent-foreground",
        ].join(" ");
      case "ghost":
        return [
          "border border-transparent bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" ");
      case "link":
        return [
          "border border-transparent bg-transparent p-0 text-primary underline-offset-4",
          "hover:underline",
        ].join(" ");
      case "destructive":
        return [
          "border border-transparent bg-destructive text-destructive-foreground",
          "hover:bg-[color-mix(in_srgb,var(--color-destructive)_90%,white)]",
          "focus-visible:shadow-[0_0_0_3px_var(--color-destructive-focus)]",
        ].join(" ");
    }
  })();

  const w = fullWidth ? "w-full" : "";
  const isDisabled = disabled || loading;

  const iconSize = size === "sm" ? "h-4 w-4" : "h-4 w-4";

  return (
    <button
      type={type ?? "button"}
      disabled={isDisabled}
      className={[
        base,
        variant === "link" ? "" : shadows,
        variantClasses,
        classesForSize(size),
        w,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <svg
            aria-hidden="true"
            className={`${iconSize} animate-spin`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.25"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
