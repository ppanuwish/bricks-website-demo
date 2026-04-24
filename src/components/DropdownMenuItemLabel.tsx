import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/**
 * `default` — Figma `Level=1` (330:24589).  
 * `inset` — Figma `Level=2` (17398:40526): left inset aligns label text with {@link DropdownMenuItem} `level="2"` rows (`pl-8`).
 */
export type DropdownMenuItemLabelVariant = "default" | "inset";

export type DropdownMenuItemLabelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: DropdownMenuItemLabelVariant;
  children?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Section / group label inside dropdown content (Figma `Dropdown Menu / Item / Label`, 17398:40525).
 * Non-interactive; uses `popover-foreground` and Bricks body **semibold** `text-sm` / `leading-5`.
 */
export const DropdownMenuItemLabel = forwardRef<HTMLDivElement, DropdownMenuItemLabelProps>(
  function DropdownMenuItemLabel({ variant = "default", className, children, ...rest }, ref) {
    const inset = variant === "inset";

    return (
      <div
        ref={ref}
        data-variant={variant}
        className={cx(
          "box-border flex h-8 min-h-8 w-full min-w-0 max-w-[312px] items-center py-1.5 font-body",
          inset ? "pl-8 pr-[var(--spacing-2)]" : "px-[var(--spacing-2)]",
          className
        )}
        {...rest}
      >
        <span className="block w-full truncate font-body text-sm font-semibold leading-5 text-popover-foreground">
          {children}
        </span>
      </div>
    );
  }
);

DropdownMenuItemLabel.displayName = "DropdownMenuItemLabel";
