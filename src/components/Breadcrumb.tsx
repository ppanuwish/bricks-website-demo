import * as React from "react";
import { BreadcrumbItem } from "./BreadcrumbItem";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Matches Figma component property `size` (spacing between segments). */
export type BreadcrumbSize = "md" | "sm";

/**
 * Declarative segments for `BreadcrumbList`. The last segment is usually
 * `current`; no separator is rendered after it.
 */
export type BreadcrumbSegment =
  | { id?: string; type: "link"; label: React.ReactNode; href: string }
  | { id?: string; type: "current"; label: React.ReactNode }
  | { id?: string; type: "ellipsis" }
  | { id?: string; type: "dropdown"; label?: React.ReactNode };

function ChevronRightIcon({ className }: { className?: string }) {
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

function segmentToNode(segment: BreadcrumbSegment) {
  switch (segment.type) {
    case "link":
      return (
        <BreadcrumbItem variant="link" href={segment.href}>
          {segment.label}
        </BreadcrumbItem>
      );
    case "current":
      return <BreadcrumbItem variant="current">{segment.label}</BreadcrumbItem>;
    case "ellipsis":
      return <BreadcrumbItem variant="ellipsis" />;
    case "dropdown":
      return <BreadcrumbItem variant="dropdown">{segment.label}</BreadcrumbItem>;
  }
}

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav">;

/** Root landmark; pair with `BreadcrumbList`. */
export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return <nav aria-label="Breadcrumb" className={className} {...props} />;
}

export type BreadcrumbListProps = Omit<React.ComponentPropsWithoutRef<"ol">, "children"> & {
  size?: BreadcrumbSize;
  /** Overrides the default chevron separator between segments. */
  separator?: React.ReactNode;
  /** When set, renders segments and separators automatically. */
  items?: BreadcrumbSegment[];
  children?: React.ReactNode;
};

/**
 * Ordered list wrapper. Figma: `md` → gap 10px (`spacing/2-5`), `sm` → gap 6px (`spacing/1-5`).
 */
export function BreadcrumbList({
  size = "md",
  separator,
  items,
  className,
  children,
  ...props
}: BreadcrumbListProps) {
  const gapClass = size === "sm" ? "gap-[6px]" : "gap-[10px]";

  const content = items
    ? items.flatMap((segment, i) => {
        const isLast = i === items.length - 1;
        const out: React.ReactNode[] = [
          <BreadcrumbListItem key={`cell-${segment.id ?? i}`}>{segmentToNode(segment)}</BreadcrumbListItem>,
        ];
        if (!isLast) {
          out.push(
            <BreadcrumbSeparator key={`sep-${segment.id ?? i}`}>{separator}</BreadcrumbSeparator>,
          );
        }
        return out;
      })
    : children;

  return (
    <ol
      className={cx("flex list-none flex-wrap items-center", gapClass, className)}
      {...props}
    >
      {content}
    </ol>
  );
}

export type BreadcrumbListItemProps = React.ComponentPropsWithoutRef<"li">;

export function BreadcrumbListItem({ className, ...props }: BreadcrumbListItemProps) {
  return <li className={cx("inline-flex min-w-0 items-center", className)} {...props} />;
}

export type BreadcrumbSeparatorProps = Omit<React.ComponentPropsWithoutRef<"li">, "children"> & {
  children?: React.ReactNode;
};

/** Chevron-right separator (15px), `text-muted-foreground`. */
export function BreadcrumbSeparator({ className, children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cx("inline-flex shrink-0 items-center text-muted-foreground", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="size-[15px]" />}
    </li>
  );
}
