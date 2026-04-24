import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefCallback,
  type RefObject,
} from "react";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as { current: T | null }).current = node;
    }
  };
}

import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Figma **Tooltip** `Side` — arrow points toward the anchor (shadcn `side`). */
export type TooltipSide = "top" | "right" | "bottom" | "left";

type TooltipContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentId: string;
  delayDuration: number;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(component: string) {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tooltip>`);
  }
  return ctx;
}

export type TooltipProps = {
  children: ReactNode;
  /** Uncontrolled initial visibility. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Show delay (ms) after pointer/focus enter — aligns with shadcn default feel.
   * @default 300
   */
  delayDuration?: number;
};

/**
 * Root that holds tooltip open state. Compose with {@link TooltipTrigger} and {@link TooltipContent}.
 *
 * Figma: **Tooltip** (node `17103:809`) — [docs](https://ui.shadcn.com/docs/components/tooltip).
 */
export function Tooltip({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  delayDuration = 300,
}: TooltipProps) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const value = useMemo<TooltipContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentId,
      delayDuration,
    }),
    [open, setOpen, contentId, delayDuration],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export type TooltipTriggerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /**
   * Merge props/ref onto the child element (e.g. {@link Button}) instead of wrapping a span.
   * @default false
   */
  asChild?: boolean;
};

/**
 * Anchor that opens the tooltip on hover or keyboard focus.
 */
export function TooltipTrigger({
  asChild = false,
  children,
  className,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}: TooltipTriggerProps) {
  const { open, setOpen, triggerRef, contentId, delayDuration } = useTooltipContext("TooltipTrigger");
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearShow = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
  };

  const clearHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleShow = () => {
    clearHide();
    clearShow();
    showTimer.current = setTimeout(() => setOpen(true), delayDuration);
  };

  const scheduleHide = () => {
    clearShow();
    clearHide();
    hideTimer.current = setTimeout(() => setOpen(false), 0);
  };

  useEffect(() => {
    return () => {
      clearShow();
      clearHide();
    };
  }, []);

  const handlers = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      onPointerEnter?.(e);
      if (e.defaultPrevented) return;
      scheduleShow();
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      onPointerLeave?.(e);
      if (e.defaultPrevented) return;
      scheduleHide();
    },
    onFocus: (e: FocusEvent<HTMLElement>) => {
      onFocus?.(e);
      if (e.defaultPrevented) return;
      clearHide();
      clearShow();
      setOpen(true);
    },
    onBlur: (e: FocusEvent<HTMLElement>) => {
      onBlur?.(e);
      if (e.defaultPrevented) return;
      scheduleHide();
    },
    onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === "Escape") setOpen(false);
    },
  };

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error("TooltipTrigger with `asChild` expects a single React element child.");
    }
    const child = children as ReactElement<
      HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }
    >;
    /* eslint-disable react-hooks/refs -- `mergeRefs` assigns on commit only (shadcn `asChild`). */
    return cloneElement(child, {
      ...rest,
      ref: mergeRefs(child.props.ref, triggerRef),
      className: twMerge(className, child.props.className),
      "aria-describedby": open ? contentId : undefined,
      ...handlers,
      onPointerEnter: (e: PointerEvent<HTMLElement>) => {
        child.props.onPointerEnter?.(e);
        handlers.onPointerEnter(e);
      },
      onPointerLeave: (e: PointerEvent<HTMLElement>) => {
        child.props.onPointerLeave?.(e);
        handlers.onPointerLeave(e);
      },
      onFocus: (e: FocusEvent<HTMLElement>) => {
        child.props.onFocus?.(e);
        handlers.onFocus(e);
      },
      onBlur: (e: FocusEvent<HTMLElement>) => {
        child.props.onBlur?.(e);
        handlers.onBlur(e);
      },
      onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => {
        child.props.onKeyDown?.(e);
        handlers.onKeyDown(e);
      },
    });
    /* eslint-enable react-hooks/refs */
  }

  return (
    <span
      ref={triggerRef}
      className={twMerge("inline-flex", className)}
      aria-describedby={open ? contentId : undefined}
      {...rest}
      {...handlers}
    >
      {children}
    </span>
  );
}

const arrowOuter = "pointer-events-none absolute flex size-[14px] items-center justify-center";

function tooltipArrowPosition(side: TooltipSide) {
  switch (side) {
    case "top":
      return "-bottom-[7px] left-1/2 -translate-x-1/2";
    case "bottom":
      return "-top-[7px] left-1/2 -translate-x-1/2";
    case "left":
      return "-right-[7px] top-1/2 -translate-y-1/2";
    case "right":
      return "-left-[7px] top-1/2 -translate-y-1/2";
    default:
      return "";
  }
}

function TooltipArrow({ side }: { side: TooltipSide }) {
  return (
    <div className={cx(arrowOuter, tooltipArrowPosition(side))} aria-hidden>
      <div className="size-[10px] rotate-45 bg-primary" />
    </div>
  );
}

export type TooltipBubbleProps = HTMLAttributes<HTMLDivElement> & {
  /** Arrow / pointer edge — matches Figma `Side`. */
  side?: TooltipSide;
  children: ReactNode;
};

/**
 * Static tooltip surface (Figma **Tooltip** body + arrow). Used by {@link TooltipContent} and Storybook matrices.
 */
export function TooltipBubble({
  side = "top",
  children,
  className,
  ...rest
}: TooltipBubbleProps) {
  return (
    <div
      data-slot="tooltip-bubble"
      className={twMerge(
        "relative box-border flex max-w-96 min-w-0 items-center justify-center",
        "bg-primary px-[var(--spacing-3)] py-1.5",
        "rounded-[length:var(--radius-md)]",
        "text-left font-sans text-xs font-normal leading-4 text-primary-foreground",
        className,
      )}
      {...rest}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <TooltipArrow side={side} />
    </div>
  );
}

const GAP = 8;

export type TooltipContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: TooltipSide;
  /** Extra gap between anchor and bubble (px). @default 0 (Figma uses ~8px visually; {@link GAP} is applied). */
  sideOffset?: number;
  /** When true, skip portal — useful for static Storybook layouts. @default false */
  disablePortal?: boolean;
};

/**
 * Tooltip label + arrow. Portals to `document.body` and positions from the trigger rect unless `disablePortal`.
 */
export function TooltipContent({
  side = "top",
  sideOffset = 0,
  disablePortal = false,
  className,
  children,
  style,
  ...rest
}: TooltipContentProps) {
  const { open, setOpen, triggerRef, contentId } = useTooltipContext("TooltipContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const el = contentRef.current;
    if (!trigger || !el) return;

    const rect = trigger.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const gap = GAP + sideOffset;

    let top = 0;
    let left = 0;

    switch (side) {
      case "top":
        top = rect.top - h - gap;
        left = rect.left + rect.width / 2 - w / 2;
        break;
      case "bottom":
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - w / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - h / 2;
        left = rect.left - w - gap;
        break;
      case "right":
        top = rect.top + rect.height / 2 - h / 2;
        left = rect.right + gap;
        break;
      default:
        break;
    }

    const pad = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    left = Math.min(Math.max(left, pad), vw - w - pad);
    top = Math.min(Math.max(top, pad), vh - h - pad);

    setCoords({ top, left });
  }, [side, sideOffset, triggerRef]);

  useLayoutEffect(() => {
    if (!open || disablePortal) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, disablePortal, updatePosition]);

  useEffect(() => {
    if (!open || disablePortal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, disablePortal, setOpen]);

  if (!open) return null;

  const bubble = (
    <div
      ref={contentRef}
      id={contentId}
      role="tooltip"
      data-slot="tooltip-content"
      className={twMerge("z-50 w-max max-w-96", !disablePortal && "fixed", className)}
      style={{
        ...style,
        ...(disablePortal ? {} : { top: coords.top, left: coords.left }),
      }}
      {...rest}
    >
      <TooltipBubble side={side}>{children}</TooltipBubble>
    </div>
  );

  if (disablePortal) {
    return bubble;
  }

  return createPortal(bubble, document.body);
}
