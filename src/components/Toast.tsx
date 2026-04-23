import type { HTMLAttributes, ReactNode } from "react";

import { Button, type ButtonProps } from "./Button";
import {
  ToastCloseButton,
  type ToastCloseButtonVisualState,
} from "./ToastCloseButton";

/** Matches Figma component property `State` (Default / Hover — Hover shows the close control). */
export type ToastVisualState = "default" | "hover";

/** Props forwarded to the default toast action {@link Button} (outline / default size / full width). */
export type ToastActionButtonProps = Omit<
  ButtonProps,
  "children" | "variant" | "size" | "fullWidth" | "type"
>;

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  /** Destructive / error surface (Figma `destructive`). */
  destructive?: boolean;
  /**
   * Visual state for Storybook / Figma parity.
   * In the kit, `hover` shows the close affordance in the top-right.
   */
  state?: ToastVisualState;
  title?: ReactNode;
  /** Omit with `null` or `""`; leave unset for the kit default sentence. */
  description?: ReactNode | null;
  showTitle?: boolean;
  /** Outline action — default “Try again” when `showAction` is true. */
  showAction?: boolean;
  actionLabel?: string;
  action?: ReactNode;
  /**
   * Passed to {@link ToastOutlineAction} → {@link Button}.
   * Omit `theme` to inherit document `data-theme` (radius, palette).
   */
  actionButtonProps?: ToastActionButtonProps;
  /**
   * Close control. Defaults to matching Figma static frames (`true` when `state === "hover"`).
   */
  showClose?: boolean;
  /** Locks close button appearance for docs (see `ToastCloseButton`). */
  closeButtonState?: ToastCloseButtonVisualState;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Figma `shadow/lg` — tokenized in `theme.css` (`--shadow-lg-*`), same structure as kit exports.
 */
const toastElevation =
  "shadow-[var(--shadow-lg-1-offset-x)_var(--shadow-lg-1-offset-y)_var(--shadow-lg-1-blur-radius)_var(--shadow-lg-1-spread-radius)_var(--shadow-lg-1-color),var(--shadow-lg-2-offset-x)_var(--shadow-lg-2-offset-y)_var(--shadow-lg-2-blur-radius)_var(--shadow-lg-2-spread-radius)_var(--shadow-lg-2-color)]";

/**
 * Default toast outline — kit fill on top of {@link Button} `variant="outline"`.
 * `hover:!*` beats Button outline hover utilities when Tailwind merge order would otherwise show accent fill.
 */
const toastOutlineActionDefault = cx(
  "bg-[var(--custom-background-dark-input-30)] text-foreground",
  "hover:!bg-[var(--custom-background-dark-input-30)] hover:!text-foreground",
);

/**
 * Destructive toast outline — transparent + `border-muted` / `destructive-foreground` (Figma).
 * `!` overrides {@link Button} outline `hover:bg-accent` / `hover:text-accent-foreground` and
 * chromatic `state="hover"` (`bg-accent text-accent-foreground`) so hover matches Button’s outline *behavior*
 * (lifted bg, stable label) on top of destructive red instead of gray accent tokens.
 */
const toastOutlineActionDestructive = cx(
  "!border-muted !bg-transparent !text-destructive-foreground",
  "hover:!border-muted hover:!bg-[color-mix(in_srgb,var(--color-destructive-foreground)_12%,transparent)] hover:!text-destructive-foreground",
  "focus-visible:!border-muted",
);

/**
 * Figma **Button/C-Law** outline slot — always {@link Button} `outline` + `default` size + `fullWidth`.
 */
export function ToastOutlineAction({
  destructive,
  label,
  actionButtonProps,
}: {
  destructive: boolean;
  label: ReactNode;
  actionButtonProps?: ToastActionButtonProps;
}) {
  const { className: actionButtonClassName, ...restActionButtonProps } = actionButtonProps ?? {};

  return (
    <Button
      type="button"
      variant="outline"
      size="default"
      fullWidth
      {...restActionButtonProps}
      className={cx(
        destructive ? toastOutlineActionDestructive : toastOutlineActionDefault,
        actionButtonClassName,
      )}
    >
      {label}
    </Button>
  );
}

export function Toast({
  destructive = false,
  state = "default",
  title = "Title Text",
  description,
  showTitle = true,
  showAction = true,
  actionLabel = "Try again",
  action,
  actionButtonProps,
  showClose,
  closeButtonState = "default",
  className,
  children,
  ...props
}: ToastProps) {
  const descriptionContent =
    description === undefined ? "This is a toast description." : description;

  const closeVisible = showClose ?? state === "hover";

  const surface = destructive
    ? "border-destructive bg-destructive"
    : "border-border bg-background";

  const textTitle = destructive ? "text-destructive-foreground" : "text-foreground";
  const textBody = destructive ? "text-destructive-foreground" : "text-foreground";

  const actionButton =
    action ??
    (showAction ? (
      <ToastOutlineAction
        destructive={destructive}
        label={actionLabel}
        actionButtonProps={actionButtonProps}
      />
    ) : null);

  return (
    <div
      role={destructive ? "alert" : "status"}
      aria-live={destructive ? "assertive" : "polite"}
      className={cx(
        /* Figma 166:392 — flex row, 388px, spacing-4 / 6 / 4 / 4, gap spacing-2, items-center */
        "relative box-border flex w-[388px] shrink-0 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-solid p-[var(--spacing-4)_var(--spacing-6)_var(--spacing-4)_var(--spacing-4)] font-body text-sm leading-5",
        toastElevation,
        surface,
        className,
      )}
      {...props}
    >
      <div
        className={cx(
          "flex min-h-0 min-w-0 flex-[1_0_0] flex-col items-start gap-[var(--spacing-1)] not-italic",
          textBody,
        )}
      >
        {children ?? (
          <>
            {showTitle && title ? (
              <p className={cx("w-full shrink-0 font-semibold leading-5", textTitle)}>{title}</p>
            ) : null}
            {descriptionContent !== null && descriptionContent !== "" ? (
              <p className={cx("w-full shrink-0 font-normal leading-5 opacity-90", textBody)}>
                {descriptionContent}
              </p>
            ) : null}
          </>
        )}
      </div>

      {showAction && actionButton ? (
        <div className="flex w-24 shrink-0 flex-col items-start justify-center gap-0">{actionButton}</div>
      ) : null}

      {closeVisible ? (
        <div className="absolute right-[3px] top-[3px] flex items-center pl-[var(--spacing-2)]">
          <ToastCloseButton type="button" state={closeButtonState} onDestructiveSurface={destructive} />
        </div>
      ) : null}
    </div>
  );
}
