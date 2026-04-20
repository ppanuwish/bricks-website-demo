import * as React from "react";

export type InputOTPState =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "filled"
  | "disabled"
  | "error"
  | "error-focus";

type InputOTPContextValue = {
  value: string;
  maxLength: number;
  setValue: (next: string) => void;
  disabled: boolean;
  /** Static Figma / Storybook preview — not editable. */
  isDemo: boolean;
  invalid: boolean;
  /** When set, visuals follow Figma-style states (read-only). */
  state?: InputOTPState;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null);

function useInputOTPContext(component: string) {
  const ctx = React.useContext(InputOTPContext);
  if (!ctx) {
    throw new Error(`${component} must be used within InputOTP`);
  }
  return ctx;
}

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function slotClassesForState(state: InputOTPState, hasChar: boolean, isActive: boolean) {
  switch (state) {
    case "default":
      return cx(
        "border border-input text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]",
        hasChar && "text-foreground"
      );
    case "hover":
      return cx(
        "border border-primary/20 text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]",
        hasChar && "text-foreground"
      );
    case "active":
      return "border-2 border-accent-foreground text-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "focus":
      return cx(
        isActive
          ? "border border-ring text-foreground shadow-[0_0_0_3px_var(--color-button-focus-outline)]"
          : "border border-input text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]",
        hasChar && !isActive && "text-foreground"
      );
    case "filled":
      return "border border-input text-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "disabled":
      return "border border-input text-muted-foreground opacity-50 shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "error":
      return "border border-destructive text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "error-focus":
      return cx(
        isActive
          ? "border border-destructive text-foreground shadow-[0_0_0_3px_var(--color-destructive-focus)]"
          : "border border-destructive text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]",
        hasChar && !isActive && "text-foreground"
      );
  }
}

export type InputOTPProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  /** Sets error styling; combine with user messaging. */
  invalid?: boolean;
  /** Force visual variant (e.g. Storybook / Figma parity). When set, the control is not editable. */
  state?: InputOTPState;
};

export function InputOTP({
  maxLength = 6,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  disabled = false,
  invalid = false,
  state,
  className,
  children,
  ...props
}: InputOTPProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolled;
  const forcedDemo = Boolean(state);

  const setValue = React.useCallback(
    (next: string) => {
      const sanitized = next.replace(/\D/g, "").slice(0, maxLength);
      if (!isControlled) setUncontrolled(sanitized);
      onValueChange?.(sanitized);
    },
    [isControlled, maxLength, onValueChange]
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const syncCaretToIndex = React.useCallback((index: number) => {
    const el = inputRef.current;
    if (!el) return;
    const i = Math.max(0, Math.min(index, maxLength));
    requestAnimationFrame(() => {
      try {
        el.setSelectionRange(i, i);
      } catch {
        /* ignore */
      }
    });
  }, [maxLength]);

  const ctx: InputOTPContextValue = {
    value,
    maxLength,
    setValue,
    disabled,
    isDemo: forcedDemo,
    invalid,
    state,
    activeIndex,
    setActiveIndex,
    inputRef,
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (forcedDemo) return;
    const next = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setValue(next);
    setActiveIndex(Math.min(next.length, maxLength - 1));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forcedDemo) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      setValue(value.slice(0, -1));
      setActiveIndex(Math.max(0, value.length - 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const i = Math.max(0, (inputRef.current?.selectionStart ?? value.length) - 1);
      setActiveIndex(i);
      syncCaretToIndex(i);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const i = Math.min(maxLength - 1, (inputRef.current?.selectionStart ?? 0) + 1);
      setActiveIndex(i);
      syncCaretToIndex(i);
    }
  };

  const onSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (forcedDemo) return;
    const t = e.currentTarget;
    const start = t.selectionStart ?? value.length;
    setActiveIndex(Math.min(start, maxLength - 1));
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (forcedDemo) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, maxLength);
    setValue(pasted);
    setActiveIndex(Math.min(pasted.length, maxLength - 1));
  };

  return (
    <InputOTPContext.Provider value={ctx}>
      <div
        role="group"
        aria-label="One-time password"
        className={cx("group relative inline-flex items-stretch outline-none", className)}
        onPointerDown={() => {
          if (forcedDemo) return;
          inputRef.current?.focus();
        }}
        {...props}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          name="otp"
          maxLength={maxLength}
          disabled={disabled}
          readOnly={forcedDemo}
          tabIndex={forcedDemo ? -1 : undefined}
          value={value}
          aria-invalid={invalid || state === "error" || state === "error-focus"}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onSelect={onSelect}
          onClick={onSelect}
          onFocus={(e) => {
            if (forcedDemo) return;
            const start = e.currentTarget.selectionStart ?? value.length;
            setActiveIndex(Math.min(start, maxLength - 1));
          }}
          className={cx(
            "absolute inset-0 z-10 cursor-text opacity-0 disabled:cursor-not-allowed",
            forcedDemo && "pointer-events-none"
          )}
        />
        {children}
      </div>
    </InputOTPContext.Provider>
  );
}

