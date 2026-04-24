import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePickerInput } from "../components/DatePickerInput";

const meta = {
  title: "Bricks/DatePickerInput",
  component: DatePickerInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="flex w-[280px] items-stretch">
        <S />
      </div>
    ),
  ],
  args: {
    label: "Label",
    description: "Your message will be copied to the support team.",
    placeholder: "Pick a date",
    showLabel: true,
    showDescription: true,
    state: "default",
    locale: "en-US",
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        "default",
        "hover",
        "focus",
        "filled",
        "filled-hover",
        "filled-focus",
        "disabled",
      ],
    },
  },
} satisfies Meta<typeof DatePickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerInput
        label="Label"
        description="Choose a date; the trigger updates from the calendar."
        value={value}
        onChange={setValue}
        state="default"
      />
    );
  },
};

export const FigmaStateGrid: Story = {
  name: "Figma states (node 334:4051)",
  render: () => {
    const emptyStates = ["default", "hover", "focus", "disabled"] as const;
    const filledStates = ["filled", "filled-hover", "filled-focus"] as const;
    const sample = new Date(2026, 3, 24);

    return (
      <div className="grid max-w-[560px] grid-cols-2 gap-x-10 gap-y-8 bg-background p-6">
        {emptyStates.map((s) => (
          <DatePickerInput
            key={`empty-${s}`}
            state={s}
            label="Label"
            description="Your message will be copied to the support team."
            showDescription
            placeholder="Pick a date"
          />
        ))}
        {filledStates.map((s) => (
          <DatePickerInput
            key={`filled-${s}`}
            state={s}
            label="Label"
            description="Your message will be copied to the support team."
            value={sample}
            placeholder="Pick a date"
          />
        ))}
      </div>
    );
  },
};
