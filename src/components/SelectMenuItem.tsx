import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/** Matches Figma `Type`: Simple (text only) vs Icon (leading icon slot). */
export type SelectMenuItemType = "simple" | "icon";

/** Matches Figma `Variant`: Default vs Checkbox (trailing check, Figma node 5197:4029). */
export type SelectMenuItemVariant = "default" | "checkbox";

/**
 * Pin background to Figma hover (`State=Hover`) in Storybook. When omitted, use
 * `hover:` / `focus-visible:` like other list rows.
 */
export type SelectMenuItemState = "default" | "hover";

export type SelectMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  type?: SelectMenuItemType;
  variant?: SelectMenuItemVariant;
  state?: SelectMenuItemState;
  /** Leading icon when `type` is `"icon"`. Defaults to Figma “Icon / Circle”. */
  icon?: ReactNode;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma Icon / Circle (node 5197:735) — 16×16 box. */
function MenuCircleIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

/** Figma Icon / Check — 14×14 in 16×16 (node 5197:4029), aligned with `Checkbox`. */
function MenuCheckIcon({ className }: { className?: string }) {
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

/**
 * Single row for select / dropdown menus (Figma `Select Menu / Item`, node 118:1541).
 * Uses `theme.css` popover text, accent hover surface, spacing tokens, and Bricks body typography.
 */
export const SelectMenuItem = forwardRef<HTMLDivElement, SelectMenuItemProps>(
  function SelectMenuItem(
    {
      type = "simple",
      variant = "default",
      state,
      icon,
      disabled,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const forcedHover = state === "hover";
    const showLeading = type === "icon";

    return (
      <div
        ref={ref}
        data-type={type}
        data-variant={variant}
        data-state={state}
        className={cx(
          "relative flex w-full min-w-0 cursor-default select-none items-center gap-[var(--spacing-2)] py-1.5 pl-[var(--spacing-2)] pr-8 font-body text-sm font-normal leading-5 text-popover-foreground",
          !disabled && !forcedHover && "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
          forcedHover && "bg-accent",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        aria-disabled={disabled ? true : undefined}
        {...rest}
      >
        {showLeading ? (
          <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden text-popover-foreground">
            {icon ?? <MenuCircleIcon className="size-4" />}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate text-left">{children}</span>
        {variant === "checkbox" ? (
          <span
            className="pointer-events-none absolute right-2 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-popover-foreground"
            aria-hidden
          >
            <MenuCheckIcon />
          </span>
        ) : null}
      </div>
    );
  }
);

SelectMenuItem.displayName = "SelectMenuItem";
