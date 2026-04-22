import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectMenuItem } from "../components/SelectMenuItem";

const meta = {
  title: "Bricks/SelectMenuItem",
  component: SelectMenuItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Select Item",
    type: "simple",
    variant: "default",
    state: "default",
  },
  argTypes: {
    type: { control: "select", options: ["simple", "icon"] },
    variant: { control: "select", options: ["default", "checkbox"] },
    state: { control: "select", options: ["default", "hover"] },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-[var(--radius-md)] border border-border bg-popover p-[var(--spacing-4)] shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconType: Story = {
  args: { type: "icon" },
};

export const CheckboxVariant: Story = {
  args: { variant: "checkbox" },
};

export const HoverPinned: Story = {
  args: { state: "hover" },
};

/** Figma `Select Menu / Item` (118:1541): 2×4 variant matrix. */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-6)]">
      <div className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-4">
        <SelectMenuItem>Select Item</SelectMenuItem>
        <SelectMenuItem state="hover">Select Item</SelectMenuItem>
        <SelectMenuItem type="icon">Select Item</SelectMenuItem>
        <SelectMenuItem type="icon" state="hover">
          Select Item
        </SelectMenuItem>
      </div>
      <div className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-4">
        <SelectMenuItem variant="checkbox">Select Item</SelectMenuItem>
        <SelectMenuItem variant="checkbox" state="hover">
          Select Item
        </SelectMenuItem>
        <SelectMenuItem type="icon" variant="checkbox">
          Select Item
        </SelectMenuItem>
        <SelectMenuItem type="icon" variant="checkbox" state="hover">
          Select Item
        </SelectMenuItem>
      </div>
    </div>
  ),
};
