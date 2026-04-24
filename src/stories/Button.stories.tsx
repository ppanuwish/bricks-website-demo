import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";

const meta = {
  title: "Bricks/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Book a demo",
    type: "button" as const,
    showLeftIcon: true,
    showRightIcon: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focus", "disabled", "loading"],
    },
    showLeftIcon: {
      control: "boolean",
    },
    showRightIcon: {
      control: "boolean",
    },
    theme: {
      control: "select",
      options: ["bricks", "nia", "c-law"],
    },
    mode: {
      control: "select",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Button" },
};

export const DestructiveStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap items-center gap-4" data-theme="bricks">
      <Button variant="destructive" showLeftIcon showRightIcon>
        Button
      </Button>
      <Button variant="destructive" state="hover" showLeftIcon showRightIcon>
        Button
      </Button>
      <Button variant="destructive" state="focus" showLeftIcon showRightIcon>
        Button
      </Button>
      <Button variant="destructive" loading showLeftIcon showRightIcon>
        Button
      </Button>
      <Button variant="destructive" state="disabled" disabled showLeftIcon showRightIcon>
        Button
      </Button>
      <Button variant="destructive" size="icon" showLeftIcon aria-label="Icon" />
      <Button variant="destructive" size="icon" state="hover" showLeftIcon aria-label="Icon hover" />
    </div>
  ),
};

export const Link: Story = {
  args: { variant: "link", children: "Learn more" },
};

export const Loading: Story = {
  args: { loading: true, children: "Submitting" },
};

export const FigmaStatePreview: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    state: "default",
    showLeftIcon: true,
    showRightIcon: true,
    theme: "bricks",
    mode: "light",
  },
};

export const FullWidth: Story = {
  parameters: { layout: "padded" },
  decorators: [
    (S) => (
      <div className="w-full max-w-md">
        <S />
      </div>
    ),
  ],
  args: { fullWidth: true },
};
