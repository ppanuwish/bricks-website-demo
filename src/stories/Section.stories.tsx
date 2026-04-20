import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "../components/Section";

const meta = {
  title: "Bricks/Section",
  component: Section,
  tags: ["autodocs"],
  args: {
    children: (
      <p className="font-body text-lg text-bricks-darkgray">
        Section content uses horizontal padding and a centered max-width wrapper.
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
  args: { className: "bg-bricks-gray" },
};
