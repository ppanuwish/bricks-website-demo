import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { CheckboxIndicator } from "./Checkbox";
import { RadioIndicator } from "./RadioGroup";

/** Figma `Dropdown Menu / Item` (330:8549): `Variant` × `State`. */
export type DropdownMenuItemVariant = "default" | "checkbox" | "radio" | "icon";

/**
 * Pin visuals in Storybook. When omitted, interactive rows use `hover:` /
 * `focus-visible:` like other menu rows.
 */
export type DropdownMenuItemState = "default" | "hover" | "disabled" | "error";

export type DropdownMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  variant?: DropdownMenuItemVariant;
  state?: DropdownMenuItemState;
  /** Leading icon when `variant` is `"icon"`; Figma `Icon / User` (5197:3037) by default. */
  icon?: ReactNode;
  /** Trailing hint (e.g. Figma `⇧⌘P`); only rendered when `variant` is `"default"`. */
  shortcut?: ReactNode;
  showShortcut?: boolean;
  /**
   * Checkbox: `false` = empty box (unchecked), `true` = filled + tick via {@link CheckboxIndicator}.
   * Radio: `false` = ring only, `true` = selected dot via {@link RadioIndicator}.
   */
  checked?: boolean;
  /** Hide leading marks for checkbox/radio/icon when false. */
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
    "pointer-events-none flex shrink-0 items-center justify-center text-current transition-[color]",
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

/** Aligns with {@link CheckboxIndicator} / {@link RadioIndicator} `state` when the row is disabled. */
function toIndicatorState(disabled: boolean): "default" | "disabled" {
  return disabled ? "disabled" : "default";
}

/**
 * Dropdown menu row (Figma `Dropdown Menu / Item`, 330:8549). Padding uses `theme.css`
 * spacing; hover uses `accent` / `accent-foreground`; shortcut uses muted text at 60% opacity;
 * destructive/error uses `destructive`. Checkbox/radio indicators match {@link CheckboxIndicator}
 * and {@link RadioIndicator}.
 */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
    {
      variant = "default",
      state,
      icon,
      shortcut = "⇧⌘P",
      showShortcut = true,
      checked = false,
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

    const showShortcutSlot = variant === "default" && showShortcut && shortcut != null;

    const role =
      variant === "checkbox"
        ? "menuitemcheckbox"
        : variant === "radio"
          ? "menuitemradio"
          : "menuitem";

    const ariaChecked =
      variant === "checkbox" || variant === "radio"
        ? checked
          ? true
          : false
        : undefined;

    const rowBg = cx(
      !disabled &&
        !forcedHover &&
        "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
      !disabled && forcedHover && "bg-accent"
    );

    /** Figma inset (`w-8`). Height matches `leading-5` so the 16px controls sit on the same vertical band as the label text. */
    const leadingColumn = "flex h-5 w-8 shrink-0 items-center justify-center";

    return (
      <div
        ref={ref}
        data-variant={variant}
        data-state={state}
        data-checked={checked || undefined}
        role={role}
        aria-checked={ariaChecked}
        aria-disabled={disabled ? true : undefined}
        className={cx(
          "group flex w-full min-w-0 max-w-[312px] cursor-default select-none items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5 font-body transition-[background-color,opacity]",
          rowBg,
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...rest}
      >
        {variant === "checkbox" && showIndicator ? (
          <span className={leadingColumn}>
            <CheckboxIndicator
              presentationOnly
              checked={checked}
              disabled={disabled}
              state={toIndicatorState(disabled)}
              className="shrink-0"
            />
          </span>
        ) : null}

        {variant === "radio" && showIndicator ? (
          <span className={cx(leadingColumn, "pointer-events-none")}>
            <RadioIndicator
              selected={checked}
              disabled={disabled}
              state={toIndicatorState(disabled)}
              focused={false}
              className="shrink-0"
            />
          </span>
        ) : null}

        {variant === "icon" && showIndicator ? (
          <span
            className={cx(
              leadingColumn,
              leadingInk({ variant, state, disabled, isHover: pinnedHover })
            )}
            aria-hidden
          >
            {icon ?? <DropdownMenuUserIcon className="size-4 shrink-0" />}
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
