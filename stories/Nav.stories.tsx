import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "../src/components/Nav";

const meta = {
  title: "Components/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (StoryEl) => (
      <div className="min-h-[200svh] bg-bricks-darkgray">
        <StoryEl />
        <div className="px-6 py-24 text-white">
          <p className="max-w-xl font-body text-white/70">
            Scroll to see the nav border state. Background sampling expects a dark
            hero-style page.
          </p>
        </div>
        <div className="min-h-[80svh] bg-bricks-gray px-6 py-20 text-bricks-darkgray">
          <p className="max-w-xl">
            Light section below — nav should adapt contrast when scrolled here.
          </p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
