import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

/** Figma size set: 5→20px, 6→24px, 8→32px, 10→40px, 12→48px */
export type AvatarSize = "5" | "6" | "8" | "10" | "12";

type ImagePhase = "idle" | "pending" | "loaded" | "error";

type AvatarContextValue = {
  size: AvatarSize;
  imagePhase: ImagePhase;
  setImagePhase: (phase: ImagePhase) => void;
};

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error("AvatarImage and AvatarFallback must be used within Avatar");
  }
  return ctx;
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const sizeClass: Record<AvatarSize, string> = {
  "5": "h-5 w-5 min-h-5 min-w-5",
  "6": "h-6 w-6 min-h-6 min-w-6",
  "8": "h-8 w-8 min-h-8 min-w-8",
  "10": "h-10 w-10 min-h-10 min-w-10",
  "12": "h-12 w-12 min-h-12 min-w-12",
};

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  size?: AvatarSize;
};

export function Avatar({ size = "12", className, children, ...props }: AvatarProps) {
  const [imagePhase, setImagePhaseState] = useState<ImagePhase>("idle");
  const setImagePhase = useCallback((phase: ImagePhase) => {
    setImagePhaseState(phase);
  }, []);

  const value = useMemo(
    () => ({ size, imagePhase, setImagePhase }),
    [size, imagePhase, setImagePhase],
  );

  return (
    <AvatarContext.Provider value={value}>
      <div
        className={cx(
          "relative inline-flex shrink-0 overflow-clip rounded-full",
          sizeClass[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function AvatarImage({ src, alt = "", className, onLoad, onError, ...props }: AvatarImageProps) {
  const { setImagePhase } = useAvatarContext();
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (!src) {
      setBroken(false);
      setImagePhase("idle");
      return;
    }
    setBroken(false);
    setImagePhase("pending");
  }, [src, setImagePhase]);

  if (!src) {
    return null;
  }

  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-0 z-[2] rounded-full",
        broken && "hidden",
      )}
    >
      <div className="absolute inset-0 rounded-full bg-muted" aria-hidden />
      <img
        src={src}
        alt={alt}
        className={cx("absolute size-full max-w-none rounded-full object-cover", className)}
        onLoad={(e) => {
          setBroken(false);
          setImagePhase("loaded");
          onLoad?.(e);
        }}
        onError={(e) => {
          setBroken(true);
          setImagePhase("error");
          onError?.(e);
        }}
        {...props}
      />
    </div>
  );
}

export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  const { size, imagePhase } = useAvatarContext();
  const show = imagePhase !== "loaded";

  const label =
    size === "5"
      ? "font-body text-xs font-normal leading-4 text-foreground"
      : "font-body text-sm font-normal leading-5 text-foreground";

  return (
    <span
      aria-hidden={show ? undefined : true}
      className={cx(
        "absolute inset-0 z-[1] flex flex-col items-center justify-center rounded-full bg-muted text-center leading-[0] not-italic",
        !show && "pointer-events-none invisible",
        className,
      )}
      {...props}
    >
      <span className={cx("block w-full text-center", label)}>{children}</span>
    </span>
  );
}
