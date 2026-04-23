import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";
type ButtonState = "default" | "hover" | "focus" | "disabled" | "loading";
type ButtonTheme = "bricks" | "nia" | "c-law";
type ButtonMode = "light" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  theme?: ButtonTheme;
  mode?: ButtonMode;
  fullWidth?: boolean;
  loading?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function classesForSize(size: ButtonSize, variant: ButtonVariant) {
  if (variant === "link") {
    switch (size) {
      case "default":
        return "h-9 px-0 py-2 text-sm";
      case "sm":
        return "h-8 px-0 text-xs";
      case "lg":
        return "h-10 px-0 text-sm";
      case "icon":
        return "h-9 w-9 rounded-[var(--radius-button-icon,var(--radius-md))] p-0";
    }
  }

  switch (size) {
    case "default":
      return "h-9 px-4 py-2 text-sm";
    case "sm":
      return "h-8 px-3 text-xs";
    case "lg":
      return "h-10 px-8 text-sm";
    case "icon":
      return "h-9 w-9 rounded-[var(--radius-button-icon,var(--radius-md))] p-0";
  }
}

function SmileIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function LoaderCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = "default",
  size = "default",
  state = "default",
  theme,
  mode,
  fullWidth,
  loading,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  className,
  type,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--border-radius-rounded-md,var(--radius-md))] font-body text-sm font-semibold leading-5 outline-none transition-colors disabled:pointer-events-none disabled:opacity-50";

  const shadows = "shadow-[0_1px_2px_0_var(--color-button-shadow)]";
  const focusDefault = "focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
  const focusDestructive = "focus-visible:shadow-[0_0_0_3px_var(--color-destructive-focus)]";
  const hoverOverlay90 =
    "hover:[background-image:linear-gradient(90deg,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_0%,var(--color-button-primary-hover-overlay,var(--color-button-overlay-90))_100%),linear-gradient(90deg,var(--color-primary)_0%,var(--color-primary)_100%)]";
  const hoverDestructive = "hover:bg-[var(--color-button-destructive-hover-bg)]";
  const hoverSecondaryOverlay =
    "hover:[background-image:linear-gradient(90deg,var(--color-button-secondary-hover-overlay,transparent)_0%,var(--color-button-secondary-hover-overlay,transparent)_100%),linear-gradient(90deg,var(--color-button-secondary-hover-bg)_0%,var(--color-button-secondary-hover-bg)_100%)]";

  const stateClasses =
    state === "hover"
      ? variant === "default"
        ? "[background-image:linear-gradient(90deg,var(--color-button-overlay-90)_0%,var(--color-button-overlay-90)_100%),linear-gradient(90deg,var(--color-primary)_0%,var(--color-primary)_100%)]"
        : variant === "secondary"
          ? "[background-image:linear-gradient(90deg,var(--color-button-secondary-hover-overlay,transparent)_0%,var(--color-button-secondary-hover-overlay,transparent)_100%),linear-gradient(90deg,var(--color-button-secondary-hover-bg)_0%,var(--color-button-secondary-hover-bg)_100%)] border-[var(--color-button-secondary-hover-border)] text-[var(--color-button-secondary-hover-text)]"
          : variant === "destructive"
            ? "bg-[var(--color-button-destructive-hover-bg)]"
            : variant === "outline" || variant === "ghost"
              ? "bg-accent text-accent-foreground"
              : variant === "link"
                ? "underline decoration-[1px]"
                : ""
      : state === "focus"
        ? variant === "destructive"
          ? "shadow-[0_0_0_3px_var(--color-destructive-focus)]"
          : "shadow-[0_0_0_3px_var(--color-button-focus-outline)]"
        : state === "disabled" || state === "loading"
          ? "opacity-50"
          : "";

  const variantClasses = (() => {
    switch (variant) {
      case "default":
        return [
          "border border-transparent bg-primary text-primary-foreground",
          hoverOverlay90,
        ].join(" ");
      case "secondary":
        return [
          "border bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border-[var(--color-button-secondary-border)]",
          "hover:border-[var(--color-button-secondary-hover-border)] hover:text-[var(--color-button-secondary-hover-text)]",
          hoverSecondaryOverlay,
        ].join(" ");
      case "outline":
        return [
          "border bg-[var(--color-button-outline-bg,var(--color-outline-surface))] border-[var(--color-button-outline-border,var(--color-input))] text-foreground",
          "hover:bg-[var(--color-button-outline-hover-bg,var(--color-accent))] hover:border-[var(--color-button-outline-hover-border,var(--color-input))] hover:text-[var(--color-button-outline-hover-text,var(--color-accent-foreground))]",
        ].join(" ");
      case "ghost":
        return [
          "border border-transparent bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" ");
      case "link":
        return [
          "border border-transparent bg-transparent text-primary no-underline underline-offset-4 shadow-none",
          "hover:underline",
        ].join(" ");
      case "destructive":
        return [
          "border border-transparent bg-destructive text-destructive-foreground",
          hoverDestructive,
          focusDestructive,
        ].join(" ");
    }
  })();

  const w = fullWidth ? "w-full" : "";
  const isDisabled = disabled || loading || state === "disabled" || state === "loading";
  const iconSize = "h-4 w-4";
  const DefaultIcon = theme === "nia" ? CircleIcon : SmileIcon;
  const leadingIcon = leftIcon ?? <DefaultIcon className={iconSize} />;
  const trailingIcon = rightIcon ?? <DefaultIcon className={iconSize} />;
  const hasLabel = size !== "icon" && Boolean(children);

  return (
    <button
      type={type ?? "button"}
      disabled={isDisabled}
      data-theme={theme}
      className={cx(
        base,
        mode === "dark" && "dark",
        variant === "link" ? "shadow-none" : shadows,
        variant === "destructive" ? "" : focusDefault,
        variantClasses,
        stateClasses,
        classesForSize(size, variant),
        w,
        isDisabled && variant === "link" && "no-underline",
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircleIcon className={`${iconSize} animate-spin`} />
          {hasLabel ? <span>{children}</span> : null}
        </>
      ) : (
        <>
          {showLeftIcon ? leadingIcon : null}
          {hasLabel ? children : null}
          {showRightIcon ? trailingIcon : null}
        </>
      )}
    </button>
  );
}
