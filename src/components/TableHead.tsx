import * as React from "react";
import { twMerge } from "tailwind-merge";

/** Figma: `State` — use in Storybook; live UI can rely on `hover:` / row hover. */
export type TableHeadState = "default" | "hover";

export type TableHeadProps = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align" | "scope"> & {
  /**
   * Figma: `Right Text Align` — when true, label is right-aligned.
   * @default false
   */
  rightTextAlign?: boolean;
  /**
   * Figma: `showText` — when false, the cell keeps size/border for icon-only or custom layouts.
   * @default true
   */
  showText?: boolean;
  /** Figma: `State` (preview / Storybook). */
  state?: TableHeadState;
  /** Figma: `headText` / default label when `children` is not set. @default "Head Text" */
  text?: React.ReactNode;
  /** @default "col" */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  children?: React.ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  {
    className,
    rightTextAlign = false,
    showText = true,
    state = "default",
    text = "Head Text",
    scope = "col",
    children,
    ...rest
  },
  ref
) {
  const hoverBg =
    "hover:bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";
  const forcedHover =
    state === "hover" &&
    "bg-[color-mix(in_srgb,var(--color-muted)_100%,var(--color-background)_50%)]";

  const label = (() => {
    if (children != null) {
      return children;
    }
    if (!showText) {
      return null;
    }
    return (
      <p
        className={cx(
          "min-w-0 max-w-full truncate text-sm font-semibold leading-5 text-muted-foreground",
          rightTextAlign && "w-full text-right",
        )}
      >
        {text}
      </p>
    );
  })();

  return (
    <th
      ref={ref}
      scope={scope}
      data-state={state}
      className={twMerge(
        "box-border h-10 min-w-[85px] px-[var(--spacing-2,8px)] text-left align-middle",
        "border-b border-border",
        "font-[family-name:var(--font-sans)]",
        "font-semibold",
        forcedHover,
        !forcedHover && hoverBg,
        className,
      )}
      {...rest}
    >
      <div
        className={cx(
          "flex h-full min-h-0 w-full min-w-0 items-center",
          !rightTextAlign && "justify-start",
          rightTextAlign && "justify-end",
        )}
      >
        {label}
      </div>
    </th>
  );
});

TableHead.displayName = "TableHead";
