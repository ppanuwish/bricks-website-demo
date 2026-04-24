import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu, ContextMenuSeparator } from "../components/ContextMenu";
import { ContextMenuItem } from "../components/ContextMenuItem";
import { ContextMenuItemLabel } from "../components/ContextMenuItemLabel";
import { ContextMenuItemSubTrigger } from "../components/ContextMenuItemSubTrigger";

const meta = {
  title: "Bricks/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="flex min-h-[480px] w-full items-start justify-center p-[var(--spacing-6)] font-body">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ContextMenu` (249:5013) — composed primitives with `level="2"` rows like the kit sheet. */
export const Playground: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuItem variant="default" level="2" state="disabled" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuItemSubTrigger level="2" state="default">
        SubTrigger Text
      </ContextMenuItemSubTrigger>
      <ContextMenuSeparator />
      <ContextMenuItemLabel>Title Text</ContextMenuItemLabel>
      <ContextMenuItem variant="radio" level="2" state="default" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
      <ContextMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
        Context Menu Text
      </ContextMenuItem>
    </ContextMenu>
  ),
};

/** Empty shell — drop in your own {@link ContextMenuItem} children. */
export const Empty: Story = {
  args: {
    children: (
      <p className="px-[var(--spacing-2)] py-[var(--spacing-3)] font-body text-sm text-muted-foreground">
        Add menu rows here.
      </p>
    ),
  },
};
