import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../components/Textarea";

const meta = {
  title: "Bricks/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="flex w-[373px] items-stretch">
        <S />
      </div>
    ),
  ],
  args: {
    label: "Label Text",
    description: "This is a textarea description.",
    placeholder: "Placeholder",
    showLabel: true,
    showDescription: true,
    horizontalLayout: "no",
    state: "default",
  },
  argTypes: {
    horizontalLayout: {
      control: "inline-radio",
      options: ["no", "yes", "input"],
    },
    state: {
      control: "select",
      options: [
        "default",
        "hover",
        "active",
        "focus",
        "filled",
        "disabled",
        "error",
        "error-focus",
      ],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabelAndDescription: Story = {
  args: {
    horizontalLayout: "no",
    state: "default",
    showLabel: true,
    showDescription: true,
  },
};

export const HorizontalLayout: Story = {
  args: {
    horizontalLayout: "yes",
    state: "focus",
  },
};

export const ErrorState: Story = {
  args: {
    horizontalLayout: "no",
    state: "error-focus",
  },
};

export const FigmaStateGrid: Story = {
  name: "Figma states",
  render: () => {
    const states = [
      "default",
      "hover",
      "focus",
      "active",
      "disabled",
      "error",
      "error-focus",
      "filled",
    ] as const;

    return (
      <div className="grid max-w-[880px] grid-cols-2 gap-x-8 gap-y-6 bg-background p-4">
        {states.map((s) => (
          <div key={s} className="flex w-[373px] items-stretch">
            <Textarea
              horizontalLayout="no"
              state={s}
              label="Label Text"
              description="This is a textarea description."
              placeholder="Placeholder"
              showLabel
              showDescription
              value={s === "filled" ? "Filled value" : ""}
              readOnly
            />
          </div>
        ))}
      </div>
    );
  },
};
