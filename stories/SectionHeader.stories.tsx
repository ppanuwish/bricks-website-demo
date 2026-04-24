import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "../src/components/SectionHeader";

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    tag: "Platform",
    title: "Build workflows your teams already understand.",
    sub: "Ship faster without retraining the organization on a new stack.",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: { center: true },
};

export const Dark: Story = {
  args: {
    tag: "Insights",
    title: "Operational clarity at every layer.",
    sub: "Monitor outcomes, not just uptime.",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const TitleOnly: Story = {
  args: {
    tag: undefined,
    sub: undefined,
    title: "A headline on its own.",
  },
};
