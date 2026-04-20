import type { HTMLAttributes, TextareaHTMLAttributes } from "react";

type TextareaLayout = "no" | "yes" | "input";
type TextareaState =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "filled"
  | "disabled"
  | "error"
  | "error-focus";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  horizontalLayout?: TextareaLayout;
  state?: TextareaState;
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  wrapperClassName?: string;
  className?: string;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function classesForState(state: TextareaState) {
  switch (state) {
    case "default":
      return "border border-input text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "hover":
      return "border border-primary/20 text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "active":
      return "border-2 border-accent-foreground text-foreground";
    case "focus":
      return "border border-ring text-muted-foreground shadow-[0_0_0_3px_var(--color-button-focus-outline)]";
    case "filled":
      return "border border-input text-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "disabled":
      return "border border-input text-muted-foreground opacity-50 shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "error":
      return "border border-destructive text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)]";
    case "error-focus":
      return "border border-destructive text-muted-foreground shadow-[0_0_0_3px_var(--color-destructive-focus)]";
  }
}

type TextareaControlProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  className?: string;
  forcedState: TextareaState;
};

function TextareaControl({
  className,
  forcedState,
  placeholder,
  disabled,
  value,
  ...props
}: TextareaControlProps) {
  const currentState = disabled ? "disabled" : forcedState;

  return (
    <label
      className={cx(
        "flex min-h-[84px] w-full self-stretch items-start gap-[var(--spacing-1,4px)] overflow-hidden rounded-md bg-[var(--color-outline-surface)] px-[var(--spacing-3,12px)] py-[var(--spacing-2,8px)]",
        classesForState(currentState),
        className
      )}
    >
      <textarea
        {...props}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={cx(
          "min-h-[60px] w-full resize-none bg-transparent font-body text-sm font-normal leading-5 text-foreground outline-none placeholder:text-muted-foreground",
          disabled && "pointer-events-none"
        )}
      />
    </label>
  );
}

export function Textarea({
  horizontalLayout = "no",
  state = "default",
  label = "Label Text",
  description = "This is a textarea description.",
  showLabel = true,
  showDescription = true,
  placeholder = "Placeholder",
  disabled,
  value,
  className,
  wrapperClassName,
  rows = 3,
  ...props
}: TextareaProps) {
  const isInputLayout = horizontalLayout === "input";
  const isYesLayout = horizontalLayout === "yes";

  if (isInputLayout || isYesLayout) {
    return (
      <div className={cx("flex w-[312px] items-start gap-[var(--spacing-4)]", wrapperClassName)}>
        {showLabel ? (
          <div className="w-20 pt-2 text-right font-body text-sm font-semibold leading-none text-foreground">
            {label}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <TextareaControl
            forcedState={state}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={className}
            rows={rows}
            {...props}
          />
          {showDescription ? (
            <p className="mt-[var(--spacing-2)] font-body text-sm font-normal leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative flex w-[373px] flex-col items-start gap-[var(--spacing-2)]",
        wrapperClassName
      )}
    >
      {showLabel ? (
        <p className="w-full font-body text-sm font-semibold leading-none text-foreground">
          {label}
        </p>
      ) : null}
      <div className="w-full">
        <TextareaControl
          forcedState={state}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          className={className}
          rows={rows}
          {...props}
        />
      </div>
      {showDescription ? (
        <p className="w-full font-body text-sm font-normal leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function TextareaRow(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("flex flex-col gap-[var(--spacing-2)]", props.className)} {...props} />;
}
