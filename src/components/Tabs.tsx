import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import {
  TabsTrigger as TabsTriggerPrimitive,
  type TabsTriggerProps as TabsTriggerPrimitiveProps,
} from "./TabsTrigger";

type TabsContextValue = {
  value: string;
  onValueChange: (next: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("TabsList and TabsTrigger must be used within <Tabs>");
  }
  return ctx;
}

export type TabsProps = {
  /** Controlled selected tab id. */
  value?: string;
  /** Uncontrolled initial tab id. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
};

/**
 * Tab selection root (shadcn-style). Pairs with {@link TabsList} and {@link TabsTrigger}.
 * Figma: **Tabs** (node `183:539`) — [docs](https://ui.shadcn.com/docs/components/tabs).
 */
export function Tabs({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  className,
  children,
}: TabsProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? String(valueProp ?? "") : uncontrolled;

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const contextValue: TabsContextValue = {
    value,
    onValueChange: setValue,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={twMerge("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = {
  className?: string;
  children: ReactNode;
  /** Passed to `role="tablist"` for a11y. */
  "aria-label"?: string;
};

/**
 * Muted track that holds triggers. Matches Figma: `bg-muted`, `h-9`, `p-[3px]`, horizontal flex.
 */
export function TabsList({ className, children, "aria-label": ariaLabel }: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={twMerge(
        "flex h-9 w-full cursor-pointer items-stretch gap-0 rounded-[var(--border-radius-rounded-md)] bg-muted p-[3px] text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type TabsTriggerItemProps = Omit<TabsTriggerPrimitiveProps, "active"> & {
  /** Id matching `Tabs` `value` / `defaultValue`. */
  value: string;
};

/**
 * Tab trigger wired to {@link Tabs} selection. Renders {@link TabsTrigger} (primitive) with `active` derived from context.
 */
export function TabsTrigger({
  value,
  className,
  onClick,
  ...props
}: TabsTriggerItemProps) {
  const { value: selected, onValueChange } = useTabsContext();
  const active = selected === value;

  return (
    <TabsTriggerPrimitive
      active={active}
      className={twMerge("h-full min-h-0 min-w-0 flex-1 shrink", className)}
      onClick={(e) => {
        onClick?.(e);
        onValueChange(value);
      }}
      {...props}
    />
  );
}
