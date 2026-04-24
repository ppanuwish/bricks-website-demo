import type { CSSProperties, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

/** Figma `Aspect Ratio` (28:1540) — preset ratios as component variants. */
export type AspectRatioRatio =
  | "1:1"
  | "4:3"
  | "3:4"
  | "5:4"
  | "4:5"
  | "3:2"
  | "2:3"
  | "16:10"
  | "10:16"
  | "16:9"
  | "9:16"
  | "2:1"
  | "1:2"
  | "1.618:1"
  | "1:1.618"
  | "21:9"
  | "9:21";

/** CSS `aspect-ratio` values (width / height), aligned with Figma variant names. */
const ratioToCss: Record<AspectRatioRatio, string> = {
  "1:1": "1",
  "4:3": "4 / 3",
  "3:4": "3 / 4",
  "5:4": "5 / 4",
  "4:5": "4 / 5",
  "3:2": "3 / 2",
  "2:3": "2 / 3",
  "16:10": "16 / 10",
  "10:16": "10 / 16",
  "16:9": "16 / 9",
  "9:16": "9 / 16",
  "2:1": "2 / 1",
  "1:2": "1 / 2",
  "1.618:1": "1.618 / 1",
  "1:1.618": "1 / 1.618",
  "21:9": "21 / 9",
  "9:21": "9 / 21",
};

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  /** Preset width:height ratio (Figma component property `ratio`). */
  ratio?: AspectRatioRatio;
};

/**
 * Locks child media to a preset aspect ratio (Figma 28:1540, shadcn-style layout).
 * Uses theme radius on the clip surface; pass media as children (`img` / `video` fill and `object-cover` via slot).
 */
export function AspectRatio({
  ratio = "1:1",
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  const mergedStyle: CSSProperties = {
    aspectRatio: ratioToCss[ratio],
    ...style,
  };

  return (
    <div
      data-slot="aspect-ratio"
      className={twMerge(
        "relative isolate w-full overflow-hidden rounded-lg bg-muted",
        className,
      )}
      style={mergedStyle}
      {...props}
    >
      <div className="absolute inset-0 min-h-0 min-w-0 [&_img]:size-full [&_img]:object-cover [&_video]:size-full [&_video]:object-cover">
        {children}
      </div>
    </div>
  );
}
