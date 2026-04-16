import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BlogList } from "../components/BlogList";

const meta = {
  title: "Bricks/BlogList",
  component: BlogList,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    showHeading: true,
    showCategoryMenu: true,
    onCardClick: fn(),
    onViewAllBlogs: fn(),
  },
} satisfies Meta<typeof BlogList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMenu: Story = {};

export const MenuHandledByParent: Story = {
  args: {
    showCategoryMenu: false,
    activeCategory: "Technology",
    omitOuterContainer: true,
  },
  decorators: [
    (S) => (
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <S />
      </div>
    ),
  ],
};
