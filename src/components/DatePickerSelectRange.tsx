import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { CalendarArrowButton } from "./CalendarArrowButton";
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

function nextMonth(y: number, m: number): { y: number; m: number } {
  return m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 };
}

function prevMonth(y: number, m: number): { y: number; m: number } {
  return m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 };
}

const shadowMd =
  "shadow-[0px_4px_6px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent),0px_2px_4px_0px_color-mix(in_srgb,var(--color-shadow-10-percent)_10%,transparent)]";

export type DateRangeValue = { from: Date | null; to: Date | null };

/** Figma `Date Picker / Range` — `size` (md = side-by-side, sm = stacked). */
export type DatePickerSelectRangeSize = "md" | "sm";

export type DatePickerSelectRangeProps = {
  className?: string;
  /** Figma `size`: `md` horizontal pair, `sm` vertical stack. */
  size?: DatePickerSelectRangeSize;
  weekStartsOn?: "sunday" | "monday";
  locale?: string;
  disabled?: boolean;
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onRangeChange?: (range: DateRangeValue) => void;
  minDate?: Date;
  maxDate?: Date;
  navigationSelectResetKey?: number;
  onNavigationSelectOpenChange?: (which: "month" | "year", panel: "left" | "right", open: boolean) => void;
};

function rangeDayPresentation(
  cell: Date,
  cursorY: number,
  cursorM: number,
  from: Date | null,
  to: Date | null,
  today: Date
): {
  variant: CalendarDayButtonVariant;
  selected: boolean;
  inMonth: boolean;
  inBetween: boolean;
} {
  const inMonth = cell.getMonth() === cursorM && cell.getFullYear() === cursorY;
  const t = startOfDay(cell).getTime();
  const fromT = from ? startOfDay(from).getTime() : null;
  const toT = to ? startOfDay(to).getTime() : null;
  const isStart = fromT !== null && t === fromT;
  const isEnd = toT !== null && t === toT;
  const isBetween = fromT !== null && toT !== null && t > fromT && t < toT;
  const isToday = sameDay(cell, today);

  if (!inMonth) {
    return { variant: "outside", selected: isStart || isEnd, inMonth: false, inBetween: false };
  }
  if (isStart || isEnd) {
    return { variant: "default", selected: true, inMonth: true, inBetween: false };
  }
  if (isBetween) {
    return { variant: "default", selected: false, inMonth: true, inBetween: true };
  }
  if (isToday) {
    return { variant: "current", selected: false, inMonth: true, inBetween: false };
  }
  return { variant: "default", selected: false, inMonth: true, inBetween: false };
}

