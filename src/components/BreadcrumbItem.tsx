import * as React from "react";

/** Matches Figma component property `variant`. */
export type BreadcrumbItemVariant = "link" | "current" | "dropdown" | "ellipsis";

/**
 * Static preview states (Storybook / Figma dev mode). When omitted, hover and
 * focus-visible follow interactive CSS like other form controls.
 */
export type BreadcrumbItemState = "default" | "hover" | "focus" | "disabled";

export type BreadcrumbItemProps = {
  variant?: BreadcrumbItemVariant;
  state?: BreadcrumbItemState;
  className?: string;
  children?: React.ReactNode;
  /** Navigates when `variant` is `link`. */
  href?: string;
  disabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ChevronDownIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function EllipsisIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function useEmphasisClasses(
  variant: BreadcrumbItemVariant,
  state: BreadcrumbItemState | undefined,
  disabled: boolean | undefined
) {
  const forced = state !== undefined;
  const isDisabled = disabled || state === "disabled";
  const isCurrent = variant === "current";

  const textAndIcon = (() => {
    if (isDisabled) {
      return "text-muted-foreground opacity-50";
    }
    if (isCurrent) {
      return "text-foreground";
    }
    if (forced) {
      if (state === "hover" || state === "focus") {
        return "text-foreground";
      }
      return "text-muted-foreground";
    }
    return "text-muted-foreground hover:text-foreground";
  })();

  const focusRing = (() => {
    if (isDisabled) return "outline-none";
    if (state === "focus") {
      return "rounded-sm shadow-[0_0_0_3px_var(--color-button-focus-outline)] outline-none";
    }
    if (!forced) {
      return "outline-none focus-visible:rounded-sm focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
    }
    return "outline-none";
  })();

  return { textAndIcon, focusRing, isDisabled };
}

export function BreadcrumbItem({
  variant = "link",
  state,
  className,
  children,
  href,
  disabled,
  "aria-label": ariaLabel,
  ...rest
}: BreadcrumbItemProps) {
  const { textAndIcon, focusRing, isDisabled } = useEmphasisClasses(variant, state, disabled);

  const label =
    children ?? (variant === "ellipsis" ? undefined : "Breadcrumb");

  const typography = "font-body text-sm font-normal leading-5";

  const interactiveCursor = !isDisabled ? "cursor-pointer" : "cursor-not-allowed";

  if (variant === "ellipsis") {
    return (
      <button
        type="button"
        disabled={isDisabled}
        className={cx(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden transition-colors",
          typography,
          textAndIcon,
          focusRing,
          interactiveCursor,
          isDisabled && "pointer-events-none",
          className,
        )}
        aria-label={ariaLabel ?? "More breadcrumbs"}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <EllipsisIcon className="size-4 shrink-0" />
      </button>
    );
  }

  if (variant === "dropdown") {
    const dropdownLabel =
      children !== undefined && children !== null ? children : "Breadcrumb";

    /* Figma node 109:830 — row height from type (text-sm/leading-5), gap spacing-1, overflow-clip */
    return (
      <button
        type="button"
        disabled={isDisabled}
        className={cx(
          "relative inline-flex max-w-full min-w-0 shrink-0 items-center gap-[var(--spacing-1)] overflow-hidden transition-colors",
          typography,
          textAndIcon,
          focusRing,
          interactiveCursor,
          isDisabled && "pointer-events-none",
          className,
        )}
        aria-haspopup="menu"
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <span className="min-w-0 shrink overflow-hidden text-ellipsis whitespace-nowrap">
          {dropdownLabel}
        </span>
        <span className="relative inline-flex size-[15px] shrink-0 overflow-hidden">
          <ChevronDownIcon className="size-[15px] text-current" strokeWidth={1.75} />
        </span>
      </button>
    );
  }

  if (variant === "current") {
    return (
      <span
        aria-current="page"
        className={cx(
          "inline-flex max-w-full items-center justify-center overflow-hidden transition-colors",
          typography,
          textAndIcon,
          focusRing,
          className,
        )}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {label != null ? <span className="truncate">{label}</span> : null}
      </span>
    );
  }

  // link
  const isSpan = !href || isDisabled;
  if (isSpan) {
    return (
      <span
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={cx(
          "inline-flex max-w-full items-center justify-center overflow-hidden transition-colors",
          typography,
          textAndIcon,
          focusRing,
          !isDisabled && interactiveCursor,
          isDisabled && "pointer-events-none",
          className,
        )}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {label != null ? <span className="truncate">{label}</span> : null}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={cx(
        "inline-flex max-w-full items-center justify-center overflow-hidden transition-colors",
        typography,
        textAndIcon,
        focusRing,
        interactiveCursor,
        className,
      )}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {label != null ? <span className="truncate">{label}</span> : null}
    </a>
  );
}
