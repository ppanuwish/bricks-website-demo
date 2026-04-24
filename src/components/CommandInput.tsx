import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type ReactNode,
} from "react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / Search` (5197:3296) — 16×16, matches `ComboboxSearch` / `Input`. */
function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/** Figma `Icon / X` (5197:2988) — 16×16. */
function ClearIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/**
 * Pin Figma `State` in Storybook. When omitted, appearance follows `disabled`,
 * field focus, and whether the value is non-empty.
 */
export type CommandInputState = "default" | "filled" | "disabled";

export type CommandInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "className"> & {
  state?: CommandInputState;
  /** Called after the field is cleared; use with controlled `value` to reset parent state. */
  onClear?: () => void;
  /** Leading mark; Figma `Icon / Search` by default. */
  icon?: ReactNode;
  className?: string;
  inputClassName?: string;
};

/**
 * Command palette filter field (Figma `CommandInput`, 260:4100): bottom rule, transparent
 * surface, leading search and trailing clear. Uses `theme.css` spacing, `border-input`,
 * `muted-foreground` / `foreground`, and body `text-sm` / `leading-5`.
 */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput(
    {
      state,
      icon,
      className,
      inputClassName,
      placeholder = "Placeholder",
      disabled: disabledProp,
      readOnly,
      value,
      defaultValue = "",
      onChange,
      onFocus,
      onBlur,
      onClear,
      onKeyDown,
      "aria-label": ariaLabel,
      id: idProp,
      ...inputProps
    },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        }         else if (ref && typeof ref === "object" && "current" in ref) {
          (ref as { current: HTMLInputElement | null }).current = node;
        }
      },
      [ref]
    );

    const autoId = useId();
    const inputId = idProp ?? `command-input-${autoId}`;
    const disabled = Boolean(disabledProp) || state === "disabled";
    const forcedDefault = state === "default";
    const forcedFilled = state === "filled";

    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState(String(defaultValue ?? ""));
    const currentString = isControlled ? String(value ?? "") : innerValue;
    const hasValue = currentString.length > 0;
    const [focused, setFocused] = useState(false);

    const filledVisual =
      forcedFilled || (!forcedDefault && !disabled && (hasValue || focused));

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const clearField = useCallback(() => {
      onClear?.();
      if (!isControlled) setInnerValue("");
      if (isControlled) {
        onChange?.({
          target: { value: "" } as HTMLInputElement,
          currentTarget: inputRef.current ?? ({} as HTMLInputElement),
        } as ChangeEvent<HTMLInputElement>);
      }
    }, [isControlled, onChange, onClear]);

    const handleClearClick = () => {
      if (disabled || readOnly) return;
      clearField();
      inputRef.current?.focus();
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === "Escape" && hasValue) {
        e.preventDefault();
        clearField();
      }
    };

    const searchIconClass = cx(
      "pointer-events-none flex size-4 shrink-0 items-center justify-center transition-[color,opacity]",
      disabled && "text-popover-foreground",
      !disabled && filledVisual && "text-foreground",
      !disabled && !filledVisual && "text-muted-foreground opacity-50"
    );

    const clearIconClass = cx(
      "size-4 transition-[color,opacity]",
      disabled && "text-popover-foreground",
      !disabled && filledVisual && "text-foreground",
      !disabled && !filledVisual && "text-muted-foreground"
    );

    return (
      <div
        data-state={state}
        data-filled={filledVisual || undefined}
        className={cx(
          "group flex h-12 w-full min-w-0 max-w-[180px] items-center gap-[var(--spacing-2)] border-b border-input bg-transparent px-[var(--spacing-3)] transition-[opacity,color]",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <span className={searchIconClass}>{icon ?? <SearchIcon className="size-4" />}</span>
        <input
          ref={setInputRef}
          id={inputId}
          type="text"
          role="searchbox"
          disabled={disabled}
          readOnly={readOnly}
          value={isControlled ? value : innerValue}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label={ariaLabel ?? placeholder}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onKeyDown={handleKeyDown}
          className={cx(
            "min-w-0 flex-1 bg-transparent font-body text-sm font-normal leading-5 outline-none placeholder:text-muted-foreground focus-visible:ring-0",
            filledVisual ? "text-foreground" : "text-muted-foreground",
            inputClassName
          )}
          {...inputProps}
        />
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled || readOnly}
          aria-label="Clear"
          className={cx(
            "flex size-4 shrink-0 items-center justify-center rounded-sm outline-none",
            !disabled && !readOnly && "text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={handleClearClick}
        >
          <ClearIcon className={clearIconClass} />
        </button>
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";
