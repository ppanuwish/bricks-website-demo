import { useCallback, useId, useMemo, useState } from "react";

import { Calendar } from "./Calendar";
import { CalendarSelect } from "./CalendarSelect";

const PRESETS = [
  { value: "today", label: "Today", offset: 0 },
  { value: "tomorrow", label: "Tomorrow", offset: 1 },
  { value: "in3", label: "In 3 days", offset: 3 },
  { value: "in7", label: "In a week", offset: 7 },
] as const;

export type DatePickerSelectProps = {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  locale?: string;
  disabled?: boolean;
  /** Preset listbox label when no date is chosen. */
  placeholder?: string;
  className?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDaysFromToday(offset: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return startOfDay(d);
}

function matchingPresetKey(date: Date): string | undefined {
  const t = startOfDay(date).getTime();
  for (const p of PRESETS) {
    if (startOfDay(addDaysFromToday(p.offset)).getTime() === t) return p.value;
  }
  return undefined;
}

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export { CalendarSelect, type CalendarSelectProps } from "./CalendarSelect";

/**
 * Preset field + month/year compact selects + calendar (Figma `Date Picker / Preset`, node 344:4122).
 * Uses {@link Calendar}, {@link CalendarSelect}, and `theme.css` tokens (`popover`, `border`, shadows).
 */
export function DatePickerSelect({
  value: valueControlled,
  defaultValue = null,
  onChange,
  locale = "en-US",
  disabled = false,
  placeholder = "Pick a date",
  className,
}: DatePickerSelectProps) {
  const reactId = useId();
  const [uncontrolled, setUncontrolled] = useState<Date | null>(() => defaultValue ?? null);
  const isControlled = valueControlled !== undefined;
  const value = isControlled ? valueControlled ?? null : uncontrolled;

  const setValue = useCallback(
    (next: Date | null) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const presetKey = value ? matchingPresetKey(value) ?? "" : "";
  const presetButtonLabel = useMemo(() => {
    if (!value) return "";
    const k = matchingPresetKey(value);
    if (k) return PRESETS.find((p) => p.value === k)?.label ?? "";
    return formatDate(value, locale);
  }, [value, locale]);

  const [openPreset, setOpenPreset] = useState(false);
  const [navResetKey, setNavResetKey] = useState(0);

  const shadowMd =
    "shadow-[0px_4px_6px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent),0px_2px_4px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent)]";

  return (
    <div
      className={cx(
        "flex w-max max-w-[calc(100vw-2rem)] flex-col gap-[var(--spacing-2)] border border-border bg-popover p-[var(--spacing-2)]",
        shadowMd,
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <CalendarSelect
        id={`${reactId}-preset-trigger`}
        listboxId={`${reactId}-preset-list`}
        label={presetButtonLabel}
        placeholder={placeholder}
        options={[...PRESETS]}
        value={presetKey}
        onValueChange={(v) => {
          const p = PRESETS.find((x) => x.value === v);
          if (p) setValue(addDaysFromToday(p.offset));
        }}
        disabled={disabled}
        fontWeight="semibold"
        mutedLabel={!value}
        minWidthClass="w-full"
        open={openPreset}
        onOpenChange={(o) => {
          if (o) setNavResetKey((k) => k + 1);
          setOpenPreset(o);
        }}
      />

      <div
        className={cx(
          "flex w-max flex-col gap-[var(--spacing-4)] border border-border p-[var(--spacing-3)]"
        )}
      >
        <Calendar
          variant="simple"
          value={value}
          onChange={(d) => {
            if (d != null) setValue(d);
          }}
          disabled={disabled}
          locale={locale}
          hideChrome
          navigationSelectResetKey={navResetKey}
          onNavigationSelectOpenChange={(_, open) => {
            if (open) setOpenPreset(false);
          }}
          className="gap-[var(--spacing-4)]"
        />
      </div>
    </div>
  );
}
