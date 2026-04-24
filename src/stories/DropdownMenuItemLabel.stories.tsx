import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuItemLabel } from "../components/DropdownMenuItemLabel";

const meta = {
  title: "Bricks/DropdownMenuItemLabel",
  component: DropdownMenuItemLabel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Label Text",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "inset"],
    },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-md border border-border bg-popover p-[var(--spacing-2)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenuItemLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Level=1` — full horizontal padding (330:24589). */
export const Default: Story = {
  args: { variant: "default" },
};

/** Figma `Level=2` — inset `pl-8` to align with icon/checkbox/radio rows (17398:40526). */
export const Inset: Story = {
  args: { variant: "inset" },
};

/** Both variants like the Figma component sheet. */
export const FigmaPair: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-[var(--spacing-1)]">
      <DropdownMenuItemLabel variant="default">Label Text</DropdownMenuItemLabel>
      <DropdownMenuItemLabel variant="inset">Label Text</DropdownMenuItemLabel>
    </div>
  ),
};
