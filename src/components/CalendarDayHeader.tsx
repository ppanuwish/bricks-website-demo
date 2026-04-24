import type { ComponentPropsWithoutRef } from "react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Single weekday column label for calendar grids.
 * Figma: `Calendar / Day Header` (node 222:5174) — 32×21px, `text-xs` / `leading-4`, `muted-foreground`, `--width-w-8` from `theme.css`.
 */
const calendarDayHeaderRoot =
  "flex h-[21px] w-[var(--width-w-8,32px)] shrink-0 items-center justify-center font-body text-xs font-normal leading-4 text-muted-foreground";

export type CalendarDayHeaderProps = ComponentPropsWithoutRef<"div">;

export function CalendarDayHeader({
  className,
  children = "Su",
  ...props
}: CalendarDayHeaderProps) {
  return (
    <div className={cx(calendarDayHeaderRoot, className)} {...props}>
      {children}
    </div>
  );
}
