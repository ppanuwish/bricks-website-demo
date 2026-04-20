import { useEffect, useId, useRef, useState } from "react";
import type {
  FocusEventHandler,
  HTMLAttributes,
  PointerEventHandler,
  Ref,
  TextareaHTMLAttributes,
} from "react";
import {
  clearDefaultShellInteractionExcept,
  registerDefaultShellInteractionClearer,
} from "./formDefaultShellRegistry";

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
      return "border border-input text-muted-foreground shadow-[0_1px_2px_0_var(--color-button-shadow)] hover:border-primary/20";
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
  onShellPointerDown?: PointerEventHandler<HTMLLabelElement>;
  shellRef?: Ref<HTMLLabelElement>;
};

function TextareaControl({
  className,
  forcedState,
  placeholder,
  disabled,
  value,
  onShellPointerDown,
  shellRef,
  ...props
}: TextareaControlProps) {
  const currentState = disabled ? "disabled" : forcedState;

  return (
    <label
      ref={shellRef}
      className={cx(
        "flex min-h-[84px] w-full self-stretch items-start gap-[var(--spacing-1,4px)] overflow-hidden rounded-md bg-[var(--color-outline-surface)] px-[var(--spacing-3,12px)] py-[var(--spacing-2,8px)]",
        classesForState(currentState),
        className
      )}
      onPointerDown={onShellPointerDown}
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
  const { onFocus, onBlur, ...textareaProps } = props;
  const shellInstanceId = useId();
  const shellRef = useRef<HTMLLabelElement>(null);
  const [defaultInteractiveActive, setDefaultInteractiveActive] = useState(false);

  useEffect(() => {
    if (state !== "default" || disabled) setDefaultInteractiveActive(false);
  }, [state, disabled]);

  useEffect(() => {
    if (state !== "default" || disabled) return;
    return registerDefaultShellInteractionClearer(shellInstanceId, () => {
      setDefaultInteractiveActive(false);
    });
  }, [shellInstanceId, state, disabled]);

  useEffect(() => {
    if (state !== "default" || disabled || !defaultInteractiveActive) return;

    const onPointerDownCapture = (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (shell.contains(target)) return;
      setDefaultInteractiveActive(false);
    };

    document.addEventListener("pointerdown", onPointerDownCapture, true);
    return () => document.removeEventListener("pointerdown", onPointerDownCapture, true);
  }, [defaultInteractiveActive, state, disabled]);

  const resolvedForcedState: TextareaState =
    state === "default" && !disabled && defaultInteractiveActive ? "active" : state;

  const handleShellPointerDown: PointerEventHandler<HTMLLabelElement> = (event) => {
    if (state !== "default" || disabled) return;
    if (event.button !== 0) return;
    clearDefaultShellInteractionExcept(shellInstanceId);
    setDefaultInteractiveActive((prev) => !prev);
  };

  const handleFieldFocus: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    onFocus?.(event);
    if (state !== "default" || disabled) return;
    clearDefaultShellInteractionExcept(shellInstanceId);
    setDefaultInteractiveActive(true);
  };

  const handleFieldBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    onBlur?.(event);
    if (state !== "default" || disabled) return;
    setDefaultInteractiveActive(false);
  };

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
            forcedState={resolvedForcedState}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={className}
            rows={rows}
            onShellPointerDown={handleShellPointerDown}
            shellRef={shellRef}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            {...textareaProps}
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
          forcedState={resolvedForcedState}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          className={className}
          rows={rows}
          onShellPointerDown={handleShellPointerDown}
          shellRef={shellRef}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          {...textareaProps}
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
