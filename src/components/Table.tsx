import * as React from "react";
import { twMerge } from "tailwind-merge";
import { TableSizeContext, type TableCellSize } from "./TableCell";

const tableShell =
  "w-full min-w-[356px] border-collapse [caption-side:bottom] text-sm text-foreground";

/**
 * Figma: `Size` on node `Table` (501:80592) — `TableCell` fixed height 52 / 72 / 96px;
 * header row stays 40px via `TableHead`.
 */
export type TableSize = TableCellSize;

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  size?: TableSize;
};

export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, size = "default", children, ...rest },
  ref
) {
  return (
    <TableSizeContext.Provider value={size}>
      <table
        ref={ref}
        data-size={size}
        className={twMerge(tableShell, "font-[family-name:var(--font-sans)]", className)}
        {...rest}
      >
        {children}
      </table>
    </TableSizeContext.Provider>
  );
});

Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, ...rest }, ref) {
  return <thead ref={ref} className={twMerge(className)} {...rest} />;
});
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...rest }, ref) {
  return <tbody ref={ref} className={twMerge(className)} {...rest} />;
});
TableBody.displayName = "TableBody";

/** Figma: footer row uses the same muted fill as hover cells. */
const footerRowBg =
  "bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...rest }, ref) {
  return (
    <tfoot
      ref={ref}
      className={twMerge(footerRowBg, "border-b border-border", className)}
      {...rest}
    />
  );
});
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...rest }, ref) {
    return <tr ref={ref} className={twMerge("transition-colors", className)} {...rest} />;
  }
);
TableRow.displayName = "TableRow";

/**
 * Figma: `_TableCaption` — horizontal padding from theme, `text-sm` + `muted-foreground`, centered
 * (node 324:363, `pt-[var(--spacing-4,16px)]` above caption text line).
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, children, ...rest }, ref) {
  return (
    <caption
      ref={ref}
      className={twMerge(
        "mt-0 min-h-9 pt-[var(--spacing-4,16px)] text-center text-sm text-muted-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </caption>
  );
});
TableCaption.displayName = "TableCaption";

export { TableHead } from "./TableHead";
export { TableCell } from "./TableCell";
