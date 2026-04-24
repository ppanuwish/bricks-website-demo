import type { Meta, StoryObj } from "@storybook/react";
import { Fade } from "../src/components/Fade";

const meta = {
  title: "Components/Fade",
  component: Fade,
  tags: ["autodocs"],
  args: {
    d: 0,
    children: (
      <p className="font-body text-lg text-bricks-darkgray">
        This block fades in when it enters the viewport (IntersectionObserver).
      </p>
    ),
  },
} satisfies Meta<typeof Fade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Delayed: Story = {
  args: { d: 200 },
};
