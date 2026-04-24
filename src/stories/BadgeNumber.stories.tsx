import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeNumber } from "../components/BadgeNumber";

const meta = {
  title: "Bricks/BadgeNumber",
  component: BadgeNumber,
  tags: ["autodocs"],
  args: {
    children: "8",
    variant: "default" as const,
    state: "default" as const,
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
  },
} satisfies Meta<typeof BadgeNumber>;

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

export const TwoDigits: Story = {
  args: { children: "12" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <BadgeNumber variant="default">3</BadgeNumber>
      <BadgeNumber variant="secondary">3</BadgeNumber>
      <BadgeNumber variant="outline">3</BadgeNumber>
      <BadgeNumber variant="destructive">3</BadgeNumber>
    </div>
  ),
};
