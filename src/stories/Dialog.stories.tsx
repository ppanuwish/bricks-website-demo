import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";

const kitSlotPlaceholder =
  "flex min-h-[72px] w-full flex-col items-center justify-center border border-dashed border-[rgba(168,85,247,0.5)] bg-[rgba(168,85,247,0.1)] p-[var(--spacing-6)] text-center font-body text-[14px] leading-[20px] text-foreground";

const meta = {
  title: "Bricks/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function KitDialogBody({
  breakpoint,
  defaultOpen = false,
}: {
  breakpoint: "lg" | "sm";
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Open dialog
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent breakpoint={breakpoint}>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>This is a dialog description.</DialogDescription>
          </DialogHeader>
          <div className={kitSlotPlaceholder}>Slot (swap it with your content)</div>
          <DialogFooter>
            {breakpoint === "lg" ? (
              <>
                <Button variant="outline" type="button" className="h-9 px-[var(--spacing-4)] py-[var(--spacing-2)] text-[14px] leading-[20px]" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" className="h-9 px-[var(--spacing-4)] py-[var(--spacing-2)] text-[14px] leading-[20px]" onClick={() => setOpen(false)}>
                  Save changes
                </Button>
              </>
            ) : (
              <>
                <Button fullWidth type="button" className="h-9 px-[var(--spacing-4)] py-[var(--spacing-2)] text-[14px] leading-[20px]" onClick={() => setOpen(false)}>
                  Save changes
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  type="button"
                  className="h-9 border-input bg-[var(--color-outline-surface)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-[14px] leading-[20px]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export const BreakpointLarge: Story = {
  render: () => (
    <div className="p-[var(--spacing-6)] font-body">
      <KitDialogBody breakpoint="lg" />
    </div>
  ),
};

export const BreakpointSmall: Story = {
  render: () => (
    <div className="p-[var(--spacing-6)] font-body">
      <KitDialogBody breakpoint="sm" />
    </div>
  ),
};

/** Opens on load for visual / layout checks (Figma node 112:602). */
export const OpenLarge: Story = {
  render: () => (
    <div className="p-[var(--spacing-6)] font-body">
      <KitDialogBody breakpoint="lg" defaultOpen />
    </div>
  ),
};

export const OpenSmall: Story = {
  render: () => (
    <div className="p-[var(--spacing-6)] font-body">
      <KitDialogBody breakpoint="sm" defaultOpen />
    </div>
  ),
};
