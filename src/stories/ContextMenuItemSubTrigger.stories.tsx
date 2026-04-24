import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenuItemSubTrigger } from "../components/ContextMenuItemSubTrigger";

const meta = {
  title: "Bricks/ContextMenuItemSubTrigger",
  component: ContextMenuItemSubTrigger,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "SubTrigger Text",
    state: "default",
    level: "2",
    disabled: false,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
    },
    level: {
      control: "inline-radio",
      options: ["1", "2"],
    },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-md border border-border bg-popover p-[var(--spacing-2)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenuItemSubTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Level=2`, `State=Default` (419:4534). */
export const DefaultLevel2: Story = {
  args: { level: "2", state: "default" },
};

/** Figma hover / accent row (419:4534). */
export const HoverLevel2: Story = {
  args: { level: "2", state: "hover" },
};

export const DisabledLevel2: Story = {
  args: { level: "2", state: "disabled" },
};

/** Short padding — aligns with {@link ContextMenuItem} `level="1"`. */
export const DefaultLevel1: Story = {
  args: { level: "1", state: "default" },
};

export const HoverLevel1: Story = {
  args: { level: "1", state: "hover" },
};

/** Figma component set: default vs hover (`Level=2`). */
export const FigmaPair: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-2)]">
      <ContextMenuItemSubTrigger level="2" state="default">
        SubTrigger Text
      </ContextMenuItemSubTrigger>
      <ContextMenuItemSubTrigger level="2" state="hover">
        SubTrigger Text
      </ContextMenuItemSubTrigger>
    </div>
  ),
};

/** `Level=1` vs `Level=2` side by side for alignment checks. */
export const LevelComparison: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-3)]">
      <p className="font-body text-xs font-medium text-muted-foreground">Level 1 (short padding)</p>
      <ContextMenuItemSubTrigger level="1" state="default">
        SubTrigger Text
      </ContextMenuItemSubTrigger>
      <p className="font-body text-xs font-medium text-muted-foreground">Level 2 (Figma inset)</p>
      <ContextMenuItemSubTrigger level="2" state="default">
        SubTrigger Text
      </ContextMenuItemSubTrigger>
    </div>
  ),
};
