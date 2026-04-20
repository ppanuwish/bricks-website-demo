import type { Meta, StoryObj } from "@storybook/react";
import { BlogDetailContent } from "../src/components/BlogDetailContent";
import { BLOG_CARD_FALLBACK_IMAGES, samplePostsByCategory } from "../src/data/blogPosts";

const post = {
  ...samplePostsByCategory["All category"][0],
  image: BLOG_CARD_FALLBACK_IMAGES[1],
};

const meta = {
  title: "Components/BlogDetailContent",
  component: BlogDetailContent,
  tags: ["autodocs"],
  args: {
    post,
  },
} satisfies Meta<typeof BlogDetailContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
