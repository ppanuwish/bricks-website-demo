import { useId, useState } from "react";
import { Bold } from "lucide-react";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";
/**
 * Figma: Default, Hover, Focus, Pressed, Disabled — use for Storybook / static QA.
 * Set to `"default"` in production so :hover and :focus-visible apply.
 */
export type ToggleState = "default" | "hover" | "focus" | "pressed" | "disabled";

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "aria-pressed" | "data-state"> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  state?: ToggleState;
  showIcon?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const shadowXs = "shadow-[0_1px_2px_0_var(--color-button-shadow)]";
const focusRing = "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
const focusVisibleDefault = "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
const focusVisibleOutline = "focus-visible:outline-none focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";

const sizeClass: Record<ToggleSize, string> = {
  sm: "h-8 min-h-8 gap-[var(--spacing-2)] px-1.5",
  default: "h-9 min-h-9 gap-[var(--spacing-2)] px-[var(--spacing-2)]",
  lg: "h-10 min-h-10 gap-[var(--spacing-2)] px-2.5",
};

const labelClass: Record<ToggleSize, string> = {
  sm: "text-sm font-semibold leading-5",
  default: "text-sm font-semibold leading-5",
  lg: "text-sm font-semibold leading-5",
};

function DefaultIcon({ className }: { className?: string }) {
  return <Bold className={className} strokeWidth={2.5} aria-hidden />;
}

export function Toggle({
  variant = "default",
  size = "default",
  state = "default",
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  showIcon = true,
  icon,
  className,
  id: idProp,
  children = "Text",
  disabled: disabledProp,
  onClick,
  ...rest
}: ToggleProps) {
  const reactId = useId();
  const toggleId = idProp ?? `${reactId}-toggle`;
  const [uncontrolled, setUncontrolled] = useState(defaultPressed);
  const isControlled = pressedProp !== undefined;
  const resolvedPressed = isControlled ? Boolean(pressedProp) : uncontrolled;

  const isStoryHover = state === "hover";
  const isStoryFocus = state === "focus";
  const isStoryPressed = state === "pressed";
  const isStoryDisabled = state === "disabled";

  const showOn = isStoryPressed || (!isStoryHover && resolvedPressed);
  const disabled = Boolean(disabledProp) || isStoryDisabled;
  const pinForStory = state !== "default";

  const canHover = !isStoryFocus && !isStoryHover && !pinForStory;
  const showStoryFocus = isStoryFocus;
  const focusForStory = (t: "default" | "outline") =>
    showStoryFocus
      ? t === "default"
        ? focusRing
        : cx("border border-ring", focusRing)
      : undefined;

  const setPressed = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onPressedChange?.(next);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (disabled || event.defaultPrevented) return;
    setPressed(!resolvedPressed);
  };

  const focusVisible = variant === "default" ? focusVisibleDefault : focusVisibleOutline;

  const variantStateClasses = (() => {
    if (variant === "default") {
      if (showOn) {
        return cx("border border-transparent bg-accent text-foreground", !pinForStory && focusVisible, focusForStory("default"));
      }
      if (isStoryHover) {
        return cx("border border-transparent bg-muted text-muted-foreground", focusForStory("default"));
      }
      return cx(
        "border border-transparent bg-transparent text-foreground",
        canHover && !disabled && "hover:bg-muted hover:text-muted-foreground",
        !pinForStory && focusVisible,
        focusForStory("default"),
        (disabled || isStoryDisabled) && "hover:bg-transparent hover:text-foreground",
      );
    }
    if (showOn) {
      return cx(
        "border border-input bg-accent text-foreground",
        shadowXs,
        !pinForStory && focusVisible,
        focusForStory("outline"),
      );
    }
    if (isStoryHover) {
      return cx("border border-input bg-muted", shadowXs, "text-accent-foreground", !pinForStory && focusVisible, focusForStory("outline"));
    }
    return cx(
      "border border-input text-foreground",
      (disabled || isStoryDisabled) ? "bg-transparent" : "bg-background",
      shadowXs,
      canHover && !disabled && "hover:bg-muted hover:text-accent-foreground",
      !pinForStory && focusVisible,
      focusForStory("outline"),
      (disabled || isStoryDisabled) && "hover:bg-transparent",
    );
  })();

  const showIconNode = !showIcon ? null : icon !== undefined ? icon : <DefaultIcon className="h-4 w-4 shrink-0" />;

  return (
    <button
      {...rest}
      id={toggleId}
      type="button"
      aria-pressed={showOn}
      data-state={showOn ? "on" : "off"}
      disabled={disabled}
      onClick={handleClick}
      className={cx(
        "inline-flex max-w-full shrink-0 select-none items-center justify-center rounded-[var(--border-radius-rounded-md,var(--radius-md))] font-body",
        "outline-none transition-colors disabled:pointer-events-none",
        labelClass[size],
        sizeClass[size],
        variantStateClasses,
        (disabled || isStoryDisabled) && "opacity-50",
        (pinForStory && (isStoryFocus || isStoryHover)) && "pointer-events-none",
        className,
      )}
    >
      {showIconNode}
      {children != null && children !== false && (
        <span className={cx("min-w-0 shrink truncate text-left", labelClass[size])}>{children}</span>
      )}
    </button>
  );
}
