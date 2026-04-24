import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CalendarArrowButton } from "./CalendarArrowButton";
import { CalendarCustomDayButton } from "./CalendarCustomDayButton";
import { CalendarDayButton, type CalendarDayButtonVariant } from "./CalendarDayButton";
import { CalendarDayHeader } from "./CalendarDayHeader";
import { CalendarSelect } from "./CalendarSelect";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const WEEKDAY_LABELS_SU = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const WEEKDAY_LABELS_MO = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDayOutOfRange(cell: Date, minDate?: Date, maxDate?: Date): boolean {
  const t = startOfDay(cell).getTime();
  const minT = minDate !== undefined ? startOfDay(minDate).getTime() : undefined;
  const maxT = maxDate !== undefined ? startOfDay(maxDate).getTime() : undefined;
  if (minT !== undefined && t < minT) return true;
  if (maxT !== undefined && t > maxT) return true;
  return false;
}

function calendarCells(year: number, month: number, weekStartsOn: "sunday" | "monday"): Date[] {
  const cells: Date[] = [];
  const first = new Date(year, month, 1);
  const startPad = weekStartsOn === "sunday" ? first.getDay() : (first.getDay() + 6) % 7;
  for (let i = 0; i < startPad; i++) {
    cells.push(new Date(year, month, 1 - startPad + i));
  }
  const dim = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= dim; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]!;
    cells.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1]!;
    cells.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return cells;
}

function calendarDayModel(
  cell: Date,
  cursorY: number,
  cursorM: number,
  selected: Date | null | undefined,
  today: Date
): { variant: CalendarDayButtonVariant; selected: boolean } {
  const inMonth = cell.getMonth() === cursorM && cell.getFullYear() === cursorY;
  const isSelected = selected ? sameDay(cell, selected) : false;
  const isToday = sameDay(cell, today);
  if (!inMonth) return { variant: "outside", selected: isSelected };
  if (isToday && !isSelected) return { variant: "current", selected: false };
  return { variant: "default", selected: isSelected };
}

function nextMonth(y: number, m: number): { y: number; m: number } {
  return m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 };
}

function prevMonth(y: number, m: number): { y: number; m: number } {
  return m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 };
}

/** Figma `Calendar` frame (node 17179:197284) — component property `Type`. */
export type CalendarVariant =
  | "simple"
  | "one-column"
  | "with-presets"
  | "with-time"
  | "custom-days"
  | "two-columns"
  | "three-columns";

const shadowPanel =
  "shadow-[0px_4px_6px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent),0px_2px_4px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent)]";

export type CalendarRenderDayContext = {
  variant: CalendarDayButtonVariant;
  selected: boolean;
  inMonth: boolean;
  disabled: boolean;
  /** True when the day falls outside optional `minDate` / `maxDate` bounds. */
  outOfRange: boolean;
};

export type CalendarProps = {
  className?: string;
  /** Figma `Type` (default matches shadcn Simple calendar). */
  variant?: CalendarVariant;
  /** Weekday row order. */
  weekStartsOn?: "sunday" | "monday";
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  locale?: string;
  disabled?: boolean;
  /** Visible month when uncontrolled; ignored when `value` drives month. */
  defaultMonth?: { year: number; month: number };
  /** Preset column for `variant="with-presets"` (e.g. quick-date list). */
  presets?: ReactNode;
  /** Footer area for `variant="with-time"` (e.g. time inputs). */
  timeSlot?: ReactNode;
  /** Replace default day cell (Figma `Type=Custom Days`). */
  renderDay?: (cell: Date, ctx: CalendarRenderDayContext) => ReactNode;
  /** Subtitle for custom day cells when `variant="custom-days"` and `renderDay` is not set. */
  customDaySubtitle?: (cell: Date) => ReactNode;
  /** Optional inclusive bounds; matching days render disabled and do not commit on click. */
  minDate?: Date;
  maxDate?: Date;
  /** When true, omits panel border, background, shadow, and outer padding (embed inside another frame). */
  hideChrome?: boolean;
  /** Bump to programmatically close month/year listboxes (e.g. when a sibling control opens). */
  navigationSelectResetKey?: number;
  /** Fired when the month or year compact list opens or closes. */
  onNavigationSelectOpenChange?: (which: "month" | "year", open: boolean) => void;
};

