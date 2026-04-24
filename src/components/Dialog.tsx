import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

import { DialogCloseIcon, type DialogCloseIconProps } from "./DialogCloseIcon";

/** Figma `Dialog` (112:602) — component property `Breakpoint`. */
export type DialogBreakpoint = "lg" | "sm";

const DialogBreakpointContext = createContext<DialogBreakpoint>("lg");

function useDialogBreakpoint() {
  return useContext(DialogBreakpointContext);
}

/** Figma `shadow/lg` — same token stack as {@link Toast} / `theme.css` (`--shadow-lg-*`). */
const dialogElevation =
  "shadow-[var(--shadow-lg-1-offset-x)_var(--shadow-lg-1-offset-y)_var(--shadow-lg-1-blur-radius)_var(--shadow-lg-1-spread-radius)_var(--shadow-lg-1-color),var(--shadow-lg-2-offset-x)_var(--shadow-lg-2-offset-y)_var(--shadow-lg-2-blur-radius)_var(--shadow-lg-2-spread-radius)_var(--shadow-lg-2-color)]";

export function Dialog(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

export const DialogTrigger = forwardRef<
  ElementRef<typeof DialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(function DialogTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} {...props} />;
});
DialogTrigger.displayName = "DialogTrigger";

export function DialogPortal(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={twMerge(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:pointer-events-none dark:bg-black/70",
        className,
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  breakpoint?: DialogBreakpoint;
};

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ breakpoint = "lg", className, children, ...props }, ref) {
  return (
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(
        "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-[425px] -translate-x-1/2 -translate-y-1/2",
        "gap-[var(--spacing-4)] border border-border border-solid bg-background p-[var(--spacing-6)]",
        dialogElevation,
        "rounded-[var(--radius-lg)] outline-none",
        "relative",
        className,
      )}
      {...props}
    >
      <DialogBreakpointContext.Provider value={breakpoint}>{children}</DialogBreakpointContext.Provider>
    </DialogPrimitive.Content>
  );
});
DialogContent.displayName = "DialogContent";

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const breakpoint = useDialogBreakpoint();
  return (
    <div
      data-slot="dialog-header"
      className={twMerge(
        "flex w-full flex-col gap-[6px]",
        breakpoint === "sm" ? "items-center text-center" : "items-start",
        className,
      )}
      {...props}
    />
  );
}

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={twMerge(
        "w-full font-body text-[18px] font-semibold leading-none text-foreground",
        className,
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={twMerge(
        "w-full font-body text-[14px] font-normal leading-[20px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const breakpoint = useDialogBreakpoint();
  const isSm = breakpoint === "sm";
  return (
    <div
      data-slot="dialog-footer"
      className={twMerge(
        "flex w-full gap-[var(--spacing-2)]",
        isSm ? "flex-col items-stretch" : "flex-row items-center justify-end",
        className,
      )}
      {...props}
    />
  );
}

export type DialogCloseProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
  "asChild"
> &
  Pick<DialogCloseIconProps, "state">;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { className, state, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Close asChild {...props}>
      <DialogCloseIcon ref={ref} state={state} className={twMerge("absolute right-[15px] top-[15px]", className)} />
    </DialogPrimitive.Close>
  );
});
DialogClose.displayName = "DialogClose";
