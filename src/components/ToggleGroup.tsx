import { createContext, useContext, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Toggle, type ToggleProps, type ToggleSize, type ToggleState, type ToggleVariant } from "./Toggle";

type ToggleGroupContextValue = {
  isPressed: (itemValue: string) => boolean;
  onItemChange: (itemValue: string, nextPressed: boolean) => void;
  variant: ToggleVariant;
  size: ToggleSize;
  disabled: boolean;
};

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroup() {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) {
    throw new Error("ToggleGroupItem must be used within ToggleGroup");
  }
  return ctx;
}

export type ToggleGroupOrientation = "horizontal" | "vertical";

type ToggleGroupBase = {
  /** Figma: `Variant=Default, Size=Default, State=Default` (node 132:946) — layout tokens. */
  className?: string;
  "aria-label"?: string;
  /**
   * Figma: `gap: var(--spacing-1)`.
   * - `default` = horizontal row with wrap (Figma 132:946)
   * - `vertical` = single column, same gap
   */
  orientation?: ToggleGroupOrientation;
  /** Passed to items unless overridden on `ToggleGroupItem`. */
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children: ReactNode;
};

type ToggleGroupSingle = ToggleGroupBase & {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** If true, the selected item can be unpressed in single mode (shadcn-style). */
  unselectable?: boolean;
};

type ToggleGroupMultiple = ToggleGroupBase & {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ToggleGroupProps = ToggleGroupSingle | ToggleGroupMultiple;

const EMPTY: string[] = [];

/**
 * A container for `Toggle` controls with shared `variant` / `size` and coordinated selection
 * (Figma `Toggle Group` 132:946, [shadcn toggle group](https://ui.shadcn.com/docs/components/toggle-group)).
 */
export function ToggleGroup({
  className,
  "aria-label": ariaLabel,
  children,
  orientation = "horizontal",
  variant = "default",
  size = "default",
  disabled: disabledProp = false,
  type = "single",
  unselectable: unselectableProp = true,
  ...rest
}: ToggleGroupProps) {
  const disabled = Boolean(disabledProp);
  const isSingle = type === "single";
  const unselectable = Boolean(isSingle && (unselectableProp ?? true));

  const asSingle = rest as ToggleGroupSingle;
  const asMulti = rest as ToggleGroupMultiple;

  const isControlledSingle = isSingle && asSingle.value !== undefined;
  const isControlledMulti = !isSingle && asMulti.value !== undefined;

  const [singleU, setSingleU] = useState(() => (isSingle && asSingle.defaultValue != null ? String(asSingle.defaultValue) : ""));

  const [multiU, setMultiU] = useState(() => (!isSingle && asMulti.defaultValue ? [...asMulti.defaultValue] : []));

  const currentSingle = isSingle
    ? (isControlledSingle
        ? asSingle.value != null
          ? String(asSingle.value)
          : ""
        : singleU)
    : "";
  const currentMulti: string[] = isSingle
    ? EMPTY
    : isControlledMulti
      ? asMulti.value != null
        ? [...asMulti.value]
        : []
      : multiU;

  const isPressed = (itemValue: string) => (isSingle ? String(currentSingle) === String(itemValue) : currentMulti.includes(itemValue));

  const onItemChange = (itemValue: string, nextPressed: boolean) => {
    if (disabled) return;
    if (isSingle) {
      if (isControlledSingle) {
        if (nextPressed) asSingle.onValueChange?.(itemValue);
        else if (unselectable && String(currentSingle) === String(itemValue)) {
          asSingle.onValueChange?.("");
        }
        return;
      }
      if (nextPressed) {
        setSingleU(itemValue);
        asSingle.onValueChange?.(itemValue);
      } else if (unselectable && String(singleU) === String(itemValue)) {
        setSingleU("");
        asSingle.onValueChange?.("");
      }
    } else {
      const next = new Set([...currentMulti]);
      if (nextPressed) next.add(itemValue);
      else next.delete(itemValue);
      const out = Array.from(next);
      if (!isControlledMulti) setMultiU(out);
      asMulti.onValueChange?.(out);
    }
  };

  const contextValue: ToggleGroupContextValue = {
    isPressed,
    onItemChange,
    variant,
    size,
    disabled,
  };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        role="group"
        aria-label={ariaLabel}
        className={twMerge(
          orientation === "vertical"
            ? "flex w-full min-w-0 flex-col content-center items-center gap-[var(--spacing-1)]"
            : "relative flex w-full min-w-0 flex-wrap content-center items-center justify-center gap-[var(--spacing-1)]",
          className
        )}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export type ToggleGroupItemProps = Omit<ToggleProps, "pressed" | "onPressedChange" | "defaultPressed"> & {
  value: string;
};

/**
 * One `Toggle` in a group; `value` identifies the item. Selection is driven by the parent
 * `ToggleGroup` (single- or multiple-selection).
 */
export function ToggleGroupItem({ value: itemValue, className, variant, size, state, disabled, ...itemProps }: ToggleGroupItemProps) {
  const { isPressed, onItemChange, variant: gVariant, size: gSize, disabled: groupDisabled } = useToggleGroup();
  const pressed = isPressed(itemValue);
  return (
    <Toggle
      {...itemProps}
      className={className}
      variant={variant ?? gVariant}
      size={size ?? gSize}
      state={state as ToggleState | undefined}
      disabled={Boolean(groupDisabled) || Boolean(disabled)}
      pressed={pressed}
      onPressedChange={(next) => {
        onItemChange(itemValue, next);
      }}
    />
  );
}
