import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type ContextMenuProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/**
 * Context menu content surface (Figma `ContextMenu`, 249:5013): `popover` fill, `border-border`,
 * `shadow-md`, inner padding `spacing-1`, width **256px** (`w-64`). Compose with
 * {@link ContextMenuItemLabel}, {@link ContextMenuItem}, {@link ContextMenuItemSubTrigger},
 * {@link ContextMenuSeparator}.
 *
 * @see https://ui.shadcn.com/docs/components/context-menu
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu(
  { className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="context-menu"
      className={cx(
        "flex w-64 min-w-0 flex-col items-stretch overflow-hidden border border-border bg-popover p-[var(--spacing-1)] text-popover-foreground shadow-md",
        "rounded-[length:var(--radius-md)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

ContextMenu.displayName = "ContextMenu";

export type ContextMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

/**
 * Full-bleed hairline between groups (Figma `ContextMenu / Item / Separator`, 249:5008). Negative
 * horizontal margin cancels the menu’s inner padding so the rule spans edge-to-edge — same pattern
 * as {@link DropdownMenuSeparator}.
 */
export function ContextMenuSeparator({ className, ...rest }: ContextMenuSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="context-menu-separator"
      className={cx("-mx-[var(--spacing-1)] my-1 h-px shrink-0 bg-border", className)}
      {...rest}
    />
  );
}
