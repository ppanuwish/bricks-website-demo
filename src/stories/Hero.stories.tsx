import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "../components/Hero";

const meta = {
  title: "Bricks/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    tag: "Bricks Platform",
    headline: (
      <>
        Agentic automation
        <br />
        for real operations
      </>
    ),
    sub: "Orchestrate people, agents, and robots on one governed surface.",
    hook: "Keep what your teams already know.",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};

export const Light: Story = {
  args: { isLight: true },
};
