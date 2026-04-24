import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuItemSubTrigger } from "../components/DropdownMenuItemSubTrigger";

const meta = {
  title: "Bricks/DropdownMenuItemSubTrigger",
  component: DropdownMenuItemSubTrigger,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "SubTrigger Text",
    state: "default",
    level: "1",
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
} satisfies Meta<typeof DropdownMenuItemSubTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Level=1`, `State=Default` (330:24001). */
export const DefaultLevel1: Story = {
  args: { level: "1", state: "default" },
};

/** Figma pinned hover (330:24000). */
export const HoverLevel1: Story = {
  args: { level: "1", state: "hover" },
};

export const DisabledLevel1: Story = {
  args: { level: "1", state: "disabled" },
};

/** Wide left inset — aligns with {@link DropdownMenuItem} `level="2"`. */
export const DefaultLevel2: Story = {
  args: { level: "2", state: "default" },
};

export const HoverLevel2: Story = {
  args: { level: "2", state: "hover" },
};

/** Two rows like Figma component set: default vs hover (`Level=1`). */
export const FigmaPair: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-2)]">
      <DropdownMenuItemSubTrigger level="1" state="default">
        SubTrigger Text
      </DropdownMenuItemSubTrigger>
      <DropdownMenuItemSubTrigger level="1" state="hover">
        SubTrigger Text
      </DropdownMenuItemSubTrigger>
    </div>
  ),
};

/** `Level=1` vs `Level=2` for padding alignment. */
export const LevelComparison: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-3)]">
      <p className="font-body text-xs font-medium text-muted-foreground">Level 1</p>
      <DropdownMenuItemSubTrigger level="1" state="default">
        SubTrigger Text
      </DropdownMenuItemSubTrigger>
      <p className="font-body text-xs font-medium text-muted-foreground">Level 2</p>
      <DropdownMenuItemSubTrigger level="2" state="default">
        SubTrigger Text
      </DropdownMenuItemSubTrigger>
    </div>
  ),
};
