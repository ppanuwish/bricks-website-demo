import type { Meta, StoryObj } from "@storybook/react-vite";
import { Nav } from "../components/Nav";

const meta = {
  title: "Bricks/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (S) => (
      <div className="min-h-[120vh] bg-bricks-darkgray">
        <S />
        <p className="px-6 pt-32 font-body text-white/60">
          Scroll to exercise nav scroll styling. Path is memory-routed as “/”.
        </p>
      </div>
    ),
  ],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
