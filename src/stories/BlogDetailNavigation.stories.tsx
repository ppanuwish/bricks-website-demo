import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlogDetailNavigation } from "../components/BlogDetailNavigation";

const meta = {
  title: "Bricks/BlogDetailNavigation",
  component: BlogDetailNavigation,
  tags: ["autodocs"],
  args: {
    selectedCategory: "Technology",
    postTitle: "Agentic automation: The path to an orchestrated enterprise",
  },
  decorators: [
    (S) => (
      <div className="px-6 py-8">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof BlogDetailNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
