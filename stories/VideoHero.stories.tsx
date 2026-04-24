import type { Meta, StoryObj } from "@storybook/react";
import { VideoHero } from "../src/components/VideoHero";

const meta = {
  title: "Components/VideoHero",
  component: VideoHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof VideoHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
