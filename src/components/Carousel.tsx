import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { twMerge } from "tailwind-merge";

import { CarouselArrowButton } from "./CarouselArrowButton";

/** Figma `Carousel` (241:1368) — `Orientation`. */
export type CarouselOrientation = "horizontal" | "vertical";

/** Figma `Breakpoint` — `sm` | `md` | `lg` (visible columns / rows + shell sizing). */
export type CarouselBreakpoint = "sm" | "md" | "lg";

function slidesVisible(orientation: CarouselOrientation, breakpoint: CarouselBreakpoint): number {
  if (orientation === "vertical") return 2;
  if (breakpoint === "sm") return 1;
  if (breakpoint === "md") return 2;
  return 3;
}

function slideGapCss(orientation: CarouselOrientation, breakpoint: CarouselBreakpoint): string {
  if (orientation === "vertical") return "var(--spacing-1)";
  if (breakpoint === "sm") return "0px";
  return "var(--spacing-4)";
}

function trackShellClass(orientation: CarouselOrientation, breakpoint: CarouselBreakpoint): string {
  if (orientation === "vertical") {
    if (breakpoint === "md") return "h-[200px] w-full max-w-[320px]";
    return "w-full max-w-[320px]";
  }
  if (breakpoint === "md") return "h-[182px] w-full max-w-[384px]";
  if (breakpoint === "lg") return "w-full max-w-[384px]";
  return "h-[384px] w-full max-w-[384px]";
}

type CarouselContextValue = {
  orientation: CarouselOrientation;
  breakpoint: CarouselBreakpoint;
  viewportRef: RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(component: string): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Carousel>`);
  }
  return ctx;
}

const SCROLL_EPS = 2;

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: CarouselOrientation;
  breakpoint?: CarouselBreakpoint;
  children?: ReactNode;
};

/**
 * Carousel shell (Figma `Carousel`, node 241:1368 — shadcn-style composition).
 * Compose with `CarouselContent`, `CarouselSlide`, `CarouselPrevious`, `CarouselNext`.
 * Slides typically use `CarouselItem` inside each `CarouselSlide`.
 */
export function Carousel({
  orientation = "horizontal",
  breakpoint = "sm",
  className,
  children,
  ...props
}: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (orientation === "horizontal") {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollPrev(scrollLeft > SCROLL_EPS);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - SCROLL_EPS);
    } else {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setCanScrollPrev(scrollTop > SCROLL_EPS);
      setCanScrollNext(scrollTop + clientHeight < scrollHeight - SCROLL_EPS);
    }
  }, [orientation]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollPrev = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const delta = orientation === "horizontal" ? -el.clientWidth : -el.clientHeight;
    if (orientation === "horizontal") el.scrollBy({ left: delta, behavior: "smooth" });
    else el.scrollBy({ top: delta, behavior: "smooth" });
  }, [orientation]);

  const scrollNext = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const delta = orientation === "horizontal" ? el.clientWidth : el.clientHeight;
    if (orientation === "horizontal") el.scrollBy({ left: delta, behavior: "smooth" });
    else el.scrollBy({ top: delta, behavior: "smooth" });
  }, [orientation]);

  const value = useMemo<CarouselContextValue>(
    () => ({
      orientation,
      breakpoint,
      viewportRef,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [orientation, breakpoint, scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  );

  const shellPad =
    orientation === "horizontal"
      ? "px-[calc(2*var(--spacing-6))]"
      : "py-[calc(2*var(--spacing-6))]";

  return (
    <CarouselContext.Provider value={value}>
      <div
        data-slot="carousel"
        className={twMerge(
          "relative box-border flex items-center justify-center gap-[var(--spacing-4)]",
          shellPad,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export type CarouselContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Viewport + track: Figma `CarouselItems Wrapper` / inner flex + `gap` tokens. */
export function CarouselContent({ className, children, style, ...props }: CarouselContentProps) {
  const { orientation, breakpoint, viewportRef } = useCarouselContext("CarouselContent");
  const n = slidesVisible(orientation, breakpoint);
  const gapCount = Math.max(0, n - 1);

  const flexDir = orientation === "horizontal" ? "flex-row" : "flex-col";
  const overflow = orientation === "horizontal" ? "overflow-x-auto overflow-y-hidden" : "overflow-y-auto overflow-x-hidden";
  const snap = orientation === "horizontal" ? "snap-x snap-mandatory" : "snap-y snap-mandatory";

  const gapClass =
    orientation === "vertical"
      ? "gap-[var(--spacing-1)]"
      : breakpoint === "sm"
        ? "gap-0"
        : "gap-[var(--spacing-4)]";

  const cssVars: CSSProperties = {
    ["--carousel-visible" as string]: String(n),
    ["--carousel-gap-count" as string]: String(gapCount),
  };

  return (
    <div
      ref={viewportRef}
      data-slot="carousel-content"
      className={twMerge(
        "relative min-h-0 min-w-0 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        overflow,
        snap,
        trackShellClass(orientation, breakpoint),
        className,
      )}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      <div
        className={twMerge(
          "flex min-h-min min-w-min content-stretch",
          flexDir,
          gapClass,
          orientation === "horizontal" ? "h-full items-stretch" : "w-full items-stretch",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export type CarouselSlideProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Figma `CarouselItem Padding` — `p-[var(--spacing-1)]` around each slide. */
export function CarouselSlide({ className, style, children, ...props }: CarouselSlideProps) {
  const { orientation, breakpoint } = useCarouselContext("CarouselSlide");
  const n = slidesVisible(orientation, breakpoint);
  const gap = slideGapCss(orientation, breakpoint);
  const gapCount = Math.max(0, n - 1);

  const flexBasis =
    n <= 1
      ? "100%"
      : `calc((100% - (${gapCount} * ${gap})) / ${n})`;

  const flexStyle: CSSProperties =
    orientation === "horizontal"
      ? { flex: `0 0 ${flexBasis}`, minWidth: 0 }
      : { flex: `0 0 ${flexBasis}`, minHeight: 0, width: "100%" };

  return (
    <div
      data-slot="carousel-slide"
      className={twMerge(
        "box-border shrink-0 snap-start p-[var(--spacing-1)]",
        orientation === "horizontal" ? "h-full" : "min-h-0",
        className,
      )}
      style={{ ...flexStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselArrowSlotProps = HTMLAttributes<HTMLButtonElement>;

/** Previous control — `CarouselArrowButton` + Figma absolute placement. */
export function CarouselPrevious({ className, ...props }: CarouselArrowSlotProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarouselContext("CarouselPrevious");

  const position =
    orientation === "horizontal"
      ? "-translate-y-1/2 top-1/2 left-[calc(-2*var(--spacing-6))]"
      : "-translate-x-1/2 left-1/2 top-[calc(-2*var(--spacing-6))]";

  return (
    <CarouselArrowButton
      type="button"
      variant="previous"
      orientation={orientation}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={twMerge("absolute z-10", position, className)}
      {...props}
    />
  );
}

/** Next control — `CarouselArrowButton` + Figma absolute placement. */
export function CarouselNext({ className, ...props }: CarouselArrowSlotProps) {
  const { orientation, scrollNext, canScrollNext } = useCarouselContext("CarouselNext");

  const position =
    orientation === "horizontal"
      ? "-translate-y-1/2 top-1/2 right-[calc(-2*var(--spacing-6))]"
      : "-translate-x-1/2 bottom-[calc(-2*var(--spacing-6))] left-1/2";

  return (
    <CarouselArrowButton
      type="button"
      variant="next"
      orientation={orientation}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={twMerge("absolute z-10", position, className)}
      {...props}
    />
  );
}
