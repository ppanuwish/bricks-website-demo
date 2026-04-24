import type { ReactNode } from "react";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Switch } from "./Switch";
import { Textarea } from "./Textarea";

type FormLayout =
  | "basic"
  | "select-switch"
  | "combobox-textarea"
  | "date-checkbox"
  | "textarea-checkbox"
  | "split-choice"
  | "split-simple"
  | "contact-subscription";

type FormBreakpoint = "desktop" | "mobile";

type FormProps = {
  layout?: FormLayout;
  breakpoint?: FormBreakpoint;
  title?: string;
  description?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  className?: string;
};

type FieldProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  state?: "default" | "hover" | "active" | "focus" | "filled" | "disabled" | "error" | "error-focus";
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function CardShell({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex min-w-[190px] flex-col items-start gap-[var(--spacing-6)] border border-border bg-background p-[var(--spacing-6)] shadow-sm",
        className
      )}
    >
      <div className="flex w-full flex-col items-start gap-[6px]">
        <p className="w-full font-body text-base font-semibold leading-none tracking-[-0.4px] text-card-foreground">
          {title}
        </p>
        <p className="w-full font-body text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function InputField({
  label = "Label",
  description = "This is an input description.",
  placeholder = "Placeholder",
  state = "default",
}: FieldProps) {
  return (
    <Input
      state={state}
      label={label}
      description={description}
      placeholder={placeholder}
      showLabel
      showDescription={Boolean(description)}
      wrapperClassName="w-full"
      className="w-full"
    />
  );
}

function TextareaField({
  label = "Label Text",
  description = "This is a textarea description.",
  placeholder = "Placeholder",
  state = "default",
}: FieldProps) {
  return (
    <Textarea
      state={state}
      label={label}
      description={description}
      placeholder={placeholder}
      showLabel
      showDescription={Boolean(description)}
      wrapperClassName="w-full"
      className="w-full"
    />
  );
}

function SelectField({
  label = "Label",
  description = "This is a select description.",
  placeholder = "Placeholder",
}: FieldProps & { placeholder?: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-[var(--spacing-2)]">
      <p className="w-full font-body text-sm font-semibold leading-none text-foreground">
        {label}
      </p>
      <button
        type="button"
        className="flex h-9 w-full items-center gap-[var(--spacing-2)] overflow-hidden border border-input bg-background px-[var(--spacing-3)] py-[var(--spacing-2)] text-left shadow-[0_1px_2px_0_var(--color-button-shadow)]"
      >
        <span className="min-w-0 flex-1 truncate font-body text-sm font-semibold leading-5 text-muted-foreground">
          {placeholder}
        </span>
        <ChevronDownIcon />
      </button>
      {description ? (
        <p className="w-full font-body text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DateField({
  label = "Label",
  description,
}: FieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[var(--spacing-2)]">
      <p className="w-full font-body text-sm font-semibold leading-none text-foreground">
        {label}
      </p>
      <button
        type="button"
        className="flex h-9 w-full items-center gap-[var(--spacing-2)] overflow-hidden border border-input bg-background px-[var(--spacing-4)] py-[var(--spacing-2)] text-left shadow-[0_1px_2px_0_var(--color-button-shadow)]"
      >
        <CalendarIcon />
        <span className="min-w-0 flex-1 truncate font-body text-sm leading-5 text-muted-foreground">
          Pick a date
        </span>
      </button>
      {description ? (
        <p className="w-full font-body text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SwitchField({
  label = "Switch Text",
  description = "This is a switch description.",
}: FieldProps) {
  return (
    <Switch
      label={label}
      description={description}
      showLabel
      showDescription={Boolean(description)}
      wrapperClassName="w-full max-w-none"
    />
  );
}

function CheckboxField({
  label = "Checkbox Text",
  description = "This is a checkbox description.",
}: FieldProps) {
  return (
    <Checkbox
      label={label}
      description={description}
      showLabel
      showDescription={Boolean(description)}
      defaultChecked
      wrapperClassName="w-full max-w-none"
    />
  );
}

function RadioGroupField({ label = "Label" }: { label?: string }) {
  return (
    <RadioGroup
      label={label}
      defaultValue="a"
      className="w-full max-w-none"
    >
      <RadioGroupItem
        value="a"
        label="Radio Button Text"
        description="This is a radio description."
        variant="default"
      />
      <RadioGroupItem
        value="b"
        label="Radio Button Text"
        description="This is a radio description."
        variant="default"
      />
    </RadioGroup>
  );
}

function ComboboxField({
  label = "Label",
  description = "This is a combobox description.",
}: FieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[var(--spacing-2)]">
      <p className="w-full font-body text-sm font-semibold leading-none text-foreground">
        {label}
      </p>
      <button
        type="button"
        className="flex h-9 w-full items-center gap-[var(--spacing-2)] overflow-hidden border border-input bg-background px-[var(--spacing-4)] py-[var(--spacing-2)] text-left shadow-[0_1px_2px_0_var(--color-button-shadow)]"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-body text-[10px] font-semibold text-foreground">
          BT
        </span>
        <span className="min-w-0 flex-1 truncate font-body text-sm font-semibold leading-5 text-foreground">
          Placeholder
        </span>
        <ChevronsUpDownIcon />
      </button>
      <p className="w-full font-body text-sm leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function FooterActions({
  primaryActionText,
  secondaryActionText,
  fullWidthPrimary = false,
}: {
  primaryActionText: string;
  secondaryActionText?: string;
  fullWidthPrimary?: boolean;
}) {
  if (secondaryActionText) {
    return (
      <div className="flex w-full items-start justify-between gap-3">
        <Button variant="outline">{secondaryActionText}</Button>
        <Button>{primaryActionText}</Button>
      </div>
    );
  }

  return (
    <div className="flex h-10 w-full items-start justify-between">
      <Button fullWidth={fullWidthPrimary} className={cx(!fullWidthPrimary && "flex-1")}>
        {primaryActionText}
      </Button>
    </div>
  );
}

function renderSingleColumnLayout(layout: FormLayout, primaryActionText: string, secondaryActionText?: string) {
  switch (layout) {
    case "basic":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField />
            <InputField />
          </div>
          <FooterActions primaryActionText={primaryActionText} fullWidthPrimary />
        </>
      );
    case "select-switch":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField />
            <InputField />
            <SelectField />
            <SwitchField />
          </div>
          <FooterActions primaryActionText={primaryActionText} fullWidthPrimary />
        </>
      );
    case "combobox-textarea":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField />
            <InputField />
            <ComboboxField />
            <TextareaField />
          </div>
          <FooterActions primaryActionText={primaryActionText} fullWidthPrimary />
        </>
      );
    case "date-checkbox":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField />
            <SelectField />
            <DateField />
            <CheckboxField />
          </div>
          <FooterActions
            primaryActionText={primaryActionText}
            secondaryActionText={secondaryActionText}
          />
        </>
      );
    case "textarea-checkbox":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField />
            <InputField />
            <SelectField />
            <TextareaField />
            <CheckboxField />
          </div>
          <FooterActions
            primaryActionText={primaryActionText}
            secondaryActionText={secondaryActionText}
          />
        </>
      );
    case "contact-subscription":
      return (
        <>
          <div className="flex w-full flex-col gap-[var(--spacing-4)]">
            <InputField
              label="First name"
              description=""
              placeholder="e.g., John"
            />
            <InputField
              label="Last name"
              description=""
              placeholder="e.g., Smith"
            />
            <InputField
              label="Company name"
              description=""
              placeholder="e.g., Bricks AI Co., Ltd."
            />
            <InputField
              label="Phone number"
              description=""
              placeholder="e.g., +66 81 234 5678"
            />
            <InputField
              label="Email"
              description=""
              placeholder="e.g., john@company.com"
            />
            <TextareaField
              label="What do you need in your workforce"
              description=""
              placeholder="Tell us your hiring or workforce challenges, goals, and timeline."
            />
          </div>
          <FooterActions primaryActionText={primaryActionText} fullWidthPrimary />
        </>
      );
    default:
      return null;
  }
}

