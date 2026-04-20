import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  samplePostsByCategory,
  withFallbackBlogImage,
} from "../data/blogPosts";
import { BlogDetailContent } from "../components/BlogDetailContent";

const post = withFallbackBlogImage(samplePostsByCategory["All category"][0]);

const meta = {
  title: "Bricks/BlogDetailContent",
  component: BlogDetailContent,
  tags: ["autodocs"],
  args: { post },
  decorators: [
    (S) => (
      <div className="mx-auto max-w-[800px] px-6 py-10">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof BlogDetailContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
