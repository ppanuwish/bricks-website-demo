import type { HTMLAttributes, InputHTMLAttributes } from "react";

type InputVariant = "default" | "file";
type InputLayout = "no" | "yes" | "input";
type InputState =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "filled"
  | "disabled"
  | "error"
  | "error-focus";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: InputVariant;
  horizontalLayout?: InputLayout;
  state?: InputState;
  label?: string;
  description?: string;
  linkText?: string;
  showLabel?: boolean;
  showDescription?: boolean;
  showLink?: boolean;
  showIcon?: boolean;
  fileButtonText?: string;
  fileText?: string;
  wrapperClassName?: string;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

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

function classesForState(state: InputState) {
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

type InputControlProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "className"
> & {
  className?: string;
  variant: InputVariant;
  forcedState: InputState;
  showIcon: boolean;
  fileButtonText: string;
  fileText: string;
};

function InputControl({
  className,
  variant,
  forcedState,
  placeholder,
  showIcon,
  disabled,
  fileButtonText,
  fileText,
  value,
  ...props
}: InputControlProps) {
  const currentState = disabled ? "disabled" : forcedState;

  const base =
    "flex h-9 w-full self-stretch items-center gap-[var(--spacing-1,4px)] overflow-hidden rounded-md border bg-[var(--color-outline-surface)] px-[var(--spacing-3,12px)] py-[var(--spacing-1,4px)]";

  if (variant === "file") {
    return (
      <div className={cx(base, classesForState(currentState), className)}>
        <span className="px-[6px] py-px font-body text-sm font-semibold leading-5 text-foreground">
          {fileButtonText}
        </span>
        <span className="min-w-0 flex-1 truncate font-body text-sm font-normal leading-5 text-foreground">
          {fileText}
        </span>
      </div>
    );
  }

  return (
    <label className={cx(base, classesForState(currentState), className)}>
      {showIcon ? <SearchIcon className="size-4 shrink-0 text-muted-foreground" /> : null}
      <input
        {...props}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={cx(
          "min-w-0 flex-1 bg-transparent font-body text-sm font-normal leading-5 text-foreground outline-none placeholder:text-muted-foreground",
          disabled && "pointer-events-none"
        )}
      />
    </label>
  );
}

export function Input({
  variant = "default",
  horizontalLayout = "no",
  state = "default",
  label = "Label",
  description = "This is an input description.",
  linkText = "Forgot your password?",
  showLabel = true,
  showDescription = true,
  showLink = false,
  showIcon = false,
  fileButtonText = "Choose file",
  fileText = "No file chosen",
  placeholder = "Placeholder",
  disabled,
  value,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
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
          <InputControl
            variant={variant}
            forcedState={state}
            placeholder={placeholder}
            showIcon={showIcon}
            disabled={disabled}
            fileButtonText={fileButtonText}
            fileText={fileText}
            value={value}
            className={className}
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
      {showLink ? (
        <span className="absolute right-0 top-0 font-body text-sm font-normal leading-none text-muted-foreground underline">
          {linkText}
        </span>
      ) : null}
      <div className="w-full">
        <InputControl
          variant={variant}
          forcedState={state}
          placeholder={placeholder}
          showIcon={showIcon}
          disabled={disabled}
          fileButtonText={fileButtonText}
          fileText={fileText}
          value={value}
          className={className}
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

export function InputRow(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("flex flex-col gap-[var(--spacing-2)]", props.className)} {...props} />;
}
