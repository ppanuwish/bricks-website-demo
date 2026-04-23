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
    disabled: false,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
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

/** Figma `State=Default` (330:24001). */
export const Default: Story = {
  args: { state: "default" },
};

/** Figma `State` with accent surface — pinned hover / open row (330:24000). */
export const Hover: Story = {
  args: { state: "hover" },
};

export const Disabled: Story = {
  args: { state: "disabled" },
};

/** Two rows like Figma component set: default vs hover. */
export const FigmaPair: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-2)]">
      <DropdownMenuItemSubTrigger state="default">SubTrigger Text</DropdownMenuItemSubTrigger>
      <DropdownMenuItemSubTrigger state="hover">SubTrigger Text</DropdownMenuItemSubTrigger>
    </div>
  ),
};
