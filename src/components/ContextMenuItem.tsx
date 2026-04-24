import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Check, Circle } from "lucide-react";

/** Figma `Context Menu / Item` (419:4521): `Variant` × `State`. */
export type ContextMenuItemVariant = "default" | "checkbox" | "radio";

/**
 * Pin visuals in Storybook. When omitted, rows use `hover:` / `focus-visible:` like other menu rows.
 */
export type ContextMenuItemState = "default" | "hover" | "disabled";

/**
 * Figma `Level`: `1` = short horizontal padding (`px`); `2` = wide left inset (`pl-8`) and, for
 * checkbox/radio, the leading `Check` / `Circle` mark.
 */
export type ContextMenuItemLevel = "1" | "2";

export type ContextMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ContextMenuItemVariant;
  state?: ContextMenuItemState;
  /**
   * `1` — even `px-[var(--spacing-2)]`. `2` — `pl-8 pr-[var(--spacing-2)]`; checkbox/radio show
   * Lucide mark in the leading column (maps to `aria-checked` for those variants).
   */
  level?: ContextMenuItemLevel;
  /** Trailing hint (e.g. Figma `⇧⌘P`). */
  shortcut?: ReactNode;
  /** When `false`, the shortcut slot is hidden for every `variant` (default, checkbox, radio). */
  showShortcut?: boolean;
  /** Hide leading marks for checkbox/radio when false (only applies when `level` is `"2"`). */
  showIndicator?: boolean;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Label + leading icon ink — `popover-foreground` / `accent-foreground` on hover (Figma base tokens). */
function itemInk({ disabled, isHover }: { disabled?: boolean; isHover: boolean }) {
  return cx(
    disabled && "text-popover-foreground",
    !disabled && isHover && "text-accent-foreground",
    !disabled &&
      !isHover &&
      "text-popover-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
  );
}

function labelInk({ disabled, isHover }: { disabled?: boolean; isHover: boolean }) {
  return cx(
    "min-w-0 flex-1 truncate text-left font-body text-sm font-normal leading-5 transition-[color]",
    itemInk({ disabled, isHover })
  );
}

/**
 * Same inset as {@link DropdownMenuItem} leading column — reserves width so label/shortcut never
 * overlap icons (no absolute positioning).
 */
const leadingColumn =
  "pointer-events-none flex h-5 w-8 shrink-0 items-center justify-center transition-[color]";

const iconClass = "size-4 shrink-0";

/**
 * Context menu row (Figma `Context Menu / Item`, 419:4521). `level` controls horizontal padding
 * (`1` short, `2` wide left) and whether checkbox/radio show a leading mark; matches
 * {@link DropdownMenuItem}. Hover uses `accent` / `accent-foreground`; shortcuts use muted text;
 * disabled uses row `opacity-50`. Use `showShortcut` to hide the trailing hint on any variant.
 */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem(
    {
      variant = "default",
      state,
      level = "1",
      shortcut = "⇧⌘P",
      showShortcut = true,
      showIndicator = true,
      disabled: disabledProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const forcedHover = state === "hover";
    const disabled = Boolean(disabledProp) || state === "disabled";
    const pinnedHover = forcedHover && !disabled;
    const isLevel2 = level === "2";

    const showShortcutSlot = showShortcut && shortcut != null;

    const role =
      variant === "checkbox" ? "menuitemcheckbox" : variant === "radio" ? "menuitemradio" : "menuitem";

    const ariaChecked =
      variant === "checkbox" || variant === "radio" ? (isLevel2 ? true : false) : undefined;

    const rowBg = cx(
      !disabled &&
        !forcedHover &&
        "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
      !disabled && forcedHover && "bg-accent"
    );

    const rowPad =
      isLevel2 ? "pl-8 pr-[var(--spacing-2)]" : "px-[var(--spacing-2)]";

    const ink = itemInk({ disabled, isHover: pinnedHover });

    const showCheckboxMark = variant === "checkbox" && showIndicator && isLevel2;
    const showRadioMark = variant === "radio" && showIndicator && isLevel2;

    return (
      <div
        ref={ref}
        data-variant={variant}
        data-state={state}
        data-level={level}
        role={role}
        aria-checked={ariaChecked}
        aria-disabled={disabled ? true : undefined}
        className={cx(
          "group flex w-full min-w-0 max-w-[312px] cursor-default select-none items-center gap-[var(--spacing-2)] py-1.5 font-body transition-[background-color,opacity]",
          rowPad,
          rowBg,
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...rest}
      >
        {showCheckboxMark ? (
          <span className={cx(leadingColumn, ink)} aria-hidden>
            <Check className={iconClass} strokeWidth={2} />
          </span>
        ) : null}

        {showRadioMark ? (
          <span className={cx(leadingColumn, ink)} aria-hidden>
            <Circle className={iconClass} strokeWidth={2} />
          </span>
        ) : null}

        <span className={labelInk({ disabled, isHover: pinnedHover })}>{children}</span>

        {showShortcutSlot ? (
          <span className="shrink-0 whitespace-nowrap font-body text-xs font-normal leading-4 text-muted-foreground opacity-60">
            {shortcut}
          </span>
        ) : null}
      </div>
    );
  }
);

ContextMenuItem.displayName = "ContextMenuItem";
