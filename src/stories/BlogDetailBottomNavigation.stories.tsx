import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  samplePostsByCategory,
  withFallbackBlogImage,
} from "../data/blogPosts";
import { BlogDetailBottomNavigation } from "../components/BlogDetailBottomNavigation";

const list = samplePostsByCategory["All category"].map(withFallbackBlogImage);

const meta = {
  title: "Bricks/BlogDetailBottomNavigation",
  component: BlogDetailBottomNavigation,
  tags: ["autodocs"],
  args: {
    prevPost: list[0],
    nextPost: list[1] ?? null,
  },
  decorators: [
    (S) => (
      <div className="px-6 py-10">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof BlogDetailBottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtEnds: Story = {
  args: {
    prevPost: null,
    nextPost: null,
  },
};
