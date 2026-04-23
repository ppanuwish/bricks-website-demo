import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

/**
 * Figma `Combobox` (430:4114): `Type=Default` = avatar + value + `Icon / ChevronsUpDown` (h-9);
 * `Type=With Group Label` = stacked small label + value + `Icon / ChevronDown` (h-12).
 */
export type ComboboxType = "default" | "withGroupLabel";

/** `hover` / `focus` / `disabled` pin Storybook; `"default"` uses real hover on the trigger. */
export type ComboboxState = "default" | "hover" | "focus" | "disabled";

export type ComboboxProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  type?: ComboboxType;
  state?: ComboboxState;
  label?: string;
  showLabel?: boolean;
  description?: string;
  showDescription?: boolean;
  /** Small top line when `type` is `"withGroupLabel"` (Figma “Group Label”). */
  groupLabel?: string;
  placeholder?: string;
  /** When set, shown like a selection instead of the placeholder. */
  value?: string;
  /** Leading avatar on `type="default"` (Figma: Type=Image, 20px). */
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
  /** Replaces the default avatar (only `type="default"`). */
  leading?: ReactNode;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "id" | "onClick" | "aria-controls" | "aria-expanded" | "aria-label">;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const shadowXs = "shadow-[0_1px_2px_0_var(--color-button-shadow)]";
const focusRing = "shadow-[0_0_0_3px_var(--color-button-focus-outline)]";

/**
 * Figma `Combobox` field group (node 430:4114). Trigger uses `theme.css` input, border, ring,
 * accent, shadow tokens; `Avatar` when `type="default"` and `showAvatar` is on.
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(function Combobox(
  {
    type = "default",
    state = "default",
    label = "Label",
    showLabel = true,
    description = "This is a combobox description.",
    showDescription = true,
    groupLabel = "Group Label",
    placeholder = "Placeholder",
    value,
    showAvatar = true,
    avatarSrc,
    avatarAlt = "",
    leading,
    disabled: disabledProp,
    className,
    triggerClassName,
    onClick,
    "aria-label": ariaLabel,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    id,
    ...rest
  },
  ref
) {
  const isDisabled = Boolean(disabledProp) || state === "disabled";
  const pin = !isDisabled && state !== "default";
  const isGroup = type === "withGroupLabel";
  const hasValue = Boolean(value && value.length > 0);
  const mainLine = hasValue ? (value as string) : placeholder;

  const mainTextColor = isDisabled
    ? "text-muted-foreground"
    : pin
      ? state === "hover"
        ? "text-accent-foreground"
        : "text-foreground"
      : "text-foreground group-hover:text-accent-foreground";

  const triggerClasses = (() => {
    if (isDisabled) {
      return cx("border border-input bg-background", shadowXs, "opacity-50", "cursor-not-allowed");
    }
    if (pin) {
      if (state === "hover") {
        return cx("border border-input bg-accent", shadowXs);
      }
      if (state === "focus") {
        return cx("border border-ring bg-background", focusRing);
      }
    }
    return cx(
      "border border-input bg-background",
      shadowXs,
      "hover:border-input hover:bg-accent",
      "focus-visible:border-ring focus-visible:shadow-[0_0_0_3px_var(--color-button-focus-outline)]"
    );
  })();

  const iconMuted = "size-4 shrink-0 text-muted-foreground opacity-50";

  return (
    <div
      className={cx("flex w-full min-w-0 max-w-[228px] flex-col items-stretch gap-[var(--spacing-2)]", className)}
      {...rest}
    >
      {showLabel ? (
        <p className="w-full font-body text-sm font-semibold leading-none text-foreground">{label}</p>
      ) : null}

      <button
        ref={ref}
        id={id}
        type="button"
        role="combobox"
        disabled={isDisabled}
        aria-expanded={ariaExpanded ?? false}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
        data-state={state}
        data-type={type}
        onClick={onClick}
        className={cx(
          "group flex w-full min-w-0 items-center overflow-hidden rounded-md text-left font-body outline-none transition-[border-color,box-shadow,background-color,opacity] ease-out",
          isGroup ? "h-12 gap-[var(--spacing-2)] px-[var(--spacing-4)] py-[var(--spacing-2)]" : "h-9 gap-[var(--spacing-2)] px-[var(--spacing-4)] py-[var(--spacing-2)]",
          isDisabled && "pointer-events-none",
          !isDisabled && "cursor-default",
          triggerClasses,
          triggerClassName
        )}
      >
        {type === "default" && (leading ?? (showAvatar ? (
          <Avatar size="5" className="shrink-0">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={avatarAlt} /> : null}
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        ) : null))}

        {type === "default" ? (
          <span
            className={cx(
              "min-w-0 flex-1 truncate text-left text-sm font-semibold leading-5",
              mainTextColor
            )}
          >
            {mainLine}
          </span>
        ) : (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0.5 not-italic">
            <p className="w-full min-w-0 truncate font-body text-xs font-normal leading-4 text-muted-foreground">
              {groupLabel}
            </p>
            <p
              className={cx("w-full min-w-0 truncate text-left text-sm font-semibold leading-5", mainTextColor)}
            >
              {mainLine}
            </p>
          </div>
        )}

        {type === "default" ? (
          <ChevronsUpDown aria-hidden className={iconMuted} strokeWidth={1.5} />
        ) : (
          <ChevronDown aria-hidden className={iconMuted} strokeWidth={1.5} />
        )}
      </button>

      {showDescription ? (
        <p className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
});

Combobox.displayName = "Combobox";
