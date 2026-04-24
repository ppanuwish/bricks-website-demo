import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastCloseButton } from "../components/ToastCloseButton";

const meta = {
  title: "Bricks/ToastCloseButton",
  component: ToastCloseButton,
  tags: ["autodocs"],
  args: {
    type: "button" as const,
    destructive: false,
    state: "default" as const,
    "aria-label": "Close",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover"],
    },
    destructive: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ToastCloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { destructive: true },
};

export const HoverState: Story = {
  args: { state: "hover" },
};

export const DestructiveHoverState: Story = {
  args: { destructive: true, state: "hover" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Two-by-two matrix matching Figma variants: Default × destructive × interaction state. */
export const FigmaStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body">
      <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-4">
        <div className="flex flex-col items-center gap-2">
          <ToastCloseButton state="default" />
          <span className="text-center text-xs text-muted-foreground">Default · neutral</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ToastCloseButton state="hover" />
          <span className="text-center text-xs text-muted-foreground">Hover · neutral</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ToastCloseButton destructive state="default" />
          <span className="text-center text-xs text-muted-foreground">Default · destructive</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ToastCloseButton destructive state="hover" />
          <span className="text-center text-xs text-muted-foreground">Hover · destructive</span>
        </div>
      </div>
    </div>
  ),
};
