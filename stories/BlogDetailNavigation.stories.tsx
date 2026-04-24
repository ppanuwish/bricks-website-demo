import type { Meta, StoryObj } from "@storybook/react";
import { BlogDetailNavigation } from "../src/components/BlogDetailNavigation";

const meta = {
  title: "Components/BlogDetailNavigation",
  component: BlogDetailNavigation,
  tags: ["autodocs"],
  args: {
    selectedCategory: "Technology",
    postTitle: "Agentic automation: The path to an orchestrated enterprise",
  },
} satisfies Meta<typeof BlogDetailNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
