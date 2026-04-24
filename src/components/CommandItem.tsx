import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/** Figma `Command / Item / Default` (345:8657): `Variant=Default` vs `Variant=Icon`. */
export type CommandItemVariant = "default" | "icon";

/**
 * Pin Figma `State` in Storybook. When omitted, row uses `hover:` / `focus-visible:`
 * for accent surface like other menu rows.
 */
export type CommandItemState = "default" | "hover" | "disabled";

export type CommandItemProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CommandItemVariant;
  state?: CommandItemState;
  /** `Variant=Default` + `Selected=Yes`: trailing `Icon / Check` (5197:4029). */
  selected?: boolean;
  /** Leading mark when `variant` is `"icon"`; Figma `Icon / CircleHelp` (5197:3983) by default. */
  icon?: ReactNode;
  /** Trailing hint (e.g. Figma `⌘P`); shown when `showShortcut` is true for any `variant`. */
  shortcut?: ReactNode;
  /** When false, the shortcut slot is omitted (any `variant`). */
  showShortcut?: boolean;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / Check` — 14×14 in 16×16 (5197:4029), same as `ComboboxMenuItem`. */
function CommandItemCheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={cx("size-[14px]", className)}>
      <path
        d="m3.5 8 3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma `Icon / CircleHelp` (5197:3983) — 16×16. */
function CircleHelpIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function inkClass({
  isHover,
  disabled,
}: {
  isHover: boolean;
  disabled?: boolean;
}) {
  return cx(
    !disabled && isHover && "text-accent-foreground",
    !disabled &&
      !isHover &&
      "text-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground",
    disabled && "text-foreground"
  );
}

/**
 * Command palette row (Figma `Command / Item / Default`, 345:8657). Padding `px`/`py`
 * use `theme.css` spacing; hover uses `accent` / `accent-foreground`; check matches
 * `ComboboxMenuItem` / `SelectMenuItem`.
 */
export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandItem(
    {
      variant = "default",
      state,
      selected = false,
      icon,
      shortcut = "⌘P",
      showShortcut = false,
      disabled: disabledProp,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const forcedHover = state === "hover";
    const disabled = Boolean(disabledProp) || state === "disabled";
    const isHover = forcedHover;
    const ink = inkClass({ isHover, disabled });
    const showTrailingCheck = variant === "default" && selected;
    const showLeadingIcon = variant === "icon";

    return (
      <div
        ref={ref}
        data-variant={variant}
        data-state={state}
        data-selected={selected || undefined}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled ? true : undefined}
        className={cx(
          "group flex w-full min-w-0 max-w-[312px] cursor-default select-none items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-[var(--spacing-3)] font-body text-sm font-normal leading-5 transition-[background-color,color,opacity]",
          !disabled && !forcedHover && "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
          forcedHover && "bg-accent",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...rest}
      >
        {showLeadingIcon ? (
          <span className={cx("flex size-4 shrink-0 items-center justify-center overflow-hidden", ink)}>
            {icon ?? <CircleHelpIcon className="size-4" />}
          </span>
        ) : null}

        <span className={cx("min-w-0 flex-1 truncate text-left", ink)}>{children}</span>

        {showShortcut ? (
          <span className="shrink-0 whitespace-nowrap font-body text-xs font-normal leading-4 text-muted-foreground">
            {shortcut}
          </span>
        ) : null}

        {showTrailingCheck ? (
          <span
            className={cx(
              "pointer-events-none flex size-4 shrink-0 items-center justify-center",
              ink
            )}
            aria-hidden
          >
            <CommandItemCheckIcon />
          </span>
        ) : null}
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";
