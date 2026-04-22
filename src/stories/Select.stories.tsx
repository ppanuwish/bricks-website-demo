import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select, type SelectDisplayState } from "../components/Select";

const sampleOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

const meta = {
  title: "Bricks/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Label",
    description: "This is a select description.",
    placeholder: "Placeholder",
    showLabel: true,
    showDescription: true,
    showIcon: false,
    state: "default",
    options: sampleOptions,
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        "default",
        "hover",
        "focus",
        "active",
        "filled",
        "filled-hover",
        "filled-focus",
        "disabled",
      ] satisfies SelectDisplayState[],
    },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,240px)] p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLeadingIcon: Story = {
  args: { showIcon: true },
};

export const Disabled: Story = {
  args: { disabled: true, state: "default" },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState("b");
    return (
      <Select
        label="Label"
        description="This is a select description."
        placeholder="Placeholder"
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/** Figma `Select` (345:11530): state symbols left → right. */
export const FigmaStateStrip: Story = {
  render: () => {
    const states: SelectDisplayState[] = [
      "default",
      "hover",
      "focus",
      "filled",
      "filled-hover",
      "filled-focus",
      "active",
      "disabled",
    ];
    return (
      <div className="flex w-[min(100vw-48px,1240px)] flex-wrap justify-center gap-x-6 gap-y-10 p-4">
        {states.map((s) => (
          <div key={s} className="flex w-[200px] flex-col gap-1">
            <p className="text-center font-mono text-[10px] text-muted-foreground">{s}</p>
            <Select
              label="Label"
              description="This is a select description."
              placeholder="Placeholder"
              showLabel
              showDescription
              showIcon
              state={s}
            />
          </div>
        ))}
      </div>
    );
  },
};
