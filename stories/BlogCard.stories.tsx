import type { Meta, StoryObj } from "@storybook/react";
import { BlogCard } from "../src/components/BlogCard";
import { BLOG_CARD_FALLBACK_IMAGES } from "../src/data/blogPosts";

const samplePost = {
  category: "Technology",
  title: "Agentic automation: The path to an orchestrated enterprise",
  excerpt:
    "In recent years, the introduction of AI has increased the power and impact of enterprise automation.",
  date: "10 October 2025",
  image: BLOG_CARD_FALLBACK_IMAGES[0],
};

const meta = {
  title: "Components/BlogCard",
  component: BlogCard,
  tags: ["autodocs"],
  args: {
    post: samplePost,
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutImage: Story = {
  args: {
    post: {
      ...samplePost,
      image: undefined,
    },
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => {},
  },
};
