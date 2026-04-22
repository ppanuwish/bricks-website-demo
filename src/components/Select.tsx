import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEventHandler,
  type PointerEventHandler,
  type ReactNode,
} from "react";
import { SelectMenuItem } from "./SelectMenuItem";

/** Matches Figma `Select` component set (node 345:11530). */
export type SelectDisplayState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "filled"
  | "filled-hover"
  | "filled-focus"
  | "disabled";

export type SelectOption = { value: string; label: string };

export type SelectProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  /** Leading icon when `showIcon`; defaults to Figma Icon / CircleDashed (5197:685). */
  icon?: ReactNode;
  disabled?: boolean;
  /**
   * Pin visuals for Storybook / Figma. `"default"` = derive from focus, open, and value.
   */
  state?: SelectDisplayState;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Renders as `SelectMenuItem` rows. Ignored if `children` is passed. */
  options?: SelectOption[];
  /** Custom listbox body; use `SelectMenuItem` for rows. */
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  id?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma Icon / ChevronDown (5197:4026) — 16×16, aligned with `Form` chevron. */
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={cx("size-4 shrink-0", className)}>
      <path
        d="M4 6.5 8 10l4-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma Icon / CircleDashed (5197:685) — 16×16 box. */
function CircleDashedIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function triggerClasses(display: SelectDisplayState) {
  const xs = "shadow-[0_1px_2px_0_var(--color-button-shadow)]";
  const ring = "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
  switch (display) {
    case "default":
      return cx("border border-input bg-background", xs, "hover:border-primary/20");
    case "hover":
      return cx("border border-primary/20 bg-background", xs);
    case "focus":
      return cx("border border-ring bg-accent", ring);
    case "active":
      return cx(
        "border-2 border-accent-foreground bg-background",
        "shadow-[0_1px_2px_0_var(--color-button-shadow)]"
      );
    case "filled":
      return cx("border border-input bg-background", xs, "hover:border-primary/20");
    case "filled-hover":
      return cx("border border-primary/20 bg-background", xs);
    case "filled-focus":
      return cx("border border-ring bg-background", ring);
    case "disabled":
      return cx("border border-input bg-background", xs);
  }
}

function resolveDisplayState(
  forced: SelectDisplayState | undefined,
  ctx: { disabled: boolean; open: boolean; focused: boolean; hasValue: boolean }
): SelectDisplayState {
  if (ctx.disabled) return "disabled";
  if (forced && forced !== "default") return forced;
  if (ctx.open) return "active";
  if (ctx.focused) return ctx.hasValue ? "filled-focus" : "focus";
  if (ctx.hasValue) return "filled";
  return "default";
}

/**
 * Select field + listbox (Figma `Select`, node 345:11530). Trigger uses `theme.css`
 * borders, shadows, and focus ring tokens; options render as {@link SelectMenuItem}.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label = "Label",
    description = "This is a select description.",
    placeholder = "Placeholder",
    showLabel = true,
    showDescription = true,
    showIcon = false,
    icon,
    disabled = false,
    state: stateProp = "default",
    value: valueControlled,
    defaultValue = "",
    onValueChange,
    options,
    children,
    className,
    wrapperClassName,
    id: idProp,
  },
  ref
) {
  const reactId = useId();
  const listboxId = `${reactId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueControlled !== undefined;
  const value = isControlled ? (valueControlled ?? "") : uncontrolledValue;
  const hasValue = Boolean(value);
  const isEffectivelyDisabled = disabled || stateProp === "disabled";
  const selectedLabel =
    options?.find((o) => o.value === value)?.label ?? (hasValue ? value : "");

  /** Figma filled / active rows use the same string slot as `placeholder` for static previews. */
  const forcedFilledPreview =
    stateProp !== "default" &&
    (stateProp === "filled" ||
      stateProp === "filled-hover" ||
      stateProp === "filled-focus" ||
      stateProp === "active");
  const showValueTypography = hasValue || forcedFilledPreview;
  const triggerLabelText = hasValue ? selectedLabel : placeholder;

  const display = resolveDisplayState(stateProp, {
    disabled: isEffectivelyDisabled,
    open,
    focused,
    hasValue,
  });

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  useEffect(() => {
    if (!open) return;
    const onDocPointer = (event: PointerEvent) => {
      const root = rootRef.current;
      const t = event.target;
      if (!root || !(t instanceof Node) || root.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointer, true);
    return () => document.removeEventListener("pointerdown", onDocPointer, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  const handleTriggerPointerDown: PointerEventHandler<HTMLButtonElement> = (event) => {
    if (isEffectivelyDisabled || stateProp !== "default") return;
    if (event.button !== 0) return;
    setOpen((o) => !o);
  };

  const handleTriggerKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (isEffectivelyDisabled || stateProp !== "default") return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const hasListContent = Boolean((options?.length ?? 0) > 0 || children);
  const showListbox = Boolean(
    open && stateProp === "default" && !isEffectivelyDisabled && hasListContent
  );

  const triggerText = showValueTypography ? (
    <span className="min-w-0 flex-1 truncate text-left font-body text-sm font-semibold leading-5 text-foreground">
      {triggerLabelText}
    </span>
  ) : (
    <span className="min-w-0 flex-1 truncate text-left font-body text-sm font-semibold leading-5 text-muted-foreground">
      {placeholder}
    </span>
  );

  const chevronClass =
    display === "disabled" ? "text-muted-foreground" : "text-foreground";

  return (
    <div
      ref={rootRef}
      className={cx(
        "relative flex w-full flex-col items-start gap-[var(--spacing-2)]",
        isEffectivelyDisabled && "opacity-50",
        wrapperClassName
      )}
    >
      {showLabel ? (
        <p className="w-full font-body text-sm font-semibold leading-none text-foreground">{label}</p>
      ) : null}

      <button
        ref={ref}
        type="button"
        id={idProp}
        disabled={isEffectivelyDisabled}
        aria-haspopup="listbox"
        aria-expanded={showListbox}
        aria-controls={showListbox ? listboxId : undefined}
        data-state={display}
        className={cx(
          "flex h-9 w-full shrink-0 cursor-default items-center gap-[var(--spacing-2)] overflow-hidden px-[var(--spacing-3)] py-[var(--spacing-2)] text-left outline-none transition-[border-color,box-shadow,background-color]",
          triggerClasses(display),
          isEffectivelyDisabled && "pointer-events-none",
          className
        )}
        onPointerDown={handleTriggerPointerDown}
        onKeyDown={handleTriggerKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
        }}
      >
        {showIcon ? (
          <span className="flex size-4 shrink-0 items-center justify-center text-foreground">
            {icon ?? <CircleDashedIcon className="size-4" />}
          </span>
        ) : null}
        {triggerText}
        <ChevronDownIcon className={chevronClass} />
      </button>

      {showListbox ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 border border-border bg-popover py-1 shadow-md"
          onMouseDown={(event) => event.preventDefault()}
        >
          {children
            ? children
            : options?.map((opt) => (
                <SelectMenuItem
                  key={opt.value}
                  role="option"
                  aria-selected={value === opt.value}
                  variant={value === opt.value ? "checkbox" : "default"}
                  onClick={() => {
                    setValue(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </SelectMenuItem>
              ))}
        </div>
      ) : null}

      {showDescription ? (
        <p className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";
