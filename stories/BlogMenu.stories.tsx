import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BlogMenu, type BlogCategory } from "../src/components/BlogMenu";

function BlogMenuDemo() {
  const [active, setActive] = useState<BlogCategory>("All category");
  return <BlogMenu activeCategory={active} onSelectCategory={setActive} />;
}

const meta = {
  title: "Components/BlogMenu",
  component: BlogMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof BlogMenu>;

export default meta;

export const Default: StoryObj = {
  render: () => <BlogMenuDemo />,
};
