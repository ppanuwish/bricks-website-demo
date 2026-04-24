import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { DatatableTableCell } from "./DatatableTableCell";
import { DatatableTableHead } from "./DatatableTableHead";
import { Input, type InputProps } from "./Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type TableSize } from "./Table";

/**
 * Figma: `Data Table` (327:695) — toolbar (filter input + outline control) + bordered table
 * (checkbox / data / sortable / right-aligned + actions) + caption row (muted text + prev/next).
 */

export type DatatableProps = {
  className?: string;
  /**
   * Figma: `Size` on `Table` / row density.
   * @default "default"
   */
  size?: TableSize;
  /**
   * Figma: `Filters Wrapper` — optional replace for the full toolbar (Input + end control by default).
   */
  filters?: React.ReactNode;
  /**
   * Merged into the default search {@link Input} (when `filters` is not set and `showFilterInput` is true).
   */
  inputProps?: Partial<InputProps>;
  /**
   * Figma: filter row; left `Input` when not using a custom `filters` slot.
   * @default true
   */
  showFilterInput?: boolean;
  /**
   * Figma: outline "Dropdown" control on the right when not using a custom `filters` slot.
   * @default true
   */
  showFilterAction?: boolean;
  /**
   * Figma: `Dropdown` trigger + icon when `showFilterAction` and no `filters` slot.
   * @default "Dropdown"
   */
  filterActionLabel?: React.ReactNode;
  /**
   * Replaces the `filterAction` button when the default filter row is used.
   */
  filterActionSlot?: React.ReactNode;
  /**
   * Figma: `Columns` block — when set, replaces the built-in example table; supply your own {@link Table} and rows.
   */
  table?: React.ReactNode;
  /**
   * Built-in demo: number of body rows (Figma: 5) when `table` is not provided.
   * @default 5
   */
  rowCount?: number;
  /**
   * Figma: `Columns` fixed scroll height in px. Use `0` to disable the cap.
   * @default 372
   */
  maxTableHeight?: number;
  /**
   * Figma: `_TableCaption` — optional replace; caption text + previous/next.
   */
  caption?: React.ReactNode;
  /**
   * Muted “Caption text” (when `caption` is not set).
   * @default "Caption text"
   */
  captionText?: string;
  /**
   * Figma: caption + pagination; hide when you render a custom `caption` or do not need a footer.
   * @default true
   */
  showCaptionBar?: boolean;
  /** Pagination — outline buttons (Figma: disabled/opacity for stub). */
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  previousPageDisabled?: boolean;
  nextPageDisabled?: boolean;
  previousPageLabel?: string;
  nextPageLabel?: string;
};

const DEFAULT_ROW_COUNT = 5;

/** Figma: visual gap (spacing-4) after header; matches column count in {@link FigmaDataTableTable}. */
const DEFAULT_TABLE_COL_COUNT = 5;

const shellScroll = (maxH: number) =>
  maxH > 0 ? { maxHeight: maxH, overflow: "auto" } as const : { overflow: "auto" } as const;

function DefaultFilterRow({
  showFilterInput,
  showFilterAction,
  inputProps,
  filterActionLabel,
  filterActionSlot,
}: {
  showFilterInput: boolean;
  showFilterAction: boolean;
  inputProps: Partial<InputProps> | undefined;
  filterActionLabel: React.ReactNode;
  filterActionSlot: React.ReactNode | undefined;
}) {
  return (
    <div
      className="flex w-full min-w-0 items-center justify-between gap-[var(--spacing-2)] py-[var(--spacing-4)]"
      data-slot="datatable-filters"
    >
      {showFilterInput ? (
        <div className="min-w-0 max-w-[384px] flex-1">
          <Input
            showLabel={false}
            showDescription={false}
            placeholder="Placeholder"
            horizontalLayout="no"
            className="h-9 w-full"
            wrapperClassName="relative flex w-full min-w-0 max-w-[384px] flex-col items-start gap-[var(--spacing-2)]"
            {...inputProps}
          />
        </div>
      ) : (
        <div className="min-w-0 flex-1" />
      )}
      {showFilterAction
        ? (filterActionSlot ?? (
            <Button
              type="button"
              variant="outline"
              theme="c-law"
              size="default"
              showRightIcon
            >
              {filterActionLabel}
            </Button>
          ))
        : null}
    </div>
  );
}

