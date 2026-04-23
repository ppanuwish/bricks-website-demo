import type { HTMLAttributes, ReactNode } from "react";
import { ComboboxCommandMenuHeading } from "./ComboboxCommandMenu";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Command` (204:1144): `Variant=Suggestions` | `Variant=Empty` — shell only; compose with subcomponents. */
export type CommandVariant = "suggestions" | "empty";

export type CommandProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CommandVariant;
};

/**
 * Command palette shell (Figma `Command`, 204:1144): `max-w` from `theme.css`
 * (`--max-width-max-w-lg`), `border-border`, `bg-popover`, `shadow-md`, `text-popover-foreground`.
 * Compose with `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, etc.
 */
export function Command({ variant = "suggestions", className, ...props }: CommandProps) {
  return (
    <div
      data-slot="command"
      data-variant={variant}
      className={cx(
        "flex w-full min-w-0 max-w-[var(--max-width-max-w-lg,512px)] flex-col overflow-hidden border border-border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  );
}

/** Scrollable list region below the search field (shadcn-style `CommandList`). */
export function CommandList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-list"
      className={cx("flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  );
}

/** Figma `CommandGroup` (202:988): horizontal padding for grouped headings + items. */
export function CommandGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-group"
      className={cx("flex w-full flex-col px-[var(--spacing-2)] py-[var(--spacing-1)]", className)}
      {...props}
    />
  );
}

/** Figma `Command / Input/Command/Item/Separator` (345:8826): full-width hairline between groups. */
export function CommandSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-separator"
      role="separator"
      aria-orientation="horizontal"
      className={cx("flex h-0 w-full shrink-0 flex-col px-px", className)}
      {...props}
    >
      <div className="h-px w-full bg-border" />
    </div>
  );
}

export type CommandEmptyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Figma `CommandEmpty` (204:1093): centered message when there are no results (`Variant=Empty`). */
export function CommandEmpty({ className, children = "No results found.", ...props }: CommandEmptyProps) {
  return (
    <div
      data-slot="command-empty"
      className={cx(
        "flex w-full flex-col items-center justify-center py-[var(--spacing-6)]",
        className
      )}
      {...props}
    >
      <p className="max-w-full truncate px-[var(--spacing-2)] text-center font-body text-sm font-normal leading-5 text-popover-foreground">
        {children}
      </p>
    </div>
  );
}

/**
 * Section label above command rows — same as Figma `Command / Input/Command/Menu Heading` (345:8645);
 * implemented by `ComboboxCommandMenuHeading`.
 */
export const CommandHeading = ComboboxCommandMenuHeading;
