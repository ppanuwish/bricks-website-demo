import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "../components/Checkbox";

const meta = {
  title: "Bricks/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,400px)] p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
  args: {
    label: "Checkbox Text",
    description: "This is a checkbox description.",
    showLabel: true,
    showDescription: true,
    state: "default",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["default", "focus", "disabled"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ControlledExample: Story = {
  render: function ControlledCheckbox() {
    const [on, setOn] = useState(true);
    return (
      <div className="flex flex-col gap-[var(--spacing-4)]">
        <Checkbox
          checked={on}
          onCheckedChange={setOn}
          label="Controlled checkbox"
          description="Uses checked + onCheckedChange."
        />
        <p className="font-body text-sm text-muted-foreground">State: {on ? "checked" : "unchecked"}</p>
      </div>
    );
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    state: "default",
  },
};

export const FocusUnchecked: Story = {
  args: {
    defaultChecked: false,
    state: "focus",
  },
};

export const FocusChecked: Story = {
  args: {
    defaultChecked: true,
    state: "focus",
  },
};

export const DisabledUnchecked: Story = {
  args: {
    defaultChecked: false,
    state: "disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    state: "disabled",
  },
};

export const LabelOnly: Story = {
  args: {
    showDescription: false,
  },
};

export const CheckboxOnly: Story = {
  args: {
    showLabel: false,
    showDescription: false,
    defaultChecked: false,
    "aria-label": "Standalone checkbox",
  },
};

export const Matrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[520px] flex-col gap-[var(--spacing-6)]">
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <p className="font-body text-sm font-semibold text-foreground">Default</p>
        <div className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2">
          <Checkbox defaultChecked={false} label="Unchecked" showDescription={false} />
          <Checkbox defaultChecked label="Checked" showDescription={false} />
        </div>
      </div>
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <p className="font-body text-sm font-semibold text-foreground">Focus (pinned)</p>
        <div className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2">
          <Checkbox state="focus" defaultChecked={false} label="Unchecked" showDescription={false} />
          <Checkbox state="focus" defaultChecked label="Checked" showDescription={false} />
        </div>
      </div>
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <p className="font-body text-sm font-semibold text-foreground">Disabled</p>
        <div className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2">
          <Checkbox state="disabled" defaultChecked={false} label="Unchecked" showDescription={false} />
          <Checkbox state="disabled" defaultChecked label="Checked" showDescription={false} />
        </div>
      </div>
      <Checkbox label="With description" description="Secondary line matches Figma spacing." />
    </div>
  ),
  parameters: { layout: "padded" },
};