function FigmaDataTableTable({
  size = "default" as const,
  rowCount = DEFAULT_ROW_COUNT,
}: {
  size: TableSize;
  rowCount: number;
}) {
  const lastIndex = rowCount - 1;

  return (
    <Table size={size}>
      <TableHeader>
        <TableRow>
          <DatatableTableHead variant="checkbox" selectAllLabel="Select all" />
          <TableHead text="Head Text" />
          <DatatableTableHead variant="button" text="Button" showSortIcon />
          <TableHead text="Head Text" rightTextAlign />
          <DatatableTableHead variant="action" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          aria-hidden
          className="pointer-events-none"
          data-slot="datatable-head-body-gap"
        >
          <td
            colSpan={DEFAULT_TABLE_COL_COUNT}
            className="h-[var(--spacing-4)] min-h-0 border-0 bg-transparent p-0"
          />
        </TableRow>
        {Array.from({ length: rowCount }, (_, r) => (
          <TableRow key={r}>
            <DatatableTableCell
              variant="checkbox"
              selectRowLabel="Select row"
              lastRow={r === lastIndex}
            />
            <TableCell text="Table Cell Text" lastRow={r === lastIndex} />
            <TableCell
              text="Table Cell Text"
              lastRow={r === lastIndex}
              className="text-center [&>div]:justify-center [&_p]:text-center"
            />
            <TableCell
              text="Table Cell Text"
              rightTextAlign
              lastRow={r === lastIndex}
            />
            <DatatableTableCell
              variant="action"
              lastRow={r === lastIndex}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DefaultCaptionRow({
  captionText,
  onPreviousPage,
  onNextPage,
  previousPageDisabled,
  nextPageDisabled,
  previousPageLabel = "Previous",
  nextPageLabel = "Next",
}: {
  captionText: string;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  previousPageDisabled?: boolean;
  nextPageDisabled?: boolean;
  previousPageLabel: string;
  nextPageLabel: string;
}) {
  const isPrevDisabled =
    previousPageDisabled !== undefined ? previousPageDisabled : !onPreviousPage;
  const isNextDisabled = nextPageDisabled !== undefined ? nextPageDisabled : !onNextPage;

  return (
    <div
      className="flex w-full min-w-0 items-center justify-between gap-[var(--spacing-2)] py-[var(--spacing-4)]"
      data-slot="datatable-caption"
    >
      <p className="min-w-0 flex-1 truncate text-sm font-normal leading-5 text-muted-foreground">
        {captionText}
      </p>
      <div
        className="flex shrink-0 flex-wrap items-center justify-end gap-[var(--spacing-2)]"
        data-slot="datatable-caption-actions"
      >
        <Button
          type="button"
          variant="outline"
          theme="c-law"
          size="default"
          onClick={onPreviousPage}
          disabled={isPrevDisabled}
        >
          {previousPageLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          theme="c-law"
          size="default"
          onClick={onNextPage}
          disabled={isNextDisabled}
        >
          {nextPageLabel}
        </Button>
      </div>
    </div>
  );
}

export function Datatable({
  className,
  size = "default",
  filters,
  inputProps,
  showFilterInput = true,
  showFilterAction = true,
  filterActionLabel = "Dropdown",
  filterActionSlot,
  table: tableNode,
  rowCount = DEFAULT_ROW_COUNT,
  maxTableHeight = 372,
  caption: captionNode,
  captionText = "Caption text",
  showCaptionBar = true,
  onPreviousPage,
  onNextPage,
  previousPageDisabled,
  nextPageDisabled,
  previousPageLabel = "Previous",
  nextPageLabel = "Next",
}: DatatableProps) {
  const tableWrapperStyle = React.useMemo(() => shellScroll(maxTableHeight), [maxTableHeight]);

  return (
    <div
      className={twMerge(
        "flex w-full min-w-0 flex-col items-stretch gap-[var(--spacing-4)] text-sm text-foreground",
        "font-[family-name:var(--font-sans)]",
        className,
      )}
      data-component="datatable"
    >
      {filters ?? (
        <DefaultFilterRow
          showFilterInput={showFilterInput}
          showFilterAction={showFilterAction}
          inputProps={inputProps}
          filterActionLabel={filterActionLabel}
          filterActionSlot={filterActionSlot}
        />
      )}

      <div
        className="w-full min-w-0 border border-border"
        data-slot="datatable-table-wrap"
        style={tableWrapperStyle}
      >
        {tableNode ?? <FigmaDataTableTable size={size} rowCount={rowCount} />}
      </div>

      {showCaptionBar
        ? (captionNode ?? (
            <DefaultCaptionRow
              captionText={captionText}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              previousPageDisabled={previousPageDisabled}
              nextPageDisabled={nextPageDisabled}
              previousPageLabel={previousPageLabel}
              nextPageLabel={nextPageLabel}
            />
          ))
        : null}
    </div>
  );
}

Datatable.displayName = "Datatable";
