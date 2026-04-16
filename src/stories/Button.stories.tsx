import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";

const meta = {
  title: "Bricks/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Book a demo",
    type: "button" as const,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Link: Story = {
  args: { variant: "link", children: "Learn more" },
};

export const Loading: Story = {
  args: { loading: true, children: "Submitting" },
};

export const FullWidth: Story = {
  parameters: { layout: "padded" },
  decorators: [
    (S) => (
      <div className="w-full max-w-md">
        <S />
      </div>
    ),
  ],
  args: { fullWidth: true },
};
