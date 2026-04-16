import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  samplePostsByCategory,
  withFallbackBlogImages,
} from "../data/blogPosts";
import { BlogDetailRelateBlogs } from "../components/BlogDetailRelateBlogs";

const related = withFallbackBlogImages(
  samplePostsByCategory["All category"].slice(0, 3),
);

const meta = {
  title: "Bricks/BlogDetailRelateBlogs",
  component: BlogDetailRelateBlogs,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    relatedBlogs: related,
    sectionTitle: "Related posts",
  },
  decorators: [
    (S) => (
      <div className="px-6 py-10">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof BlogDetailRelateBlogs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
