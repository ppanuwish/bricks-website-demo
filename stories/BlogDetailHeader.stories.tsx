import type { Meta, StoryObj } from "@storybook/react";
import { BlogDetailHeader } from "../src/components/BlogDetailHeader";

const meta = {
  title: "Components/BlogDetailHeader",
  component: BlogDetailHeader,
  tags: ["autodocs"],
  args: {
    category: "Technology",
  },
} satisfies Meta<typeof BlogDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    category: "Agentic automation and the orchestrated enterprise",
  },
};
