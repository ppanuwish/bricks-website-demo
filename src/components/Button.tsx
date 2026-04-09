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
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-body font-semibold tracking-wide outline-none transition-colors disabled:pointer-events-none disabled:opacity-50";

  // From Figma: shadow/xs + focus/default (0 0 0 3px rgba(163,163,163,0.5))
  const shadows =
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus-visible:shadow-[0_0_0_3px_rgba(163,163,163,0.5)]";

  const variantClasses = (() => {
    switch (variant) {
      case "default":
        return [
          "border border-transparent bg-bricks-red text-white",
          // Figma hover uses a 10% white overlay on top of primary
          "hover:[background-image:linear-gradient(90deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%),linear-gradient(90deg,rgb(253,1,69)_0%,rgb(253,1,69)_100%)]",
        ].join(" ");
      case "secondary":
        return [
          "border border-bricks-red bg-bricks-gray text-bricks-darkgray",
          "hover:border-[#e10a3c] hover:bg-[#e4e4e4] hover:text-[#e10a3c]",
        ].join(" ");
      case "outline":
        return [
          "border border-bricks-darkgray/20 bg-transparent text-bricks-darkgray",
          "hover:bg-bricks-gray",
        ].join(" ");
      case "ghost":
        return [
          "border border-transparent bg-transparent text-bricks-darkgray",
          "hover:bg-bricks-gray",
        ].join(" ");
      case "link":
        return [
          "border border-transparent bg-transparent p-0 text-bricks-red underline-offset-4",
          "hover:underline",
        ].join(" ");
      case "destructive":
        return [
          "border border-transparent bg-[#e11d48] text-white",
          "hover:bg-[#be123c]",
          "focus-visible:shadow-[0_0_0_3px_rgba(225,29,72,0.4)]",
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
