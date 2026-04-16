import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlogDetailHeader } from "../components/BlogDetailHeader";

const meta = {
  title: "Bricks/BlogDetailHeader",
  component: BlogDetailHeader,
  tags: ["autodocs"],
  args: {
    category: "Technology",
  },
} satisfies Meta<typeof BlogDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
