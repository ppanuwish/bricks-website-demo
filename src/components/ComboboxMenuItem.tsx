import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Checkbox } from "./Checkbox";

/** Matches Figma `Type` (Combobox / Menu / Item, node 17379:199232). */
export type ComboboxMenuItemType = "simple" | "icon" | "avatar" | "checkbox";

/**
 * Pin background to Figma `State=Hover` in Storybook. When omitted, use
 * `hover:` / `focus-visible:` for interactive rows.
 */
export type ComboboxMenuItemState = "default" | "hover";

export type ComboboxMenuItemProps = HTMLAttributes<HTMLDivElement> & {
  type?: ComboboxMenuItemType;
  state?: ComboboxMenuItemState;
  /** Figma: trailing check (Simple, Icon, Avatar) or `Checkbox` checked. */
  selected?: boolean;
  /** When `type` is `"icon"`, leading mark; Figma `Icon / CirclePlus` (5197:3975) by default. */
  icon?: ReactNode;
  /** When `type` is `"avatar"`, passed to `AvatarImage`. */
  avatarSrc?: string;
  avatarAlt?: string;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / Check` — 14×14 in 16×16 (node 5197:4029). */
function ComboboxItemCheckIcon({ className }: { className?: string }) {
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

/** Figma `Icon / CirclePlus` — 16×16. */
function CirclePlusIcon({ className }: { className?: string }) {
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
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function labelTextClass({ isHover, disabled }: { isHover: boolean; disabled?: boolean }) {
  return cx(
    "min-w-0 flex-1 truncate text-left font-body text-sm font-normal leading-5",
    disabled
      ? "text-popover-foreground"
      : isHover
        ? "text-accent-foreground"
        : "text-popover-foreground group-hover:text-accent-foreground"
  );
}

/**
 * Single option row for combobox lists (Figma `Combobox / Menu / Item`, 17379:199232).
 * Uses `theme.css` spacing, foreground, accent, primary (`Checkbox` checked), and
 * `Avatar` size 5; typography matches `text-sm/leading-5` body.
 */
export const ComboboxMenuItem = forwardRef<HTMLDivElement, ComboboxMenuItemProps>(
  function ComboboxMenuItem(
    {
      type = "simple",
      state,
      selected = false,
      icon,
      avatarSrc,
      avatarAlt = "",
      onCheckedChange,
      disabled,
      className,
      children,
      onClick,
      ...rest
    },
    ref
  ) {
    const forcedHover = state === "hover";
    const isHover = forcedHover;
    const textClass = labelTextClass({ isHover, disabled });

    const showTrailingCheck =
      selected && (type === "simple" || type === "icon" || type === "avatar");
    const checkIconClass = disabled
      ? "text-popover-foreground"
      : isHover
        ? "text-accent-foreground"
        : "text-popover-foreground group-hover:text-accent-foreground";
    const leadIconClass = checkIconClass;

    return (
      <div
        ref={ref}
        data-type={type}
        data-state={state}
        data-selected={selected || undefined}
        role="option"
        aria-disabled={disabled ? true : undefined}
        aria-selected={selected}
        className={cx(
          "group relative flex w-full min-w-0 max-w-[245px] cursor-default select-none items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5",
          !disabled && !forcedHover && "hover:bg-accent focus-visible:outline-none",
          forcedHover && "bg-accent",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={onClick}
        {...rest}
      >
        {type === "checkbox" ? (
          <Checkbox
            label={typeof children === "string" ? children : "Option"}
            checked={selected}
            onCheckedChange={onCheckedChange}
            showLabel={false}
            showDescription={false}
            state={disabled ? "disabled" : "default"}
            className="shrink-0"
            wrapperClassName="contents w-auto"
            disabled={disabled}
            aria-label={typeof children === "string" ? children : undefined}
          />
        ) : null}

        {type === "icon" ? (
          <span
            className={cx("flex size-4 shrink-0 items-center justify-center", leadIconClass)}
          >
            {icon ?? <CirclePlusIcon className="size-4" />}
          </span>
        ) : null}

        {type === "avatar" ? (
          <Avatar size="5" className="shrink-0">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={avatarAlt} /> : null}
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        ) : null}

        <span className={textClass}>{children}</span>

        {showTrailingCheck ? (
          <span
            className="pointer-events-none flex size-4 shrink-0 items-center justify-center"
            aria-hidden
          >
            <ComboboxItemCheckIcon className={checkIconClass} />
          </span>
        ) : null}
      </div>
    );
  }
);

ComboboxMenuItem.displayName = "ComboboxMenuItem";
