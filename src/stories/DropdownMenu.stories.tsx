import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu, DropdownMenuSeparator } from "../components/DropdownMenu";
import { DropdownMenuItem } from "../components/DropdownMenuItem";
import { DropdownMenuItemLabel } from "../components/DropdownMenuItemLabel";
import { DropdownMenuItemSubTrigger } from "../components/DropdownMenuItemSubTrigger";

const meta = {
  title: "Bricks/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="flex min-h-[480px] w-full items-start justify-center p-[var(--spacing-6)] font-body">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuItemLabel>Label Text</DropdownMenuItemLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItemSubTrigger>SubTrigger Text</DropdownMenuItemSubTrigger>
      <DropdownMenuSeparator />
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

/**
 * Figma `DropdownMenu / Menu` (105:55): label, separator, items + shortcut, sub-trigger, separator, items.
 */
export const FigmaExample: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuItemLabel>Label Text</DropdownMenuItemLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItemSubTrigger>SubTrigger Text</DropdownMenuItemSubTrigger>
      <DropdownMenuSeparator />
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
      <DropdownMenuItem showShortcut shortcut="⇧⌘P">
        Dropdown Menu Item Text
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};
