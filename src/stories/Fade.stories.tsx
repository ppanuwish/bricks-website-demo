import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fade } from "../components/Fade";

const meta = {
  title: "Bricks/Fade",
  component: Fade,
  tags: ["autodocs"],
  args: {
    d: 0,
    children: (
      <p className="font-body text-lg text-bricks-darkgray">
        Scroll this block into view (or reload) to see the fade-in.
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
