import type { Meta, StoryObj } from "@storybook/react-vite";
import { CtaBlock } from "../components/CtaBlock";

const meta = {
  title: "Bricks/CtaBlock",
  component: CtaBlock,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CtaBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
