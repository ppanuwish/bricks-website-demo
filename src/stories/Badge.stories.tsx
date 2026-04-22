import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "../components/Badge";

const meta = {
  title: "Bricks/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "default" as const,
    state: "default" as const,
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focus"],
    },
    showLeftIcon: { control: "boolean" },
    showRightIcon: { control: "boolean" },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const WithIcons: Story = {
  args: {
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: <Check className="size-3 shrink-0" aria-hidden />,
    rightIcon: <ArrowRight className="size-3 shrink-0" aria-hidden />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};
