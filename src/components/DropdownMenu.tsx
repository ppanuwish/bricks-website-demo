import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/**
 * Menu content surface (Figma `DropdownMenu / Menu`, 105:55): popover fill, border, `shadow-md`,
 * inner padding `spacing-1`. Compose with {@link DropdownMenuItemLabel}, {@link DropdownMenuItem},
 * {@link DropdownMenuItemSubTrigger}, {@link DropdownMenuSeparator}.
 *
 * @see https://ui.shadcn.com/docs/components/dropdown-menu
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="dropdown-menu"
      className={cx(
        "flex w-56 min-w-0 flex-col items-stretch overflow-hidden border border-border bg-popover p-[var(--spacing-1)] text-popover-foreground shadow-md",
        "rounded-[length:var(--radius-md)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

DropdownMenu.displayName = "DropdownMenu";

export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

/**
 * Full-bleed hairline between groups (Figma `DropdownMenu / Item / Separator`, 91:272).
 * Negative horizontal margin cancels the menu’s inner padding so the rule spans edge-to-edge.
 */
export function DropdownMenuSeparator({ className, ...rest }: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="dropdown-menu-separator"
      className={cx("-mx-[var(--spacing-1)] my-1 h-px shrink-0 bg-border", className)}
      {...rest}
    />
  );
}
