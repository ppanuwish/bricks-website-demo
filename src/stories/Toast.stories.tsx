import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "../components/Toast";

const meta = {
  title: "Bricks/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Fixed **388px** width; padding **spacing-4 / spacing-6 / spacing-4 / spacing-4** (theme tokens from `theme.css`); row **flex** with **items-center** and **gap** spacing-2.",
      },
    },
  },
  args: {
    destructive: false,
    state: "default" as const,
    title: "Title Text",
    description: "This is a toast description.",
    showTitle: true,
    showAction: true,
    actionLabel: "Try again",
    showClose: undefined,
    closeButtonState: "default" as const,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover"],
    },
    showClose: {
      control: "boolean",
    },
    closeButtonState: {
      control: "select",
      options: ["default", "hover"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithClose: Story = {
  args: {
    state: "hover",
    closeButtonState: "default",
  },
};

export const Destructive: Story = {
  args: { destructive: true },
};

export const DestructiveWithClose: Story = {
  args: {
    destructive: true,
    state: "hover",
    closeButtonState: "default",
  },
};

export const WithoutAction: Story = {
  args: { showAction: false },
};

export const TitleOnly: Story = {
  args: { description: null },
};

/** Static 2×2 matrix aligned with Figma component variants (each toast is 388px wide). */
export const FigmaStates: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="box-border w-full overflow-x-auto px-4 py-6 font-body">
      <div className="mx-auto grid w-max max-w-none gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Toast state="default" />
          <span className="text-xs text-muted-foreground">Default · neutral</span>
        </div>
        <div className="flex flex-col gap-2">
          <Toast state="hover" closeButtonState="default" />
          <span className="text-xs text-muted-foreground">Hover · neutral + close</span>
        </div>
        <div className="flex flex-col gap-2">
          <Toast destructive state="default" />
          <span className="text-xs text-muted-foreground">Default · destructive</span>
        </div>
        <div className="flex flex-col gap-2">
          <Toast destructive state="hover" closeButtonState="default" />
          <span className="text-xs text-muted-foreground">Hover · destructive + close</span>
        </div>
      </div>
    </div>
  ),
};
