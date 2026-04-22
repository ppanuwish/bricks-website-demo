import { useId, useState } from "react";
import type { ButtonHTMLAttributes, FocusEventHandler, MouseEventHandler } from "react";

/** Matches Figma component set: Default, Focus, Disabled (for docs / forced visuals). */
export type CheckboxState = "default" | "focus" | "disabled";

export type CheckboxProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Figma `State`: use `"focus"` / `"disabled"` in Storybook to pin visuals. */
  state?: CheckboxState;
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  wrapperClassName?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma Icon / Check — 14×14 in a 16×16 box (node 5197:4029). */
function CheckboxCheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={cx("size-[14px]", className)}>
      <path
        d="m3.5 8 3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma shadow/sm — two drop shadows on the box (unchecked + checked default). */
const boxShadowSm =
  "shadow-[0_1px_3px_0_var(--color-button-shadow),0_1px_2px_-1px_var(--color-button-shadow)]";

export function Checkbox({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled: disabledProp,
  state = "default",
  label = "Checkbox Text",
  description = "This is a checkbox description.",
  showLabel = true,
  showDescription = true,
  className,
  wrapperClassName,
  id: idProp,
  onClick,
  onFocus,
  onBlur,
  "aria-label": ariaLabelProp,
  ...buttonProps
}: CheckboxProps) {
  const reactId = useId();
  const checkboxId = idProp ?? `${reactId}-checkbox`;
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

  const box = cx(
    "relative flex size-4 shrink-0 items-center justify-center rounded-[length:var(--radius-sm)] border border-solid transition-[background-color,border-color,box-shadow,opacity]",
    !checked &&
      !disabled &&
      !showFocusStyle &&
      "border-input bg-background",
    !checked && !disabled && !showFocusStyle && boxShadowSm,
    !checked && !disabled && showFocusStyle && "border-ring shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none",
    !checked && disabled && "border-input bg-background opacity-50",
    !checked && disabled && boxShadowSm,
    checked && !disabled && !showFocusStyle && "border-primary bg-primary text-primary-foreground",
    checked && !disabled && !showFocusStyle && boxShadowSm,
    checked && !disabled && showFocusStyle && "border-primary bg-primary text-primary-foreground shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none",
    checked && disabled && "border-primary bg-primary text-primary-foreground opacity-50",
    checked && disabled && boxShadowSm
  );

  const textBlock =
    showLabel || showDescription ? (
      <span className="flex min-w-0 flex-col gap-[6px] text-left text-sm">
        {showLabel ? (
          <span
            className={cx(
              "w-full font-body text-sm font-semibold leading-none text-foreground",
              disabled && "opacity-70"
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
      id={checkboxId}
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={showLabel ? undefined : ariaLabelProp ?? label}
      disabled={disabled}
      className={cx(box, disabled && "cursor-not-allowed", !disabled && "cursor-pointer", className)}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {checked ? <CheckboxCheckIcon /> : null}
    </button>
  );

  return (
    <label
      className={cx(
        "flex w-full max-w-[320px] cursor-pointer items-start gap-[var(--spacing-2)]",
        disabled && "cursor-not-allowed",
        wrapperClassName
      )}
    >
      {control}
      {textBlock}
    </label>
  );
}
