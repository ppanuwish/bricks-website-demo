import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Pin visuals in Storybook. When omitted, use `hover:` / `focus-visible:` like other menu rows.
 */
export type DropdownMenuItemSubTriggerState = "default" | "hover" | "disabled";

export type DropdownMenuItemSubTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  state?: DropdownMenuItemSubTriggerState;
  children?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / ChevronRight` — 16×16 (5197:4021). */
function SubTriggerChevronIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function rowInk({
  disabled,
  pinnedHover,
}: {
  disabled?: boolean;
  pinnedHover: boolean;
}) {
  return cx(
    disabled && "text-popover-foreground",
    !disabled &&
      pinnedHover &&
      "text-accent-foreground",
    !disabled &&
      !pinnedHover &&
      "text-popover-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground"
  );
}

/**
 * Opens a nested submenu (Figma `_Dropdown Menu / SubTrigger`, 330:24002).
 * Typography and spacing align with {@link DropdownMenuItem}; hover uses `accent` / `accent-foreground`.
 */
export const DropdownMenuItemSubTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemSubTriggerProps
>(function DropdownMenuItemSubTrigger(
  { state, disabled: disabledProp, className, children, type = "button", ...rest },
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

  const ink = rowInk({ disabled, pinnedHover });

  return (
    <button
      ref={ref}
      type={type}
      data-state={state}
      disabled={disabled}
      aria-disabled={disabled ? true : undefined}
      className={cx(
        "group flex w-full min-w-0 max-w-[312px] cursor-default select-none items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5 text-left font-body transition-[background-color,color,opacity]",
        rowBg,
        ink,
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className
      )}
      {...rest}
    >
      <span className="min-w-0 flex-1 truncate font-body text-sm font-normal leading-5">{children}</span>
      <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden>
        <SubTriggerChevronIcon className="size-4" />
      </span>
    </button>
  );
});

DropdownMenuItemSubTrigger.displayName = "DropdownMenuItemSubTrigger";
