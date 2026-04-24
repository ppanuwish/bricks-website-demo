import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "./Checkbox";
import { TableSizeContext, type TableCellSize } from "./TableCell";

/**
 * Figma: `DataTable / Table cell` (266:2929) — `Variant` = Checkbox | Action, `State` = Default | Hover.
 */
export type DatatableTableCellVariant = "checkbox" | "action";

/** Figma: `State` (cell chrome); live tables can rely on `tr:hover` if you omit forced state. */
export type DatatableTableCellState = "default" | "hover";

const sizeHeight: Record<TableCellSize, string> = {
  default: "h-[52px]",
  md: "h-[72px]",
  lg: "h-[96px]",
};

const hoverRowBg =
  "hover:bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";
const forcedHover =
  "bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";

export type DatatableTableCellProps = Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> & {
  /** Figma: `Variant` */
  variant?: DatatableTableCellVariant;
  /** Figma: `State` (for Storybook / forced preview). */
  state?: DatatableTableCellState;
  /**
   * Figma: `Last Cell` — no bottom border (last data row or footer).
   */
  lastRow?: boolean;
  /**
   * Matches `Table` / `TableCell` density (Figma `Size` on `Table`); defaults from
   * {@link TableSizeContext} when inside `Table`, otherwise `default`.
   */
  size?: TableCellSize;
  /**
   * Checkbox `Variant` only — `aria` when there is no visible label (Figma: box only).
   * @default "Select row"
   */
  selectRowLabel?: string;
  /** Pass-through to {@link Checkbox} when `variant` is `checkbox`. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /**
   * `action` `Variant` — when set, overrides the default overflow menu control.
   */
  children?: React.ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const DatatableTableCell = React.forwardRef<HTMLTableCellElement, DatatableTableCellProps>(
  function DatatableTableCell(
    {
      className,
      variant = "checkbox",
      state = "default",
      lastRow = false,
      size: sizeProp,
      selectRowLabel = "Select row",
      checked,
      defaultChecked,
      onCheckedChange,
      children,
      ...rest
    },
    ref
  ) {
    const tableSize = React.useContext(TableSizeContext);
    const size = sizeProp ?? tableSize ?? "default";
    const showForcedHover = state === "hover" ? forcedHover : null;

    return (
      <td
        ref={ref}
        data-variant={variant}
        data-state={state}
        className={twMerge(
          "box-border align-middle",
          "font-[family-name:var(--font-sans)]",
          !lastRow && "border-b border-border",
          sizeHeight[size],
          variant === "checkbox" && "w-[38px] min-w-[38px] max-w-[38px]",
          variant === "action" && "min-w-0",
          showForcedHover,
          !showForcedHover && hoverRowBg,
          className,
        )}
        {...rest}
      >
        {variant === "checkbox" && (
          <div
            className={cx(
              "box-border flex h-full w-[38px] min-w-[38px] max-w-[38px] items-center pl-[var(--spacing-2)]",
              "py-[var(--spacing-2)]",
            )}
          >
            <Checkbox
              checked={checked}
              defaultChecked={defaultChecked}
              onCheckedChange={onCheckedChange}
              showLabel={false}
              showDescription={false}
              label={selectRowLabel}
              className="shrink-0"
            />
          </div>
        )}
        {variant === "action" && (
          <div
            className="flex h-full w-full items-center justify-center p-[var(--spacing-2)]"
            data-align="action"
          >
            {children ?? (
              <button
                type="button"
                className={cx(
                  "inline-flex h-[var(--height-h-8,32px)] w-[var(--width-w-8,32px)] shrink-0",
                  "items-center justify-center rounded-[var(--radius-button-icon,8px)] p-[var(--spacing-2)]",
                  "text-foreground outline-none transition-[background-color,color]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                )}
                aria-label="Open row actions"
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        )}
      </td>
    );
  },
);

DatatableTableCell.displayName = "DatatableTableCell";
