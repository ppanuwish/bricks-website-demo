import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BlogMenu, type BlogCategory } from "../components/BlogMenu";

const meta = {
  title: "Bricks/BlogMenu",
  component: BlogMenu,
  tags: ["autodocs"],
  render: function BlogMenuStory() {
    const [active, setActive] = useState<BlogCategory>("All category");
    return (
      <BlogMenu activeCategory={active} onSelectCategory={setActive} />
    );
  },
} satisfies Meta<typeof BlogMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeCategory: "All category",
    onSelectCategory: () => undefined,
  },
};
