import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Check, Circle } from "lucide-react";

/** Figma `Dropdown Menu / Item` (330:8549): `Variant` × `State`. */
export type DropdownMenuItemVariant = "default" | "checkbox" | "radio" | "icon";

/**
 * Pin visuals in Storybook. When omitted, interactive rows use `hover:` /
 * `focus-visible:` like other menu rows.
 */
export type DropdownMenuItemState = "default" | "hover" | "disabled" | "error";

/**
 * Figma `Level`: `1` = short horizontal padding (`px`); `2` = wide left inset (`pl-8`) and, for
 * checkbox/radio, the leading `Check` / `Circle` mark.
 */
export type DropdownMenuItemLevel = "1" | "2";

export type DropdownMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  variant?: DropdownMenuItemVariant;
  state?: DropdownMenuItemState;
  /**
   * `1` — even `px-[var(--spacing-2)]`. `2` — `pl-8 pr-[var(--spacing-2)]`; checkbox/radio show
   * Lucide mark in the leading column (maps to `aria-checked` for those variants).
   */
  level?: DropdownMenuItemLevel;
  /** Leading icon when `variant` is `"icon"`; Figma `Icon / User` (5197:3037) by default. */
  icon?: ReactNode;
  /** Trailing hint (e.g. Figma `⇧⌘P`). */
  shortcut?: ReactNode;
  /** When `false`, the shortcut slot is hidden for every `variant` (default, checkbox, radio, icon). */
  showShortcut?: boolean;
  /** Hide leading marks for checkbox/radio/icon when false (checkbox/radio marks only when `level` is `"2"`). */
  showIndicator?: boolean;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / User` — 16×16 (5197:3037). */
function DropdownMenuUserIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function labelInk({
  variant,
  state,
  disabled,
  isHover,
}: {
  variant: DropdownMenuItemVariant;
  state?: DropdownMenuItemState;
  disabled?: boolean;
  isHover: boolean;
}) {
  const err = variant === "icon" && state === "error";
  return cx(
    "min-w-0 flex-1 truncate text-left font-body text-sm font-normal leading-5 transition-[color]",
    disabled && "text-popover-foreground",
    !disabled &&
      err &&
      "text-destructive group-hover:text-destructive focus-visible:text-destructive",
    !disabled &&
      !err &&
      isHover &&
      "text-accent-foreground",
    !disabled &&
      !err &&
      !isHover &&
      "text-popover-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
  );
}

function leadingInk({
  variant,
  state,
  disabled,
  isHover,
}: {
  variant: DropdownMenuItemVariant;
  state?: DropdownMenuItemState;
  disabled?: boolean;
  isHover: boolean;
}) {
  const err = variant === "icon" && state === "error";
  return cx(
    "flex shrink-0 items-center justify-center text-current transition-[color]",
    disabled && "text-popover-foreground",
    !disabled && err && "text-destructive",
    !disabled &&
      !err &&
      isHover &&
      "text-accent-foreground",
    !disabled &&
      !err &&
      !isHover &&
      "text-popover-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
  );
}

const iconClass = "size-4 shrink-0";

/**
 * Dropdown menu row (Figma `Dropdown Menu / Item`, 330:8549). `level` controls horizontal padding
 * (`1` short, `2` wide left) and whether checkbox/radio show a leading mark; matches
 * {@link ContextMenuItem}. Padding uses `theme.css` spacing; hover uses `accent` / `accent-foreground`;
 * shortcut uses muted text at 60% opacity; destructive/error uses `destructive`. Use `showShortcut`
 * to hide the trailing hint on any variant.
 */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
    {
      variant = "default",
      state,
      level = "1",
      icon,
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
    /** Pinned Storybook hover (`State=Hover`) — matches Figma accent label. */
    const pinnedHover = forcedHover && !disabled;
    const isLevel2 = level === "2";

    const showShortcutSlot = showShortcut && shortcut != null;

    const role =
      variant === "checkbox"
        ? "menuitemcheckbox"
        : variant === "radio"
          ? "menuitemradio"
          : "menuitem";

    const ariaChecked =
      variant === "checkbox" || variant === "radio"
        ? isLevel2
          ? true
          : false
        : undefined;

    const rowBg = cx(
      !disabled &&
        !forcedHover &&
        "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
      !disabled && forcedHover && "bg-accent"
    );

    const rowPad =
      isLevel2 ? "pl-8 pr-[var(--spacing-2)]" : "px-[var(--spacing-2)]";

    /** In-flow `w-8` — height matches `leading-5` so 16px glyphs align with label text. */
    const leadingColumnGlyph =
      "pointer-events-none flex h-5 w-8 shrink-0 items-center justify-center";

    const leadingColumnIcon = "flex h-5 w-8 shrink-0 items-center justify-center";

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
          <span
            className={cx(
              leadingColumnGlyph,
              leadingInk({ variant, state, disabled, isHover: pinnedHover })
            )}
            aria-hidden
          >
            <Check className={iconClass} strokeWidth={2} />
          </span>
        ) : null}

        {showRadioMark ? (
          <span
            className={cx(
              leadingColumnGlyph,
              leadingInk({ variant, state, disabled, isHover: pinnedHover })
            )}
            aria-hidden
          >
            <Circle className={iconClass} strokeWidth={2} />
          </span>
        ) : null}

        {variant === "icon" && showIndicator ? (
          <span
            className={cx(
              leadingColumnIcon,
              leadingInk({ variant, state, disabled, isHover: pinnedHover })
            )}
            aria-hidden
          >
            {icon ?? <DropdownMenuUserIcon className={iconClass} />}
          </span>
        ) : null}

        <span className={labelInk({ variant, state, disabled, isHover: pinnedHover })}>
          {children}
        </span>

        {showShortcutSlot ? (
          <span className="shrink-0 whitespace-nowrap font-body text-xs font-normal leading-4 text-muted-foreground opacity-60">
            {shortcut}
          </span>
        ) : null}
      </div>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";
