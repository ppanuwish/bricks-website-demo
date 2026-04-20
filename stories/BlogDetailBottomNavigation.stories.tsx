import type { Meta, StoryObj } from "@storybook/react";
import { BlogDetailBottomNavigation } from "../src/components/BlogDetailBottomNavigation";
import {
  samplePostsByCategory,
  withFallbackBlogImages,
} from "../src/data/blogPosts";

const posts = withFallbackBlogImages(samplePostsByCategory["All category"]);
const [prev, next] = [posts[0] ?? null, posts[1] ?? null];

const meta = {
  title: "Components/BlogDetailBottomNavigation",
  component: BlogDetailBottomNavigation,
  tags: ["autodocs"],
  args: {
    prevPost: prev,
    nextPost: next,
  },
} satisfies Meta<typeof BlogDetailBottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MissingNeighbor: Story = {
  args: {
    prevPost: null,
    nextPost: next,
  },
};
