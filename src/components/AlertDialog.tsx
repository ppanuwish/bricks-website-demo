import {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { Button } from "./Button";

export type AlertDialogBreakpoint = "md" | "sm";

function joinClasses(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type AlertDialogContextValue = {
  breakpoint: AlertDialogBreakpoint;
};

const AlertDialogContext = createContext<AlertDialogContextValue>({
  breakpoint: "md",
});

function useAlertDialogContext() {
  return useContext(AlertDialogContext);
}

type AlertDialogProps = HTMLAttributes<HTMLDivElement> & {
  breakpoint?: AlertDialogBreakpoint;
  title?: string;
  description?: string;
  cancelText?: string;
  continueText?: string;
  onCancel?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onContinue?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export function AlertDialog({
  breakpoint = "md",
  title = "Title Text",
  description = "This is an alert dialog description.",
  cancelText = "Cancel",
  continueText = "Continue",
  onCancel,
  onContinue,
  className,
  children,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ breakpoint }}>
      <div
        className={joinClasses(
          "flex w-[512px] max-w-[var(--max-width-max-w-lg,512px)] flex-col items-end",
          "gap-[var(--spacing-4)] rounded-lg",
          "border border-border border-solid",
          "bg-background p-[var(--spacing-6)] shadow-lg",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {breakpoint === "sm" ? (
                <>
                  <AlertDialogAction fullWidth onClick={onContinue}>
                    {continueText}
                  </AlertDialogAction>
                  <AlertDialogCancel fullWidth onClick={onCancel}>
                    {cancelText}
                  </AlertDialogCancel>
                </>
              ) : (
                <>
                  <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                  <AlertDialogAction onClick={onContinue}>{continueText}</AlertDialogAction>
                </>
              )}
            </AlertDialogFooter>
          </>
        )}
      </div>
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { breakpoint } = useAlertDialogContext();
  return (
    <div
      className={joinClasses(
        "flex w-full flex-col items-start gap-[var(--spacing-2)]",
        breakpoint === "sm" && "text-center",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={joinClasses(
        "w-full font-body text-[18px] font-semibold leading-[28px] text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={joinClasses(
        "w-full font-body text-[14px] font-normal leading-[20px] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { breakpoint } = useAlertDialogContext();
  const isSm = breakpoint === "sm";
  return (
    <div
      className={joinClasses(
        "w-full gap-[var(--spacing-2)]",
        isSm
          ? "flex flex-col items-start justify-center"
          : "flex items-center justify-end",
        className
      )}
      {...props}
    />
  );
}

type AlertDialogButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function AlertDialogAction({
  className,
  fullWidth,
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <Button
      variant="default"
      size="default"
      fullWidth={fullWidth}
      className={joinClasses(
        "h-9 px-[var(--spacing-4)] py-[var(--spacing-2)]",
        "text-[14px] leading-[20px]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export function AlertDialogCancel({
  className,
  fullWidth,
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <Button
      variant="outline"
      size="default"
      fullWidth={fullWidth}
      className={joinClasses(
        "h-9 border-input bg-[var(--color-outline-surface)] px-[var(--spacing-4)] py-[var(--spacing-2)]",
        "text-[14px] leading-[20px]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
