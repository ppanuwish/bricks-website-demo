import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import type { ContextMenuItemLevel } from "./ContextMenuItem";

/**
 * Pin visuals in Storybook. When omitted, use `hover:` / `focus-visible:` like other menu rows.
 */
export type ContextMenuItemSubTriggerState = "default" | "hover" | "disabled";

export type ContextMenuItemSubTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  state?: ContextMenuItemSubTriggerState;
  /**
   * `1` — `px-[var(--spacing-2)]` (short row; aligns with {@link ContextMenuItem} `level="1"`).
   * `2` — `pl-8 pr-[var(--spacing-2)]` (Figma `Level=2` inset, 419:4534; aligns with {@link ContextMenuItem} `level="2"`).
   */
  level?: ContextMenuItemLevel;
  children?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function rowInk({ disabled, pinnedHover }: { disabled?: boolean; pinnedHover: boolean }) {
  return cx(
    disabled && "text-popover-foreground",
    !disabled && pinnedHover && "text-accent-foreground",
    !disabled &&
      !pinnedHover &&
      "text-popover-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
  );
}

/**
 * Opens a nested submenu (Figma `_ContextMenu / Item / SubTrigger`, 419:4534). Typography and
 * spacing align with {@link ContextMenuItem}; trailing **Icon / ChevronRight** (5197:4021) via
 * `ChevronRight` from `lucide-react`. Default `level` is `"2"` to match Figma inset; hover uses
 * `accent` / `accent-foreground`.
 */
export const ContextMenuItemSubTrigger = forwardRef<
  HTMLButtonElement,
  ContextMenuItemSubTriggerProps
>(function ContextMenuItemSubTrigger(
  {
    state,
    level = "2",
    disabled: disabledProp,
    className,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  const forcedHover = state === "hover";
  const disabled = Boolean(disabledProp) || state === "disabled";
  const pinnedHover = forcedHover && !disabled;

  const rowBg = cx(
    !disabled &&
      !forcedHover &&
      "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
    !disabled && forcedHover && "bg-accent"
  );

  const rowPad =
    level === "2" ? "pl-8 pr-[var(--spacing-2)]" : "px-[var(--spacing-2)]";

  const ink = rowInk({ disabled, pinnedHover });

  return (
    <button
      ref={ref}
      type={type}
      data-state={state}
      data-level={level}
      disabled={disabled}
      aria-disabled={disabled ? true : undefined}
      aria-haspopup="menu"
      className={cx(
        "group flex w-full min-w-0 max-w-[312px] cursor-default select-none items-center gap-[var(--spacing-2)] py-1.5 text-left font-body transition-[background-color,color,opacity]",
        rowPad,
        rowBg,
        ink,
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className
      )}
      {...rest}
    >
      <span className="min-w-0 flex-1 truncate font-body text-sm font-normal leading-5">{children}</span>
      <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden>
        <ChevronRight className="size-4 shrink-0" strokeWidth={2} />
      </span>
    </button>
  );
});

ContextMenuItemSubTrigger.displayName = "ContextMenuItemSubTrigger";
