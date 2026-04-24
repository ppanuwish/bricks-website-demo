import type { HTMLAttributes } from "react";

function joinClasses(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma Card (17374:183180) — `shadow/sm` from `theme.css` (`--shadow-sm-*` @theme). */
const cardShadowSm =
  "shadow-[var(--shadow-sm-1-offset-x)_var(--shadow-sm-1-offset-y)_var(--shadow-sm-1-blur-radius)_var(--shadow-sm-1-spread-radius)_var(--shadow-sm-1-color),var(--shadow-sm-2-offset-x)_var(--shadow-sm-2-offset-y)_var(--shadow-sm-2-blur-radius)_var(--shadow-sm-2-spread-radius)_var(--shadow-sm-2-color)]";

export type CardProps = HTMLAttributes<HTMLDivElement>;

/** Root surface: card fill, border, Figma `shadow/sm`, frame padding `spacing/6`. */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={joinClasses(
        "flex flex-col gap-[var(--spacing-6)] overflow-hidden rounded-lg border border-border bg-card p-[var(--spacing-6)] text-card-foreground",
        cardShadowSm,
        className
      )}
      {...props}
    />
  );
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/** Header region; horizontal inset comes from root `Card` `p-[var(--spacing-6)]`. */
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={joinClasses("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export type CardTitleProps = HTMLAttributes<HTMLParagraphElement>;

/** Figma `text/base` + semibold + `leading-none` + `card-foreground`. */
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <p
      data-slot="card-title"
      className={joinClasses(
        "font-body text-base font-semibold leading-none text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Figma `text/sm` + regular + `text/sm/line-height` + `muted-foreground`. */
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={joinClasses(
        "font-body text-sm font-normal leading-5 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div data-slot="card-content" className={joinClasses(className)} {...props} />
  );
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={joinClasses("flex flex-col", className)}
      {...props}
    />
  );
}
