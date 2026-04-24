import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEventHandler,
  type PointerEventHandler,
} from "react";
import { Calendar as CalendarLucide } from "lucide-react";

import { Calendar } from "./Calendar";

/** Matches Figma `Date Picker` set (node 334:4051): Default / Hover / Focus / Disabled × empty vs filled. */
export type DatePickerDisplayState =
  | "default"
  | "hover"
  | "focus"
  | "filled"
  | "filled-hover"
  | "filled-focus"
  | "disabled";

export type DatePickerInputProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  /** Pin visuals for Storybook / design QA. `"default"` = derive from hover, focus, open, and value. */
  state?: DatePickerDisplayState;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  /** IANA subtag; forwarded to `Intl.DateTimeFormat`. */
  locale?: string;
  /** Optional bounds for the calendar. */
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  wrapperClassName?: string;
  id?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function triggerClasses(display: DatePickerDisplayState) {
  const xs = "shadow-[0_1px_2px_0_var(--color-button-shadow)]";
  const ring = "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
  switch (display) {
    case "default":
      return cx(
        "border border-input bg-[var(--custom-background-dark-input-30)]",
        xs,
        "hover:border-input hover:bg-accent"
      );
    case "hover":
      return cx("border border-input bg-accent", xs);
    case "focus":
      return cx("border border-ring bg-[var(--custom-background-dark-input-30)]", ring);
    case "filled":
      return cx(
        "border border-input bg-[var(--custom-background-dark-input-30)]",
        xs,
        "hover:border-input hover:bg-accent"
      );
    case "filled-hover":
      return cx("border border-input bg-accent", xs);
    case "filled-focus":
      return cx("border border-ring bg-[var(--custom-background-dark-input-30)]", ring);
    case "disabled":
      return cx("border border-input bg-[var(--custom-background-dark-input-30)]", xs);
  }
}

function resolveDisplayState(
  forced: DatePickerDisplayState | undefined,
  ctx: { disabled: boolean; open: boolean; focused: boolean; hovered: boolean; hasValue: boolean }
): DatePickerDisplayState {
  if (ctx.disabled) return "disabled";
  if (forced && forced !== "default") return forced;
  if (ctx.open || ctx.focused) return ctx.hasValue ? "filled-focus" : "focus";
  if (ctx.hovered) return ctx.hasValue ? "filled-hover" : "hover";
  if (ctx.hasValue) return "filled";
  return "default";
}

function formatDisplayedDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Date picker trigger + popover calendar (Figma `Date Picker`, node 334:4051).
 * Trigger tokens align with `theme.css` (`--custom-background-dark-input-30`, `--color-button-focus-outline`, etc.).
 */
export const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(
  function DatePickerInput(
    {
      label = "Label",
      description = "This is an input description.",
      placeholder = "Pick a date",
      showLabel = true,
      showDescription = true,
      disabled = false,
      state: stateProp = "default",
      value: valueControlled,
      defaultValue = null,
      onChange,
      locale = "en-US",
      minDate,
      maxDate,
      className,
      wrapperClassName,
      id: idProp,
    },
    ref
  ) {
    const reactId = useId();
    const panelId = `${reactId}-calendar`;
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [uncontrolled, setUncontrolled] = useState<Date | null>(defaultValue ?? null);
    const isControlled = valueControlled !== undefined;
    const value = isControlled ? valueControlled ?? null : uncontrolled;
    const hasValue = Boolean(value);
    const isEffectivelyDisabled = disabled || stateProp === "disabled";

    const setValue = useCallback(
      (next: Date | null) => {
        if (!isControlled) setUncontrolled(next);
        onChange?.(next);
      },
      [isControlled, onChange]
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

    const forcedFilledPreview =
      stateProp !== "default" &&
      (stateProp === "filled" || stateProp === "filled-hover" || stateProp === "filled-focus");
    const showValueTypography = hasValue || forcedFilledPreview;

    const display = resolveDisplayState(stateProp, {
      disabled: isEffectivelyDisabled,
      open,
      focused,
      hovered,
      hasValue: showValueTypography,
    });

    const handleTriggerPointerDown: PointerEventHandler<HTMLButtonElement> = (event) => {
      if (isEffectivelyDisabled || stateProp !== "default") return;
      if (event.button !== 0) return;
      if (open) {
        setOpen(false);
        return;
      }
      setOpen(true);
    };

    const handleTriggerKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
      if (isEffectivelyDisabled || stateProp !== "default") return;
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
    };

    const textClass = (() => {
      if (display === "disabled") return "text-muted-foreground";
      if (showValueTypography) {
        if (display === "filled-hover") return "text-accent-foreground";
        return "text-foreground";
      }
      return "text-muted-foreground";
    })();

    const iconClass =
      display === "disabled"
        ? "text-muted-foreground"
        : showValueTypography
          ? display === "filled-hover"
            ? "text-accent-foreground"
            : "text-foreground"
          : "text-muted-foreground";

    return (
      <div
        ref={rootRef}
        className={cx(
          "relative flex w-full max-w-[240px] flex-col items-start gap-[var(--spacing-2)]",
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
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          data-state={display}
          className={cx(
            "flex h-9 w-full shrink-0 cursor-default items-center gap-[var(--spacing-2)] overflow-hidden rounded-md px-[var(--spacing-4)] py-[var(--spacing-2)] text-left outline-none transition-[border-color,box-shadow,background-color,color]",
            triggerClasses(display),
            isEffectivelyDisabled && "pointer-events-none",
            className
          )}
          onPointerDown={handleTriggerPointerDown}
          onKeyDown={handleTriggerKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <CalendarLucide aria-hidden className={cx("size-4 shrink-0", iconClass)} strokeWidth={1.5} />
          <span
            className={cx(
              "min-w-0 flex-1 truncate font-body text-sm font-normal leading-5",
              textClass
            )}
          >
            {hasValue ? formatDisplayedDate(value!, locale) : placeholder}
          </span>
        </button>

        {open && stateProp === "default" && !isEffectivelyDisabled ? (
          <div
            id={panelId}
            role="dialog"
            aria-label="Calendar"
            className="absolute left-0 top-full z-20 mt-1 w-max max-w-[calc(100vw-2rem)] border border-border bg-popover p-3 text-popover-foreground shadow-md"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Calendar
              variant="one-column"
              weekStartsOn="monday"
              value={value}
              onChange={(d) => {
                if (d != null) {
                  setValue(d);
                  setOpen(false);
                }
              }}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              hideChrome
              className="gap-[var(--spacing-4)]"
            />
          </div>
        ) : null}

        {showDescription ? (
          <p className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    );
  }
);

DatePickerInput.displayName = "DatePickerInput";
