import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";

/**
 * Figma: `DataTable / Table head` (267:2755) — `Variant` = Checkbox | Action | Button, `State` = Default | Hover.
 */
export type DatatableTableHeadVariant = "checkbox" | "action" | "button";

/** Figma: `State` (header chrome; Storybook / forced preview). */
export type DatatableTableHeadState = "default" | "hover";

const hoverRowBg =
  "hover:bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";
const forcedHover =
  "bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type DatatableTableHeadProps = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align" | "scope"> & {
  /** Figma: `Variant` */
  variant?: DatatableTableHeadVariant;
  state?: DatatableTableHeadState;
  /** @default "col" */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  /**
   * `checkbox` `Variant` — `aria` / internal label (no visible text in Figma).
   * @default "Select all"
   */
  selectAllLabel?: string;
  /** Pass-through to {@link Checkbox} when `variant` is `checkbox`. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /**
   * `button` `Variant` — column title when not using `children` (Figma: `Button` + trailing icon).
   * @default "Button"
   */
  text?: React.ReactNode;
  /**
   * `button` `Variant` — Figma: ghost column header; uses {@link Button} with `theme="c-law"`.
   */
  showSortIcon?: boolean;
  /**
   * `action` `Variant` — screen reader name for the empty control column.
   * @default "Actions"
   */
  actionLabel?: string;
  /**
   * `button` `Variant` — replaces the default sort trigger (entire cell body).
   */
  children?: React.ReactNode;
};

export const DatatableTableHead = React.forwardRef<HTMLTableCellElement, DatatableTableHeadProps>(
  function DatatableTableHead(
    {
      className,
      variant = "checkbox",
      state = "default",
      scope = "col",
      selectAllLabel = "Select all",
      checked,
      defaultChecked,
      onCheckedChange,
      text = "Button",
      showSortIcon = true,
      actionLabel = "Actions",
      children,
      ...rest
    },
    ref
  ) {
    const showForcedHover = state === "hover" ? forcedHover : null;
    const buttonState = state === "hover" ? "hover" : "default";

    return (
      <th
        ref={ref}
        scope={scope}
        data-variant={variant}
        data-state={state}
        className={twMerge(
          "box-border h-10 min-h-10 max-h-10 text-left align-middle",
          "border-b border-border",
          "font-[family-name:var(--font-sans)]",
          variant === "checkbox" && "w-[38px] min-w-[38px] max-w-[38px] pl-[var(--spacing-2)]",
          variant === "action" && "w-[64px] min-w-[64px] max-w-[64px]",
          variant === "button" && "px-[var(--spacing-2)]",
          showForcedHover,
          !showForcedHover && hoverRowBg,
          className,
        )}
        {...rest}
      >
        {variant === "checkbox" && (
          <div className="flex h-full w-full min-w-0 items-center">
            <Checkbox
              checked={checked}
              defaultChecked={defaultChecked}
              onCheckedChange={onCheckedChange}
              showLabel={false}
              showDescription={false}
              label={selectAllLabel}
              className="shrink-0"
            />
          </div>
        )}
        {variant === "action" && <span className="sr-only">{actionLabel}</span>}
        {variant === "button" && (
          <div className="flex h-full w-full min-w-0 items-center">
            {children ?? (
              <Button
                type="button"
                variant="ghost"
                theme="c-law"
                size="default"
                showRightIcon={showSortIcon}
                state={buttonState}
                className={cx(
                  "h-9 min-h-9 shadow-none",
                  "text-muted-foreground hover:text-accent-foreground",
                )}
              >
                {text}
              </Button>
            )}
          </div>
        )}
      </th>
    );
  },
);

DatatableTableHead.displayName = "DatatableTableHead";
