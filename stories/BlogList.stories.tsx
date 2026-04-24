import type { Meta, StoryObj } from "@storybook/react";
import { BlogList } from "../src/components/BlogList";

const meta = {
  title: "Components/BlogList",
  component: BlogList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    showHeading: true,
    showCategoryMenu: true,
    selectedCategory: "All category",
    omitOuterContainer: false,
  },
} satisfies Meta<typeof BlogList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMenu: Story = {
  args: {
    showCategoryMenu: false,
    activeCategory: "Technology",
  },
};

export const WithViewAll: Story = {
  args: {
    showHeading: false,
    showCategoryMenu: false,
    omitOuterContainer: true,
    onViewAllBlogs: () => {},
  },
};