export type InputOTPGroupProps = React.ComponentProps<"div">;

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      className={cx(
        "pointer-events-none flex items-center gap-[var(--spacing-2)]",
        className
      )}
      {...props}
    />
  );
}

export type InputOTPSeparatorProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
};

export function InputOTPSeparator({ className, children = "–", ...props }: InputOTPSeparatorProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cx(
        "flex h-9 shrink-0 select-none items-center justify-center px-[var(--spacing-1)] font-body text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number;
};

export function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const ctx = useInputOTPContext("InputOTPSlot");
  const char = ctx.value[index] ?? "";
  const hasChar = char.length > 0;

  const interactiveActive = !ctx.disabled && !ctx.isDemo && !ctx.state && index === ctx.activeIndex;
  const demoFocusIndex =
    ctx.state === "focus" || ctx.state === "error-focus"
      ? Math.min(ctx.value.length, ctx.maxLength - 1)
      : -1;
  const demoActiveSlot =
    Boolean(ctx.state) &&
    ((ctx.state === "focus" || ctx.state === "error-focus") && index === demoFocusIndex);

  const isActiveSlot = ctx.state ? demoActiveSlot : interactiveActive;

  let effectiveState: InputOTPState;
  if (ctx.state) {
    effectiveState = ctx.state;
  } else if (ctx.disabled) {
    effectiveState = "disabled";
  } else if (ctx.invalid) {
    effectiveState = interactiveActive ? "error-focus" : "error";
  } else if (interactiveActive) {
    effectiveState = "focus";
  } else if (hasChar) {
    effectiveState = "filled";
  } else {
    effectiveState = "default";
  }

  const focusRingSlot =
    effectiveState === "active" ||
    ((effectiveState === "focus" || effectiveState === "error-focus") && isActiveSlot);

  const stateClasses = slotClassesForState(effectiveState, hasChar, focusRingSlot);

  return (
    <div
      data-otp-slot=""
      data-active={isActiveSlot ? "true" : "false"}
      data-filled={hasChar ? "true" : "false"}
      className={cx(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-[var(--color-outline-surface)] font-mono text-sm font-medium tabular-nums leading-none transition-[border-color,box-shadow]",
        !ctx.state && !hasChar && effectiveState === "default" && "group-hover:border-primary/20",
        stateClasses,
        className
      )}
      {...props}
    >
      {hasChar ? <span className="text-foreground">{char}</span> : <span className="text-muted-foreground"> </span>}
    </div>
  );
}

export type InputOTPFieldProps = {
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  /** Props forwarded to the root `InputOTP`. */
  otpProps?: Omit<InputOTPProps, "children">;
  children: React.ReactNode;
  className?: string;
};

/** Optional vertical field shell matching `Input` spacing (Figma form patterns). */
export function InputOTPField({
  label = "One-time code",
  description = "Enter the code sent to your device.",
  showLabel = true,
  showDescription = true,
  otpProps,
  children,
  className,
}: InputOTPFieldProps) {
  return (
    <div className={cx("relative flex w-full max-w-[373px] flex-col items-start gap-[var(--spacing-2)]", className)}>
      {showLabel ? (
        <p className="w-full font-body text-sm font-semibold leading-none text-foreground">{label}</p>
      ) : null}
      <InputOTP {...otpProps}>{children}</InputOTP>
      {showDescription ? (
        <p className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
