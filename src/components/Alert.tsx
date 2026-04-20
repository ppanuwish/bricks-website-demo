import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type AlertVariant = "default" | "destructive";

type AlertContextValue = {
  variant: AlertVariant;
};

const AlertContext = createContext<AlertContextValue>({ variant: "default" });

function useAlertContext() {
  return useContext(AlertContext);
}

function joinClasses(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  /** Optional trailing control (e.g. undo) — Figma `button` slot */
  action?: ReactNode;
};

export function Alert({
  variant = "default",
  action,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <AlertContext.Provider value={{ variant }}>
      <div
        role="alert"
        className={joinClasses(
          "flex w-full items-center justify-between rounded-lg border border-border bg-card",
          /* Figma: px = spacing/4 (16), py = spacing/3 (12); use vars only so Tailwind parses reliably */
          "py-[var(--spacing-3)] px-[var(--spacing-4)]",
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-start gap-[var(--spacing-3)]">
          {children}
        </div>
        {action ? (
          <div className="flex shrink-0 items-center pl-[var(--spacing-3)]">{action}</div>
        ) : null}
      </div>
    </AlertContext.Provider>
  );
}

type AlertIconProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Icon column: Figma `pt-[2px]` + `spacing/3` gap to copy; default = circle-check */
export function AlertIcon({ className, children, ...props }: AlertIconProps) {
  const { variant } = useAlertContext();
  return (
    <div
      className={joinClasses("flex shrink-0 items-start pt-[2px]", className)}
      {...props}
    >
      {children ?? (
        <CircleCheckIcon
          className={joinClasses(
            "size-4 shrink-0",
            variant === "destructive" ? "text-destructive" : "text-foreground"
          )}
        />
      )}
    </div>
  );
}

function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

type AlertContentProps = HTMLAttributes<HTMLDivElement>;

/** Title + description stack: Figma `gap-[spacing/1]` */
export function AlertContent({ className, children, ...props }: AlertContentProps) {
  return (
    <div
      className={joinClasses(
        "flex min-w-0 flex-1 flex-col justify-center gap-[var(--spacing-1)] leading-[20px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type AlertTitleProps = HTMLAttributes<HTMLDivElement>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  const { variant } = useAlertContext();
  return (
    <div
      className={joinClasses(
        "min-w-0 truncate font-body text-[14px] font-semibold leading-[20px]",
        variant === "destructive" ? "text-destructive" : "text-foreground",
        className
      )}
      {...props}
    />
  );
}

type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  const { variant } = useAlertContext();
  return (
    <p
      className={joinClasses(
        "min-w-0 font-body text-[14px] font-normal leading-[20px]",
        variant === "destructive" ? "text-destructive" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
