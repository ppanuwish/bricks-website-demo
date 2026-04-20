import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../src/components/Section";

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  args: {
    children: (
      <p className="font-body text-bricks-darkgray">
        Section content with default max width.
      </p>
    ),
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Narrow: Story = {
  args: { narrow: true },
};

export const OnGray: Story = {
  args: {
    className: "bg-bricks-gray",
  },
};
