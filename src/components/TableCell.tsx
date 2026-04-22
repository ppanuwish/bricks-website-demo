import * as React from "react";
import { twMerge } from "tailwind-merge";

/** Figma: `Size` — fixed row / cell height 52px (default), 72px (md), 96px (lg). */
export type TableCellSize = "default" | "md" | "lg";

/** Figma: State — use in Storybook; live tables use `tr:hover` / `td:hover` as needed. */
export type TableCellState = "default" | "hover";

/**
 * Figma: Variant (content type). The shell is the same; pass matching children
 * (e.g. Badge, Button, Switch) to mirror the design system examples.
 */
export type TableCellContentVariant =
  | "default"
  | "badge"
  | "switch"
  | "avatar"
  | "button"
  | "dropdown"
  | "progress"
  | "image"
  | "input"
  | "toggleGroup";

export type TableCellProps = Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> & {
  /** Figma: `Size` */
  size?: TableCellSize;
  /** Figma: `State` (preview / Storybook). */
  state?: TableCellState;
  /**
   * Figma: `Last Cell` — when true, the cell has no bottom border (last row / footer).
   */
  lastRow?: boolean;
  /** Figma: `Right Text Align` */
  rightTextAlign?: boolean;
  /**
   * Figma: `Bold Text` — primary line is semibold; optional second line uses muted color.
   */
  boldText?: boolean;
  /** Shown when `boldText` is true (Figma: description). */
  description?: React.ReactNode;
  /** Figma: description visibility for the bold two-line cell. @default true */
  showDescription?: boolean;
  /** Figma: optional trailing copy icon. */
  showRightIcon?: boolean;
  contentVariant?: TableCellContentVariant;
  /** Primary line when `children` is not set (Figma: `tableCellText`). */
  text?: React.ReactNode;
  children?: React.ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Fixed **border-box** height on the `td` (Figma: default 52, md 72, lg 96). */
const sizeHeight: Record<TableCellSize, string> = {
  default: "h-[52px]",
  md: "h-[72px]",
  lg: "h-[96px]",
};

/**
 * Figma: horizontal inset stays `spacing-2` (8px) so columns line up. Vertical padding
 * steps with `spacing-2` / `spacing-3` / `spacing-4` from `theme.css` to match the
 * taller default / md / lg row artboards without crushing content.
 */
const sizePadding: Record<TableCellSize, string> = {
  default: "px-[var(--spacing-2,8px)] py-[var(--spacing-2,8px)]",
  md: "px-[var(--spacing-2,8px)] py-[var(--spacing-3,12px)]",
  lg: "px-[var(--spacing-2,8px)] py-[var(--spacing-4,16px)]",
};

/**
 * Set by `Table` `size` so `TableCell` can omit `size` and inherit the table density
 * (Figma: Size = default / md / lg on `Table`).
 */
export const TableSizeContext = React.createContext<TableCellSize | undefined>(undefined);

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  {
    className,
    size: sizeProp,
    state = "default",
    lastRow = false,
    rightTextAlign = false,
    boldText = false,
    description,
    showDescription = true,
    showRightIcon = false,
    contentVariant = "default",
    text = "Table Cell Text",
    children,
    ...rest
  },
  ref
) {
  const tableSize = React.useContext(TableSizeContext);
  const size = sizeProp ?? tableSize ?? "default";
  const hoverBg =
    "hover:bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";
  const forcedHover =
    state === "hover" &&
    "bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";

  const body = (() => {
    if (children != null) {
      return children;
    }
    if (boldText) {
      return (
        <div
          className={cx(
            "flex min-w-0 flex-1 flex-col items-start gap-2 text-left text-sm leading-5",
            rightTextAlign && "items-end text-right",
          )}
        >
          <p className="w-full truncate font-semibold text-foreground">{text}</p>
          {showDescription && (
            <p className="w-full truncate font-normal text-muted-foreground">
              {description ?? "Description Text"}
            </p>
          )}
        </div>
      );
    }
    return (
      <div
        className={cx(
          "flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm leading-5 text-foreground",
          rightTextAlign && "text-right",
        )}
      >
        <p className="truncate">{text}</p>
      </div>
    );
  })();

  return (
    <td
      ref={ref}
      data-content-variant={contentVariant}
      data-size={size}
      data-state={state}
      className={twMerge(
        "box-border min-w-[85px] align-middle text-sm",
        "font-[family-name:var(--font-sans)]",
        sizePadding[size],
        sizeHeight[size],
        !lastRow && "border-b border-border",
        forcedHover,
        !forcedHover && hoverBg,
        className,
      )}
      {...rest}
    >
      <div className="flex h-full min-h-0 w-full items-center gap-[10px]">
        {body}
        {showRightIcon && <CopyIcon className="h-4 w-4 shrink-0 text-foreground" />}
      </div>
    </td>
  );
});

TableCell.displayName = "TableCell";
