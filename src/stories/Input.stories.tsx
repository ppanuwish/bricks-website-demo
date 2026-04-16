import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/Input";

const meta = {
  title: "Bricks/Input",
  component: Input,
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
    label: "Label",
    description: "This is an input description.",
    placeholder: "Placeholder",
    fileButtonText: "Choose file",
    fileText: "No file chosen",
    showLabel: true,
    showDescription: true,
    showLink: false,
    showIcon: false,
    horizontalLayout: "no",
    variant: "default",
    state: "default",
  },
  argTypes: {
    horizontalLayout: {
      control: "inline-radio",
      options: ["no", "yes", "input"],
    },
    variant: {
      control: "inline-radio",
      options: ["default", "file"],
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabelAndDescription: Story = {
  args: {
    horizontalLayout: "no",
    variant: "default",
    state: "default",
    showLabel: true,
    showDescription: true,
    showIcon: false,
  },
};

export const FileVariant: Story = {
  args: {
    horizontalLayout: "no",
    variant: "file",
    state: "default",
    showLabel: true,
    showDescription: true,
  },
};

export const HorizontalLayoutYes: Story = {
  args: {
    horizontalLayout: "yes",
    variant: "default",
    state: "focus",
    showLabel: true,
    showDescription: true,
    showIcon: true,
  },
};

export const ErrorState: Story = {
  args: {
    horizontalLayout: "no",
    variant: "default",
    state: "error-focus",
    showLabel: true,
    showDescription: true,
  },
};

export const FigmaStateGrid: Story = {
  name: "Figma states (default + file)",
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
          <div key={`default-${s}`} className="flex w-[373px] items-stretch">
            <Input
              horizontalLayout="no"
              variant="default"
              state={s}
              label="Label"
              description="This is an input description."
              placeholder="Placeholder"
              showLabel
              showDescription
            />
          </div>
        ))}
        {states.map((s) => (
          <div key={`file-${s}`} className="flex w-[373px] items-stretch">
            <Input
              horizontalLayout="no"
              variant="file"
              state={s}
              label="Label"
              description="This is an input description."
              fileButtonText="Choose file"
              fileText="No file chosen"
              showLabel
              showDescription
            />
          </div>
        ))}
      </div>
    );
  },
};