type MonthGridDayMode = "default" | "custom-days";

function MonthGrid({
  year,
  month,
  value,
  today,
  disabled,
  weekStartsOn,
  renderDay,
  customDaySubtitle,
  dayMode,
  onDayClick,
  minDate,
  maxDate,
}: {
  year: number;
  month: number;
  value: Date | null;
  today: Date;
  disabled: boolean;
  weekStartsOn: "sunday" | "monday";
  renderDay?: CalendarProps["renderDay"];
  customDaySubtitle?: CalendarProps["customDaySubtitle"];
  dayMode: MonthGridDayMode;
  onDayClick: (cell: Date, outside: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const cells = useMemo(
    () => calendarCells(year, month, weekStartsOn),
    [year, month, weekStartsOn]
  );
  const labels = weekStartsOn === "sunday" ? WEEKDAY_LABELS_SU : WEEKDAY_LABELS_MO;

  const weekGrid =
    "grid w-full min-w-[calc(7*var(--width-w-8,32px))] shrink-0 grid-cols-[repeat(7,minmax(var(--width-w-8,32px),1fr))] justify-items-center";

  return (
    <div className="flex w-full min-w-[calc(7*var(--width-w-8,32px))] shrink-0 flex-col gap-[var(--spacing-2)]">
      <div className={weekGrid}>
        {labels.map((d) => (
          <CalendarDayHeader key={d}>{d}</CalendarDayHeader>
        ))}
      </div>
      <div className="flex w-full min-w-[calc(7*var(--width-w-8,32px))] shrink-0 flex-col gap-0">
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className={cx(weekGrid, "items-center")}>
            {cells.slice(row * 7, row * 7 + 7).map((cell) => {
              const { variant: dayVariant, selected: daySelected } = calendarDayModel(
                cell,
                year,
                month,
                value,
                today
              );
              const outside = dayVariant === "outside";
              const outOfRange = isDayOutOfRange(cell, minDate, maxDate);
              const dayDisabled = Boolean(disabled) || outOfRange;
              const ctx: CalendarRenderDayContext = {
                variant: dayVariant,
                selected: daySelected,
                inMonth: !outside,
                disabled: dayDisabled,
                outOfRange,
              };

              if (renderDay) {
                return (
                  <div key={cell.toISOString()} className="contents">
                    {renderDay(cell, ctx)}
                  </div>
                );
              }

              if (dayMode === "custom-days") {
                const sub = customDaySubtitle?.(cell) ?? "$100";
                return (
                  <CalendarCustomDayButton
                    key={cell.toISOString()}
                    variant={dayVariant}
                    selected={daySelected}
                    disabled={dayDisabled}
                    tabIndex={outside ? -1 : undefined}
                    subtitle={sub}
                    onClick={() => onDayClick(cell, outside)}
                  >
                    {cell.getDate()}
                  </CalendarCustomDayButton>
                );
              }

              return (
                <CalendarDayButton
                  key={cell.toISOString()}
                  variant={dayVariant}
                  selected={daySelected}
                  disabled={dayDisabled}
                  tabIndex={outside ? -1 : undefined}
                  onClick={() => onDayClick(cell, outside)}
                >
                  {cell.getDate()}
                </CalendarDayButton>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Composed calendar surface (Figma `Calendar`, node 17179:197284).
 * Uses {@link CalendarArrowButton}, {@link CalendarDayHeader}, {@link CalendarDayButton} / {@link CalendarCustomDayButton},
 * {@link CalendarSelect} for `variant="simple"`, and `theme.css` spacing + shadow tokens.
 */
export function Calendar({
  className,
  variant = "simple",
  weekStartsOn = "sunday",
  value: valueControlled,
  defaultValue = null,
  onChange,
  locale = "en-US",
  disabled = false,
  defaultMonth,
  presets,
  timeSlot,
  renderDay,
  customDaySubtitle,
  minDate,
  maxDate,
  hideChrome = false,
  navigationSelectResetKey = 0,
  onNavigationSelectOpenChange,
}: CalendarProps) {
  const reactId = useId();
  const [uncontrolled, setUncontrolled] = useState<Date | null>(defaultValue);
  const isControlled = valueControlled !== undefined;
  const value = isControlled ? valueControlled ?? null : uncontrolled;

  const setValue = useCallback(
    (next: Date | null) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const today = useMemo(() => startOfDay(new Date()), []);

  const [cursor, setCursor] = useState(() => {
    if (defaultMonth) return { y: defaultMonth.year, m: defaultMonth.month };
    const base = value ?? today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const valueTime = value?.getTime() ?? null;
  const prevValueTime = useRef<number | null>(null);
  useEffect(() => {
    if (valueTime === prevValueTime.current) return;
    prevValueTime.current = valueTime;
    if (value) {
      setCursor({ y: value.getFullYear(), m: value.getMonth() });
    }
  }, [valueTime, value]);

  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  useEffect(() => {
    setOpenMonth(false);
    setOpenYear(false);
  }, [navigationSelectResetKey]);

  const closeSelects = (except: "month" | "year" | null) => {
    if (except !== "month") setOpenMonth(false);
    if (except !== "year") setOpenYear(false);
  };

  const monthOptions = MONTH_LABELS.map((label, i) => ({
    value: String(i),
    label,
  }));

  const yearOptions = useMemo(() => {
    const ys: { value: string; label: string }[] = [];
    for (let y = cursor.y - 6; y <= cursor.y + 6; y++) {
      ys.push({ value: String(y), label: String(y) });
    }
    return ys;
  }, [cursor.y]);

  const monthTitle = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    new Date(cursor.y, cursor.m, 1)
  );

  const isMultiMonth = variant === "two-columns" || variant === "three-columns";
  const isWithPresetsShell = variant === "with-presets";

  const shell = cx(
    "flex w-max max-w-[min(100%,calc(100vw-2rem))] flex-col gap-[var(--spacing-4)]",
    !hideChrome && "border border-border bg-background p-[var(--spacing-3)]",
    !hideChrome && shadowPanel,
    hideChrome && "border-0 bg-transparent p-0 shadow-none",
    disabled && "pointer-events-none opacity-50",
    className,
    // After `className` so consumer `min-w-0` / flex shrink cannot collapse the 7-column day grid
    // (DatePickerInput / DatePickerSelect pass `hideChrome` inside narrow shells).
    hideChrome &&
      !isMultiMonth &&
      !isWithPresetsShell &&
      "min-w-[calc(7*var(--width-w-8,32px))] shrink-0"
  );

  const pickDay = useCallback(
    (cell: Date, outside: boolean) => {
      if (isDayOutOfRange(cell, minDate, maxDate)) return;
      if (outside) {
        setCursor({ y: cell.getFullYear(), m: cell.getMonth() });
      }
      setValue(startOfDay(cell));
    },
    [setValue, minDate, maxDate]
  );

  const dayMode: MonthGridDayMode = variant === "custom-days" ? "custom-days" : "default";

  const monthGrid = (y: number, m: number) => (
    <MonthGrid
      key={`${y}-${m}`}
      year={y}
      month={m}
      value={value}
      today={today}
      disabled={disabled}
      weekStartsOn={weekStartsOn}
      renderDay={renderDay}
      customDaySubtitle={customDaySubtitle}
      dayMode={dayMode}
      onDayClick={pickDay}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  const headerSimple = (
    <div className="relative flex w-full min-w-0 items-center justify-between gap-[var(--spacing-2)]">
      <div className="flex shrink-0 items-center">
        <CalendarArrowButton
          variant="previous"
          disabled={disabled}
          aria-label="Previous month"
          onClick={() => setCursor((c) => prevMonth(c.y, c.m))}
        />
      </div>
      <div className="flex min-w-0 items-center gap-[var(--spacing-2)]">
        <CalendarSelect
          id={`${reactId}-month`}
          listboxId={`${reactId}-month-list`}
          label={MONTH_LABELS[cursor.m]}
          placeholder=""
          options={monthOptions}
          value={String(cursor.m)}
          onValueChange={(v) => setCursor((c) => ({ y: c.y, m: Number(v) }))}
          disabled={disabled}
          navTrigger
          minWidthClass="w-fit min-w-max"
          open={openMonth}
          onOpenChange={(o) => {
            closeSelects(o ? "month" : null);
            setOpenMonth(o);
            onNavigationSelectOpenChange?.("month", o);
          }}
        />
        <CalendarSelect
          id={`${reactId}-year`}
          listboxId={`${reactId}-year-list`}
          label={String(cursor.y)}
          placeholder=""
          options={yearOptions}
          value={String(cursor.y)}
          onValueChange={(v) => setCursor((c) => ({ y: Number(v), m: c.m }))}
          disabled={disabled}
          navTrigger
          minWidthClass="w-fit min-w-max"
          open={openYear}
          onOpenChange={(o) => {
            closeSelects(o ? "year" : null);
            setOpenYear(o);
            onNavigationSelectOpenChange?.("year", o);
          }}
        />
      </div>
      <div className="flex shrink-0 items-center">
        <CalendarArrowButton
          variant="next"
          disabled={disabled}
          aria-label="Next month"
          onClick={() => setCursor((c) => nextMonth(c.y, c.m))}
        />
      </div>
    </div>
  );

  const headerOneColumn = (
    <div className="relative flex h-8 w-full items-center justify-center">
      <CalendarArrowButton
        variant="previous"
        disabled={disabled}
        aria-label="Previous month"
        className="absolute left-0 top-1/2 -translate-y-1/2"
        onClick={() => setCursor((c) => prevMonth(c.y, c.m))}
      />
      <p className="px-10 text-center font-body text-sm font-semibold leading-5 text-foreground">{monthTitle}</p>
      <CalendarArrowButton
        variant="next"
        disabled={disabled}
        aria-label="Next month"
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => setCursor((c) => nextMonth(c.y, c.m))}
      />
    </div>
  );

  const m1 = nextMonth(cursor.y, cursor.m);
  const m2 = nextMonth(m1.y, m1.m);

  const coreGrid = (
    <>
      {variant === "simple" ? headerSimple : null}
      {variant === "one-column" ||
      variant === "with-time" ||
      variant === "with-presets" ||
      variant === "custom-days"
        ? headerOneColumn
        : null}
      {variant === "two-columns" ? headerOneColumn : null}
      {variant === "three-columns" ? headerOneColumn : null}

      {variant === "two-columns" ? (
        <div className="flex w-max min-w-0 max-w-full flex-wrap justify-center gap-[var(--spacing-4)]">
          <div className="min-w-[calc(7*var(--width-w-8,32px))] shrink-0">{monthGrid(cursor.y, cursor.m)}</div>
          <div className="min-w-[calc(7*var(--width-w-8,32px))] shrink-0">{monthGrid(m1.y, m1.m)}</div>
        </div>
      ) : null}

      {variant === "three-columns" ? (
        <div className="flex w-max min-w-0 max-w-full flex-wrap justify-center gap-[var(--spacing-3)]">
          <div className="min-w-[calc(7*var(--width-w-8,32px))] shrink-0">{monthGrid(cursor.y, cursor.m)}</div>
          <div className="min-w-[calc(7*var(--width-w-8,32px))] shrink-0">{monthGrid(m1.y, m1.m)}</div>
          <div className="min-w-[calc(7*var(--width-w-8,32px))] shrink-0">{monthGrid(m2.y, m2.m)}</div>
        </div>
      ) : null}

      {variant !== "two-columns" && variant !== "three-columns" ? monthGrid(cursor.y, cursor.m) : null}

      {variant === "with-time" && timeSlot ? (
        <div className="w-full border-t border-border pt-[var(--spacing-3)]">{timeSlot}</div>
      ) : null}
    </>
  );

  if (variant === "with-presets") {
    return (
      <div className={shell}>
        <div className="flex w-max max-w-full min-w-0 gap-[var(--spacing-4)]">
          <div className="flex w-max max-w-[min(100%,140px)] shrink-0 flex-col gap-[var(--spacing-2)] border-r border-border pr-[var(--spacing-4)]">
            {presets ?? (
              <p className="font-body text-xs text-muted-foreground">Use the presets prop for shortcut dates.</p>
            )}
          </div>
          <div className="flex w-max min-w-[calc(7*var(--width-w-8,32px))] shrink-0 flex-col gap-[var(--spacing-4)]">
            {coreGrid}
          </div>
        </div>
      </div>
    );
  }

  return <div className={shell}>{coreGrid}</div>;
}