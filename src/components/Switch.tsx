import { useId, useState } from "react";
import type { ButtonHTMLAttributes, FocusEventHandler, MouseEventHandler } from "react";

export type SwitchVariant = "default" | "box";
export type SwitchSide = "left" | "right";
/** Matches Figma component set: Default, Focus, Disabled (for docs / forced visuals). */
export type SwitchState = "default" | "focus" | "disabled";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Figma `Type`: plain row vs bordered card. */
  variant?: SwitchVariant;
  /** Figma `Side`: switch before text vs switch at end. */
  side?: SwitchSide;
  /** Figma `State`: use `"focus"` / `"disabled"` in Storybook to pin visuals. */
  state?: SwitchState;
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  wrapperClassName?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const thumbShadow =
  "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]";

export function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled: disabledProp,
  state = "default",
  variant = "default",
  side = "left",
  label = "Switch Text",
  description = "This is a switch description.",
  showLabel = true,
  showDescription = true,
  className,
  wrapperClassName,
  id: idProp,
  onClick,
  onFocus,
  onBlur,
  ...buttonProps
}: SwitchProps) {
  const reactId = useId();
  const switchId = idProp ?? `${reactId}-switch`;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? Boolean(checkedProp) : uncontrolled;

  const [focused, setFocused] = useState(false);

  const disabled = Boolean(disabledProp) || state === "disabled";
  const showFocusStyle =
    !disabled && (state === "focus" || (state === "default" && focused));

  const setChecked = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (disabled || event.defaultPrevented) return;
    setChecked(!checked);
  };

  const handleFocus: FocusEventHandler<HTMLButtonElement> = (event) => {
    onFocus?.(event);
    setFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLButtonElement> = (event) => {
    onBlur?.(event);
    setFocused(false);
  };

  const track = cx(
    "relative flex h-5 w-9 shrink-0 items-center rounded-full px-[2px] transition-[background-color,box-shadow,border-color]",
    "border border-transparent",
    checked && !disabled && "justify-end bg-primary",
    !checked && !disabled && "justify-start bg-input",
    checked && disabled && "justify-end bg-muted-foreground",
    !checked && disabled && "justify-start bg-muted",
    showFocusStyle &&
      "border border-ring shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none"
  );

  const thumb = cx(
    "pointer-events-none size-4 shrink-0 rounded-full",
    thumbShadow,
    !disabled && "bg-background",
    !checked && disabled && "bg-muted-foreground",
    checked && disabled && "bg-input"
  );

  const textBlock =
    showLabel || showDescription ? (
      <span
        className={cx(
          "flex min-w-0 flex-col gap-[var(--spacing-2)] text-left",
          variant === "default" && side === "left" && "w-[272px]",
          variant === "box" && side === "left" && "w-[240px]",
          variant === "default" && side === "right" && "w-[272px]",
          variant === "box" && side === "right" && "w-[240px]"
        )}
      >
        {showLabel ? (
          <span
            className={cx(
              "w-full font-body text-sm font-semibold leading-none text-foreground",
              variant === "default" && side === "left" && "pt-[3px]"
            )}
          >
            {label}
          </span>
        ) : null}
        {showDescription ? (
          <span className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    ) : null;

  const control = (
    <button
      {...buttonProps}
      id={switchId}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cx(track, disabled && "cursor-not-allowed", !disabled && "cursor-pointer", className)}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span className={thumb} />
    </button>
  );

  const row = (
    <span
      className={cx(
        "flex w-full min-w-0 items-start gap-[var(--spacing-3)]",
        side === "right" && "justify-between"
      )}
    >
      {side === "left" ? (
        <>
          {control}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {control}
        </>
      )}
    </span>
  );

  if (variant === "box") {
    return (
      <label
        className={cx(
          "flex w-full max-w-[320px] cursor-pointer flex-col rounded-[length:var(--radius-lg)] border border-border bg-background p-[var(--spacing-4)] shadow-[0_1px_2px_0_var(--color-button-shadow)]",
          disabled && "cursor-not-allowed",
          wrapperClassName
        )}
      >
        {row}
      </label>
    );
  }

  return (
    <label
      className={cx(
        "flex w-full max-w-[320px] cursor-pointer flex-col",
        disabled && "cursor-not-allowed",
        wrapperClassName
      )}
    >
      {row}
    </label>
  );
}
