import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "../components/Footer";

const meta = {
  title: "Bricks/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
