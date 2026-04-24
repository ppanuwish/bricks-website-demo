import type { Meta, StoryObj } from "@storybook/react-vite";
import { DialogCloseIcon } from "../components/DialogCloseIcon";

const meta = {
  title: "Bricks/DialogCloseIcon",
  component: DialogCloseIcon,
  tags: ["autodocs"],
  args: {
    type: "button" as const,
    state: "default" as const,
    "aria-label": "Close",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focus"],
    },
  },
} satisfies Meta<typeof DialogCloseIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HoverState: Story = {
  args: { state: "hover" },
};

export const FocusState: Story = {
  args: { state: "focus" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Figma `State` variants: Default · Hover · Focus (node 5056:13504). */
export const FigmaStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body">
      <div className="grid grid-cols-3 gap-x-12 gap-y-8">
        <div className="flex flex-col items-center gap-2">
          <DialogCloseIcon state="default" />
          <span className="text-center text-xs text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <DialogCloseIcon state="hover" />
          <span className="text-center text-xs text-muted-foreground">Hover</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <DialogCloseIcon state="focus" />
          <span className="text-center text-xs text-muted-foreground">Focus</span>
        </div>
      </div>
    </div>
  ),
};
