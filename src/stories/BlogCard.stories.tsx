import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import {
  samplePostsByCategory,
  withFallbackBlogImage,
} from "../data/blogPosts";
import { BlogCard } from "../components/BlogCard";

const sample = withFallbackBlogImage(samplePostsByCategory["All category"][0]);

const meta = {
  title: "Bricks/BlogCard",
  component: BlogCard,
  tags: ["autodocs"],
  args: {
    post: sample,
    onClick: fn(),
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoImage: Story = {
  args: {
    post: {
      ...sample,
      image: undefined,
    },
  },
};
