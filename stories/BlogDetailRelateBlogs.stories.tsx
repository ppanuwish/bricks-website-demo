import type { Meta, StoryObj } from "@storybook/react";
import { BlogDetailRelateBlogs } from "../src/components/BlogDetailRelateBlogs";
import {
  samplePostsByCategory,
  withFallbackBlogImages,
} from "../src/data/blogPosts";

const relatedBlogs = withFallbackBlogImages(
  samplePostsByCategory["All category"].slice(0, 3)
);

const meta = {
  title: "Components/BlogDetailRelateBlogs",
  component: BlogDetailRelateBlogs,
  tags: ["autodocs"],
  args: {
    relatedBlogs,
    sectionTitle: "Related posts",
  },
} satisfies Meta<typeof BlogDetailRelateBlogs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
