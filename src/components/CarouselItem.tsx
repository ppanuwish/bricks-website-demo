import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { AspectRatio, type AspectRatioRatio } from "./AspectRatio";

/** Figma Carousel / CarouselItem (239:1214) — `shadow/xs` from `theme.css` (`--shadow-xs-*` @theme). */
const carouselItemShadowXs =
  "shadow-[var(--shadow-xs-offset-x)_var(--shadow-xs-offset-y)_var(--shadow-xs-blur-radius)_var(--shadow-xs-spread-radius)_var(--shadow-xs-color)]";

export type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Preset for inner `AspectRatio` (Figma `Aspect Ratio` 28:1540 — property `ratio`).
   * Default `1:1` matches the published kit frame.
   */
  ratio?: AspectRatioRatio;
  /** Merged into the inner `AspectRatio` root `className`. */
  aspectRatioClassName?: string;
  children?: ReactNode;
};

/**
 * Single slide surface: card fill, border, Figma `shadow/xs`, max width 312px, media in `AspectRatio`.
 */
export function CarouselItem({
  ratio = "1:1",
  className,
  aspectRatioClassName,
  children,
  ...props
}: CarouselItemProps) {
  return (
    <div
      data-slot="carousel-item"
      className={twMerge(
        "relative box-border flex w-full max-w-[312px] flex-col content-stretch items-center justify-center overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
        carouselItemShadowXs,
        className,
      )}
      {...props}
    >
      <AspectRatio
        ratio={ratio}
        className={twMerge(
          "w-full shrink-0 rounded-none bg-transparent",
          aspectRatioClassName,
        )}
      >
        {children}
      </AspectRatio>
    </div>
  );
}
