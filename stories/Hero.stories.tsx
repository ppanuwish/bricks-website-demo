import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "../src/components/Hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    tag: "Bricks",
    headline: "Enterprise automation that feels human.",
    sub: "Compose agents, robots, and people into one operating model.",
    hook: "Start with the workflows you already run.",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Light: Story = {
  args: { isLight: true },
  parameters: {
    backgrounds: { default: "surface" },
  },
};

export const WithoutHook: Story = {
  args: { hook: undefined },
};