function renderSplitChoice(breakpoint: FormBreakpoint, primaryActionText: string, secondaryActionText?: string) {
  const containerClass =
    breakpoint === "desktop"
      ? "flex w-full gap-[var(--spacing-4)]"
      : "flex w-full flex-col gap-[var(--spacing-4)]";

  const columnClass = "flex min-w-0 flex-1 flex-col gap-[var(--spacing-4)]";

  return (
    <>
      <div className={containerClass}>
        <div className={columnClass}>
          <InputField />
          <InputField />
          <InputField description="" />
          <DateField />
        </div>
        <div className={columnClass}>
          <RadioGroupField />
          <SelectField description="" />
          <TextareaField description="" />
        </div>
      </div>
      <FooterActions
        primaryActionText={primaryActionText}
        secondaryActionText={secondaryActionText}
      />
    </>
  );
}

function renderSplitSimple(breakpoint: FormBreakpoint, primaryActionText: string, secondaryActionText?: string) {
  const containerClass =
    breakpoint === "desktop"
      ? "flex w-full gap-[var(--spacing-4)]"
      : "flex w-full flex-col gap-[var(--spacing-4)]";

  const columnClass = "flex min-w-0 flex-1 flex-col gap-[var(--spacing-4)]";

  return (
    <>
      <div className={containerClass}>
        <div className={columnClass}>
          <InputField description="" />
          <DateField />
          <SelectField description="" />
        </div>
        <div className={columnClass}>
          <InputField description="" />
          <InputField description="" />
          <InputField description="" />
        </div>
      </div>
      <FooterActions
        primaryActionText={primaryActionText}
        secondaryActionText={secondaryActionText}
      />
    </>
  );
}

export function Form({
  layout = "basic",
  breakpoint = "desktop",
  title = "Title Text",
  description = "This is a card description.",
  primaryActionText = "Deploy",
  secondaryActionText,
  className,
}: FormProps) {
  const defaultSecondary =
    layout === "date-checkbox" ||
    layout === "textarea-checkbox" ||
    layout === "split-choice" ||
    layout === "split-simple"
      ? (secondaryActionText ?? "Cancel")
      : undefined;

  const widthClass =
    layout === "split-choice" || layout === "split-simple"
      ? breakpoint === "desktop"
        ? "w-[740px]"
        : "w-[386px] max-w-full"
      : "w-[374px] max-w-full";

  return (
    <CardShell title={title} description={description} className={cx(widthClass, className)}>
      {layout === "split-choice"
        ? renderSplitChoice(breakpoint, primaryActionText, defaultSecondary)
        : layout === "split-simple"
          ? renderSplitSimple(breakpoint, primaryActionText, defaultSecondary)
          : renderSingleColumnLayout(layout, primaryActionText, defaultSecondary)}
    </CardShell>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 shrink-0 text-foreground"
    >
      <path
        d="M4 6.5 8 10l4-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronsUpDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 shrink-0 text-foreground/50"
    >
      <path
        d="M5 6 8 3l3 3M11 10l-3 3-3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 shrink-0 text-foreground"
    >
      <path
        d="M3.5 5.5h9M5 2.5v2M11 2.5v2M4 3.5h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

