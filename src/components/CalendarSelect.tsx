import {
  useEffect,
  useRef,
  type KeyboardEventHandler,
  type PointerEventHandler,
} from "react";
import { ChevronDown } from "lucide-react";

import { SelectMenuItem } from "./SelectMenuItem";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type CalendarSelectProps = {
  id: string;
  listboxId: string;
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  minWidthClass?: string;
  fontWeight?: "normal" | "semibold";
  /** When true, trigger text uses `text-muted-foreground` (empty preset field). */
  mutedLabel?: boolean;
  /** Larger trigger + centered label for calendar month/year row. */
  navTrigger?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CalendarSelect({
  id,
  listboxId,
  label,
  placeholder,
  options,
  value,
  onValueChange,
  disabled,
  minWidthClass,
  fontWeight = "normal",
  mutedLabel = false,
  navTrigger = false,
  open,
  onOpenChange,
}: CalendarSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const showList = open && !disabled;

  useEffect(() => {
    if (!showList) return;
    const onDoc = (event: PointerEvent) => {
      const r = rootRef.current;
      const t = event.target;
      if (!r || !(t instanceof Node) || r.contains(t)) return;
      onOpenChange(false);
    };
    document.addEventListener("pointerdown", onDoc, true);
    return () => document.removeEventListener("pointerdown", onDoc, true);
  }, [showList, onOpenChange]);

  useEffect(() => {
    if (!showList) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [showList, onOpenChange]);

  const handleTriggerPointerDown: PointerEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) return;
    if (event.button !== 0) return;
    onOpenChange(!open);
  };

  const handleTriggerKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenChange(true);
    }
  };

  const text =
    label ||
    (value && options.some((o) => o.value === value) ? options.find((o) => o.value === value)!.label : placeholder);

  const textClass = mutedLabel && !label && !value ? "text-muted-foreground" : "text-foreground";

  return (
    <div ref={rootRef} className={cx("relative flex shrink-0 flex-col gap-0", minWidthClass)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={showList}
        aria-controls={showList ? listboxId : undefined}
        className={cx(
          "flex w-full cursor-default items-center overflow-hidden rounded-md border border-input bg-[var(--custom-background-dark-input-30)] shadow-[0_1px_2px_0_var(--color-button-shadow)] outline-none transition-[border-color,box-shadow,background-color]",
          navTrigger
            ? "h-10 min-h-10 justify-between gap-[var(--spacing-2)] px-[var(--spacing-3)] py-0 text-left"
            : "h-[34px] gap-[var(--spacing-2)] px-[var(--spacing-2)] py-[var(--spacing-1)] text-left",
          "hover:border-primary/20",
          "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]",
          disabled && "pointer-events-none opacity-50"
        )}
        onPointerDown={handleTriggerPointerDown}
        onKeyDown={handleTriggerKeyDown}
      >
        <span
          className={cx(
            "min-w-0 flex-1 truncate font-body text-sm leading-5",
            navTrigger && "text-center",
            textClass,
            fontWeight === "semibold" ? "font-semibold" : "font-normal"
          )}
        >
          {text}
        </span>
        <ChevronDown
          aria-hidden
          className={cx("size-4 shrink-0", mutedLabel && !label && !value ? "text-muted-foreground" : "text-foreground")}
          strokeWidth={1.5}
        />
      </button>
      {showList ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 border border-border bg-popover py-1 shadow-md"
          onMouseDown={(e) => e.preventDefault()}
        >
          {options.map((opt) => (
            <SelectMenuItem
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              variant={value === opt.value ? "checkbox" : "default"}
              onClick={() => {
                onValueChange(opt.value);
                onOpenChange(false);
              }}
            >
              {opt.label}
            </SelectMenuItem>
          ))}
        </div>
      ) : null}
    </div>
  );
}
