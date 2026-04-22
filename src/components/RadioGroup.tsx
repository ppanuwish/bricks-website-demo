import {
  createContext,
  useContext,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Type` — row vs bordered card. */
export type RadioGroupItemVariant = "default" | "box";
/** Figma label weight — `Medium` / `Regular`. */
export type RadioGroupTextWeight = "medium" | "regular";
/** Figma `State` — for Storybook / forced visuals. */
export type RadioGroupItemState = "default" | "focus" | "disabled";

const boxShadowSm =
  "shadow-[0_1px_2px_0_var(--color-button-shadow)]";

const selectedCardBg =
  "bg-[color-mix(in_srgb,var(--color-primary)_8%,var(--color-background))]";

type RadioGroupContextValue = {
  name: string;
  value: string;
  onValueChange: (next: string) => void;
  disabled: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("RadioGroupItem must be used within RadioGroup");
  }
  return ctx;
}

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Optional group heading (Figma field label). */
  label?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
};

/**
 * A single-selection group. Uses native `radio` inputs; styles match Figma **Radio / Item** (shadcn kit).
 */
export function RadioGroup({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label,
  name: nameProp,
  disabled: disabledProp = false,
  className,
  "aria-label": ariaLabel,
  children,
}: RadioGroupProps) {
  const reactId = useId();
  const groupName = nameProp ?? `${reactId}-radio-group`;
  const groupLabelId = `${reactId}-group-label`;
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? (valueProp != null ? String(valueProp) : "") : uncontrolled;
  const disabled = Boolean(disabledProp);

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const contextValue: RadioGroupContextValue = {
    name: groupName,
    value,
    onValueChange: setValue,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={twMerge(
          "flex w-full flex-col items-start gap-[var(--spacing-2)]",
          className
        )}
      >
        {label ? (
          <p
            id={groupLabelId}
            className="w-full font-body text-sm font-semibold leading-none text-foreground"
          >
            {label}
          </p>
        ) : null}
        <div
          role="radiogroup"
          aria-labelledby={label ? groupLabelId : undefined}
          aria-label={!label ? ariaLabel : undefined}
          className="flex w-full flex-col gap-[var(--spacing-3)]"
        >
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "checked" | "defaultChecked"
> & {
  value: string;
  /** Row label. */
  label: string;
  description?: string;
  variant?: RadioGroupItemVariant;
  textWeight?: RadioGroupTextWeight;
  showLabel?: boolean;
  showDescription?: boolean;
  state?: RadioGroupItemState;
  /** Outer wrapper; for `box`, maps to the card container. */
  className?: string;
};

/**
 * One option in a `RadioGroup`. Pairs with {@link RadioGroup} only.
 */
export function RadioGroupItem({
  value: itemValue,
  label: labelText,
  description = "This is a radio description.",
  disabled: disabledProp,
  variant = "default",
  textWeight = "medium",
  showLabel = true,
  showDescription = true,
  state = "default",
  className,
  id: idProp,
  onFocus,
  onBlur,
  onChange,
  ...inputProps
}: RadioGroupItemProps) {
  const itemReactId = useId();
  const { name, value, onValueChange, disabled: groupDisabled } = useRadioGroup();
  const inputId = idProp ?? `${itemReactId}-input`;

  const [inputFocused, setInputFocused] = useState(false);

  const disabled = Boolean(disabledProp) || groupDisabled || state === "disabled";
  const selected = value === itemValue;
  const showFocusStyle =
    !disabled && (state === "focus" || (state === "default" && inputFocused));

  const titleWeight =
    textWeight === "medium" ? "font-semibold" : "font-normal";

  const textBlock =
    showLabel || showDescription ? (
      <span
        className={twMerge(
          "flex min-w-0 flex-col justify-center gap-[6px] pt-px text-left text-sm not-italic",
          variant === "box" && "min-w-px flex-1"
        )}
      >
        {showLabel ? (
          <span
            className={twMerge(
              "w-full font-body text-sm leading-none text-foreground",
              titleWeight,
              disabled && "opacity-70"
            )}
          >
            {labelText}
          </span>
        ) : null}
        {showDescription ? (
          <span className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    ) : null;

  /** Figma: default = ring + dot; box selected = solid primary + light center dot. */
  const indicatorClass = (() => {
    const base = "relative";
    if (disabled) {
      if (selected) {
        if (variant === "box") {
          return cx(
            base,
            "border border-solid border-primary bg-primary opacity-50"
          );
        }
        return cx(
          base,
          "border border-solid border-border bg-background opacity-50"
        );
      }
      if (variant === "box") {
        return cx(base, "border border-solid border-input bg-background opacity-50", boxShadowSm);
      }
      return cx(
        base,
        "border border-solid border-input bg-muted",
        boxShadowSm
      );
    }

    if (variant === "box" && selected) {
      return cx(
        base,
        "border border-solid border-primary bg-primary",
        !showFocusStyle && boxShadowSm,
        showFocusStyle && "border-primary shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none"
      );
    }
    if (variant === "box" && !selected) {
      return cx(
        base,
        "border border-solid border-input bg-background",
        !showFocusStyle && boxShadowSm,
        showFocusStyle &&
          "border-ring shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none"
      );
    }

    if (!selected) {
      return cx(
        base,
        "border border-solid border-input bg-background",
        !showFocusStyle && boxShadowSm,
        showFocusStyle &&
          "border-ring shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none"
      );
    }
    return cx(
      base,
      "border border-solid border-border bg-background",
      !showFocusStyle && boxShadowSm,
      showFocusStyle &&
        "border-border shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none"
    );
  })();

  const showCenterDot = selected;
  const centerFill =
    variant === "box" && selected
      ? disabled
        ? "bg-primary-foreground/80"
        : "bg-primary-foreground"
      : "bg-primary";
  const centerDot = showCenterDot && (
    <span
      className={twMerge(
        "pointer-events-none absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
        centerFill
      )}
      aria-hidden
    />
  );

  const inner = (
    <>
      <input
        {...inputProps}
        type="radio"
        id={inputId}
        name={name}
        value={itemValue}
        className="peer sr-only"
        disabled={disabled}
        checked={selected}
        onChange={(e) => {
          onChange?.(e);
          if (e.defaultPrevented) return;
          if (!e.target.checked) return;
          onValueChange(itemValue);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setInputFocused(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setInputFocused(false);
        }}
      />
      <span
        className={twMerge(
          "pointer-events-none flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full",
          indicatorClass
        )}
      >
        {centerDot}
      </span>
      {textBlock}
    </>
  );

  if (variant === "box") {
    return (
      <label
        htmlFor={inputId}
        className={twMerge(
          "flex w-full max-w-[226px] items-start gap-[var(--spacing-3)] rounded-[length:var(--radius-lg)] border border-solid p-[var(--spacing-3)]",
          "border border-input",
          !disabled && "cursor-pointer",
          !selected && "bg-background",
          selected && !disabled && "border-primary",
          selected && !disabled && selectedCardBg,
          disabled && "cursor-not-allowed opacity-90",
          className
        )}
      >
        {inner}
      </label>
    );
  }

  return (
    <label
      htmlFor={inputId}
      className={twMerge(
        "flex w-full max-w-[320px] cursor-pointer items-start gap-[var(--spacing-3)]",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {inner}
    </label>
  );
}
