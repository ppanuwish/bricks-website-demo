import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type AccordionItemVariant = "minimal" | "filled";

type AccordionContextValue = {
  type: "single" | "multiple";
  collapsible: boolean;
  isOpen: (itemValue: string) => boolean;
  toggleItem: (itemValue: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}

type ItemContextValue = {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
  toggle: () => void;
};

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext(component: string) {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}

function joinClasses(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  className?: string;
  children: ReactNode;
};

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const [internal, setInternal] = useState<string | string[] | undefined>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return type === "multiple" ? [] : undefined;
  });

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const setValue = useCallback(
    (next: string | string[] | undefined) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const isOpen = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        return value === itemValue;
      }
      const list = Array.isArray(value) ? value : [];
      return list.includes(itemValue);
    },
    [type, value]
  );

  const toggleItem = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const open = value === itemValue;
        if (open) {
          if (collapsible) setValue(undefined);
        } else {
          setValue(itemValue);
        }
        return;
      }

      const list = Array.isArray(value) ? [...value] : [];
      const idx = list.indexOf(itemValue);
      if (idx >= 0) list.splice(idx, 1);
      else list.push(itemValue);
      setValue(list);
    },
    [type, value, collapsible, setValue]
  );

  const ctx = useMemo(
    () => ({ type, collapsible, isOpen, toggleItem }),
    [type, collapsible, isOpen, toggleItem]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={joinClasses("flex w-full flex-col", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  variant?: AccordionItemVariant;
  children: ReactNode;
};

export function AccordionItem({
  value,
  variant = "minimal",
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { isOpen, toggleItem } = useAccordionContext("AccordionItem");
  const open = isOpen(value);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const toggle = useCallback(() => {
    toggleItem(value);
  }, [toggleItem, value]);

  const itemCtx = useMemo(
    () => ({ value, open, triggerId, contentId, toggle }),
    [value, open, triggerId, contentId, toggle]
  );

  /* Padding: var(--spacing-4, 16px) on all sides; expanded gap spacing/2. */
  const variantClasses =
    variant === "filled"
      ? "bg-muted p-[var(--spacing-4,16px)] transition-colors hover:bg-accent"
      : "bg-transparent p-[var(--spacing-4,16px)] transition-colors hover:bg-accent";

  return (
    <ItemContext.Provider value={itemCtx}>
      <div
        data-state={open ? "open" : "closed"}
        data-variant={variant}
        className={joinClasses(
          "flex w-full min-w-0 flex-col border-b border-border",
          open ? "gap-[var(--spacing-2,8px)]" : "gap-0",
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const { open, triggerId, contentId, toggle } = useItemContext("AccordionTrigger");

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      data-state={open ? "open" : "closed"}
      className={joinClasses(
        /* Figma: trigger row has no extra py; vertical inset is from AccordionItem padding */
        "flex w-full cursor-pointer appearance-none items-center justify-between border-0 bg-transparent px-0 py-0 text-left font-body outline-none",
        "text-[14px] font-medium leading-[20px] text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1">{children}</span>
      <span
        className={joinClasses(
          "flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200 ease-out",
          open && "rotate-180"
        )}
      >
        <ChevronDown className="size-4" />
      </span>
    </button>
  );
}

type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { open, triggerId, contentId } = useItemContext("AccordionContent");

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={joinClasses(
        "grid min-h-0 transition-[grid-template-rows] duration-200 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={joinClasses(
            "m-0 w-full p-0 font-body text-[14px] font-normal leading-[20px] text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
