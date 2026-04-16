import type { Meta, StoryObj } from "@storybook/react-vite";
import { VideoHero } from "../components/VideoHero";

const meta = {
  title: "Bricks/VideoHero",
  component: VideoHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof VideoHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
