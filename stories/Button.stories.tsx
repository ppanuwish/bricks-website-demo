import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    type: "button" as const,
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
  args: { variant: "link", children: "Link style" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Loading: Story = {
  args: { loading: true, children: "Saving…" },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (StoryEl) => (
      <div className="w-full max-w-md">
        <StoryEl />
      </div>
    ),
  ],
};