function RangeMonthGrid({
  year,
  month,
  from,
  to,
  today,
  disabled,
  weekStartsOn,
  minDate,
  maxDate,
  onDayClick,
}: {
  year: number;
  month: number;
  from: Date | null;
  to: Date | null;
  today: Date;
  disabled: boolean;
  weekStartsOn: "sunday" | "monday";
  minDate?: Date;
  maxDate?: Date;
  onDayClick: (cell: Date, outside: boolean) => void;
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
              const { variant, selected, inBetween } = rangeDayPresentation(
                cell,
                year,
                month,
                from,
                to,
                today
              );
              const outside = variant === "outside";
              const outOfRange = isDayOutOfRange(cell, minDate, maxDate);
              const dayDisabled = Boolean(disabled) || outOfRange;

              return (
                <CalendarDayButton
                  key={cell.toISOString()}
                  variant={variant}
                  selected={selected}
                  disabled={dayDisabled}
                  tabIndex={outside ? -1 : undefined}
                  className={inBetween ? "bg-accent text-accent-foreground hover:bg-accent focus-visible:bg-muted" : undefined}
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
 * Range date picker with two consecutive months (Figma `Date Picker / Range`, node 247:3751).
 * Uses {@link CalendarSelect}, {@link CalendarArrowButton}, {@link CalendarDayHeader}, {@link CalendarDayButton},
 * and `theme.css` popover / border / shadow tokens (aligned with {@link DatePickerSelect}).
 */
export function DatePickerSelectRange({
  className,
  size = "md",
  weekStartsOn = "sunday",
  locale: _locale = "en-US",
  disabled = false,
  value: valueControlled,
  defaultValue,
  onRangeChange,
  minDate,
  maxDate,
  navigationSelectResetKey = 0,
  onNavigationSelectOpenChange,
}: DatePickerSelectRangeProps) {
  const reactId = useId();
  const emptyRange = useMemo<DateRangeValue>(() => ({ from: null, to: null }), []);
  const initialDefault = defaultValue ?? emptyRange;

  const [uncontrolled, setUncontrolled] = useState<DateRangeValue>(() => ({
    from: initialDefault.from ? startOfDay(initialDefault.from) : null,
    to: initialDefault.to ? startOfDay(initialDefault.to) : null,
  }));

  const isControlled = valueControlled !== undefined;
  const range = isControlled
    ? {
        from: valueControlled?.from ? startOfDay(valueControlled.from) : null,
        to: valueControlled?.to ? startOfDay(valueControlled.to) : null,
      }
    : uncontrolled;

  const setRange = useCallback(
    (next: DateRangeValue) => {
      if (!isControlled) setUncontrolled(next);
      onRangeChange?.(next);
    },
    [isControlled, onRangeChange]
  );

  const today = useMemo(() => startOfDay(new Date()), []);

  const [left, setLeft] = useState(() => {
    const seed = range.from ?? range.to ?? today;
    return { y: seed.getFullYear(), m: seed.getMonth() };
  });

  const fromTime = range.from?.getTime() ?? null;
  const prevFromTime = useRef<number | null>(null);
  useEffect(() => {
    if (fromTime === prevFromTime.current) return;
    prevFromTime.current = fromTime;
    if (range.from) {
      setLeft({ y: range.from.getFullYear(), m: range.from.getMonth() });
    }
  }, [fromTime, range.from]);

  const right = useMemo(() => nextMonth(left.y, left.m), [left.y, left.m]);

  const [openLeftMonth, setOpenLeftMonth] = useState(false);
  const [openLeftYear, setOpenLeftYear] = useState(false);
  const [openRightMonth, setOpenRightMonth] = useState(false);
  const [openRightYear, setOpenRightYear] = useState(false);

  useEffect(() => {
    setOpenLeftMonth(false);
    setOpenLeftYear(false);
    setOpenRightMonth(false);
    setOpenRightYear(false);
  }, [navigationSelectResetKey]);

  const closeSelects = (except: "lm" | "ly" | "rm" | "ry" | null) => {
    if (except !== "lm") setOpenLeftMonth(false);
    if (except !== "ly") setOpenLeftYear(false);
    if (except !== "rm") setOpenRightMonth(false);
    if (except !== "ry") setOpenRightYear(false);
  };

  const monthOptions = MONTH_LABELS.map((label, i) => ({
    value: String(i),
    label,
  }));

  const leftYearOptions = useMemo(() => {
    const ys: { value: string; label: string }[] = [];
    for (let y = left.y - 6; y <= left.y + 6; y++) {
      ys.push({ value: String(y), label: String(y) });
    }
    return ys;
  }, [left.y]);

  const rightYearOptions = useMemo(() => {
    const ys: { value: string; label: string }[] = [];
    for (let y = right.y - 6; y <= right.y + 6; y++) {
      ys.push({ value: String(y), label: String(y) });
    }
    return ys;
  }, [right.y]);

  const pickDay = useCallback(
    (cell: Date, outside: boolean, panel: "left" | "right") => {
      if (isDayOutOfRange(cell, minDate, maxDate)) return;
      if (outside) {
        if (panel === "left") {
          setLeft({ y: cell.getFullYear(), m: cell.getMonth() });
        } else {
          const p = prevMonth(cell.getFullYear(), cell.getMonth());
          setLeft(p);
        }
        return;
      }

      const d = startOfDay(cell);
      const { from, to } = range;

      if (!from || (from && to)) {
        setRange({ from: d, to: null });
        return;
      }

      let start = from;
      let end = d;
      if (end.getTime() < start.getTime()) {
        const tmp = start;
        start = end;
        end = tmp;
      }
      setRange({ from: start, to: end });
    },
    [minDate, maxDate, range, setRange]
  );

  const isMd = size === "md";

  const shell = cx(
    "flex w-max max-w-[calc(100vw-2rem)] border border-border bg-popover p-[var(--spacing-3)]",
    shadowMd,
    isMd
      ? "flex-row flex-wrap items-start justify-center gap-[var(--spacing-4)]"
      : "flex-col items-stretch gap-[var(--spacing-4)]",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const column = "flex min-w-[calc(7*var(--width-w-8,32px))] shrink-0 flex-col gap-[var(--spacing-4)]";

  const navSelectMonthClass = isMd ? "w-fit min-w-max" : "min-w-0 flex-1 basis-0 max-w-[9rem]";
  const navSelectYearClass = isMd ? "w-fit min-w-max" : "min-w-0 flex-1 basis-0 max-w-[6.5rem]";

  const headerRow = "relative flex w-full min-w-0 items-center justify-between gap-[var(--spacing-2)]";

  const headerLeft = (
    <div className={headerRow}>
      <div className="flex shrink-0 items-center">
        <CalendarArrowButton
          variant="previous"
          disabled={disabled}
          aria-label="Previous month"
          onClick={() => setLeft((c) => prevMonth(c.y, c.m))}
        />
      </div>
      <div className="flex min-w-0 items-center gap-[var(--spacing-2)]">
        <CalendarSelect
          id={`${reactId}-left-month`}
          listboxId={`${reactId}-left-month-list`}
          label={MONTH_LABELS[left.m]}
          placeholder=""
          options={monthOptions}
          value={String(left.m)}
          onValueChange={(v) => setLeft((c) => ({ y: c.y, m: Number(v) }))}
          disabled={disabled}
          navTrigger
          minWidthClass={navSelectMonthClass}
          open={openLeftMonth}
          onOpenChange={(o) => {
            closeSelects(o ? "lm" : null);
            setOpenLeftMonth(o);
            onNavigationSelectOpenChange?.("month", "left", o);
          }}
        />
        <CalendarSelect
          id={`${reactId}-left-year`}
          listboxId={`${reactId}-left-year-list`}
          label={String(left.y)}
          placeholder=""
          options={leftYearOptions}
          value={String(left.y)}
          onValueChange={(v) => setLeft((c) => ({ y: Number(v), m: c.m }))}
          disabled={disabled}
          navTrigger
          minWidthClass={navSelectYearClass}
          open={openLeftYear}
          onOpenChange={(o) => {
            closeSelects(o ? "ly" : null);
            setOpenLeftYear(o);
            onNavigationSelectOpenChange?.("year", "left", o);
          }}
        />
      </div>
    </div>
  );

  const headerRight = (
    <div className={headerRow}>
      <div className="flex min-w-0 items-center gap-[var(--spacing-2)]">
        <CalendarSelect
          id={`${reactId}-right-month`}
          listboxId={`${reactId}-right-month-list`}
          label={MONTH_LABELS[right.m]}
          placeholder=""
          options={monthOptions}
          value={String(right.m)}
          onValueChange={(v) => {
            const rm = Number(v);
            setLeft(prevMonth(right.y, rm));
          }}
          disabled={disabled}
          navTrigger
          minWidthClass={navSelectMonthClass}
          open={openRightMonth}
          onOpenChange={(o) => {
            closeSelects(o ? "rm" : null);
            setOpenRightMonth(o);
            onNavigationSelectOpenChange?.("month", "right", o);
          }}
        />
        <CalendarSelect
          id={`${reactId}-right-year`}
          listboxId={`${reactId}-right-year-list`}
          label={String(right.y)}
          placeholder=""
          options={rightYearOptions}
          value={String(right.y)}
          onValueChange={(v) => {
            const ry = Number(v);
            setLeft(prevMonth(ry, right.m));
          }}
          disabled={disabled}
          navTrigger
          minWidthClass={navSelectYearClass}
          open={openRightYear}
          onOpenChange={(o) => {
            closeSelects(o ? "ry" : null);
            setOpenRightYear(o);
            onNavigationSelectOpenChange?.("year", "right", o);
          }}
        />
      </div>
      <div className="flex shrink-0 items-center">
        <CalendarArrowButton
          variant="next"
          disabled={disabled}
          aria-label="Next month"
          onClick={() => setLeft((c) => nextMonth(c.y, c.m))}
        />
      </div>
    </div>
  );

  return (
    <div className={shell}>
      <div className={column}>
        {headerLeft}
        <RangeMonthGrid
          year={left.y}
          month={left.m}
          from={range.from}
          to={range.to}
          today={today}
          disabled={disabled}
          weekStartsOn={weekStartsOn}
          minDate={minDate}
          maxDate={maxDate}
          onDayClick={(cell, outside) => pickDay(cell, outside, "left")}
        />
      </div>
      <div className={column}>
        {headerRight}
        <RangeMonthGrid
          year={right.y}
          month={right.m}
          from={range.from}
          to={range.to}
          today={today}
          disabled={disabled}
          weekStartsOn={weekStartsOn}
          minDate={minDate}
          maxDate={maxDate}
          onDayClick={(cell, outside) => pickDay(cell, outside, "right")}
        />
      </div>
    </div>
  );
}
