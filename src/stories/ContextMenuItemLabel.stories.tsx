import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenuItem } from "../components/ContextMenuItem";
import { ContextMenuItemLabel } from "../components/ContextMenuItemLabel";

const meta = {
  title: "Bricks/ContextMenuItemLabel",
  component: ContextMenuItemLabel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Title Text",
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-md border border-border bg-popover p-[var(--spacing-2)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenuItemLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `ContextMenu / Item / Title` (419:4517). */
export const Default: Story = {
  args: { children: "Title Text" },
};

/** Title above {@link ContextMenuItem} rows (`level="2"`) to verify text alignment. */
export const WithMenuItems: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-1)]">
      <ContextMenuItemLabel>Title Text</ContextMenuItemLabel>
      <ContextMenuItem variant="default" level="2" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuItem variant="checkbox" level="2" state="default">
        Checkbox row
      </ContextMenuItem>
    </div>
  ),
};
