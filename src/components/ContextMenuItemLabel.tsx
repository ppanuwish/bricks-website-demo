import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type ContextMenuItemLabelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Section title inside context menu content (Figma `ContextMenu / Item / Title`, 419:4517). Place
 * inside {@link ContextMenu} with other rows.
 * Non-interactive. Outer `px-[var(--spacing-1)]` and inner `pl-8 pr-[var(--spacing-2)] py-1.5` match
 * the kit; title text lines up with {@link ContextMenuItem} rows that use `level="2"`. Typography
 * aligns with {@link DropdownMenuItemLabel} (Bricks body **semibold** `text-sm` / `leading-5`,
 * `text-popover-foreground`).
 */
export const ContextMenuItemLabel = forwardRef<HTMLDivElement, ContextMenuItemLabelProps>(
  function ContextMenuItemLabel({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="context-menu-item-label"
        className={cx("box-border w-full min-w-0 max-w-[312px] px-[var(--spacing-1)]", className)}
        {...rest}
      >
        <div className="flex min-h-8 w-full items-center py-1.5 pl-8 pr-[var(--spacing-2)]">
          <span className="block w-full truncate font-body text-sm font-semibold leading-5 text-popover-foreground">
            {children}
          </span>
        </div>
      </div>
    );
  }
);

ContextMenuItemLabel.displayName = "ContextMenuItemLabel";
