import type { Meta, StoryObj } from "@storybook/react";
import { CtaBlock } from "../src/components/CtaBlock";

const meta = {
  title: "Components/CtaBlock",
  component: CtaBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CtaBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
