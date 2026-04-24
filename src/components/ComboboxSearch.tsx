import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

/**
 * Pin visuals in Storybook / Figma. `"default"` defers to the field’s real focus
 * and the `disabled` attribute.
 */
export type ComboboxSearchState = "default" | "focus" | "disabled";

export type ComboboxSearchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "className"
> & {
  state?: ComboboxSearchState;
  /** Optional leading mark; Figma `Icon / Search` (5197:3296) by default. */
  icon?: ReactNode;
  className?: string;
  inputClassName?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma `Icon / Search` — 16×16, matches `Input` search glyph. */
function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * Combobox list header search field (Figma `Combobox / Search`, 17379:199237).
 * Bottom rule separates the filter from list rows; uses `theme.css` popover, border,
 * spacing, and body typography.
 */
export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>(
  function ComboboxSearch(
    {
      state = "default",
      type = "text",
      icon,
      className,
      inputClassName,
      placeholder = "Search",
      disabled: disabledProp,
      readOnly,
      "aria-label": ariaLabel,
      ...inputProps
    },
    ref
  ) {
    const disabled = Boolean(disabledProp) || state === "disabled";
    const forcedFocus = state === "focus";

    return (
      <div
        data-state={state}
        className={cx(
          "group flex w-full min-w-0 max-w-[245px] items-center gap-[var(--spacing-2)] border-b border-border bg-popover px-[var(--spacing-3)] py-2.5 transition-[border-color,opacity]",
          !disabled && !forcedFocus && "focus-within:border-b-primary",
          forcedFocus && "border-b-primary",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <span className="pointer-events-none flex size-4 shrink-0 items-center justify-center text-muted-foreground">
          {icon ?? <SearchIcon className="size-4" />}
        </span>
        <input
          ref={ref}
          type={type}
          role="searchbox"
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label={ariaLabel ?? placeholder}
          className={cx(
            "min-w-0 flex-1 bg-transparent font-body text-sm font-normal leading-5 text-foreground outline-none placeholder:text-muted-foreground",
            "focus-visible:ring-0",
            inputClassName
          )}
          {...inputProps}
        />
      </div>
    );
  }
);

ComboboxSearch.displayName = "ComboboxSearch";
