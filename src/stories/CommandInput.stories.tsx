import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CommandInput } from "../components/CommandInput";

const meta = {
  title: "Bricks/CommandInput",
  component: CommandInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="w-[220px] rounded-md border border-border bg-popover p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
  args: {
    placeholder: "Placeholder",
    state: undefined,
    disabled: false,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "filled", "disabled"],
    },
  },
} satisfies Meta<typeof CommandInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `State=Default` (260:4113): muted placeholder, search at 50% opacity. */
export const DefaultState: Story = {
  args: {
    state: "default",
    value: "",
  },
};

/** Figma `State=Filled` (260:4101): foreground text and icons. */
export const FilledState: Story = {
  args: {
    state: "filled",
    value: "Placeholder",
    readOnly: true,
  },
};

/** Figma `State=Disabled` (260:4127). */
export const DisabledState: Story = {
  args: {
    state: "disabled",
    value: "Placeholder",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <CommandInput
        placeholder="Placeholder"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    );
  },
};
