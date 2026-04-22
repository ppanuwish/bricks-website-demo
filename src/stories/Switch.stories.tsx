import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "../components/Switch";

const meta = {
  title: "Bricks/Switch",
  component: Switch,
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
    label: "Switch Text",
    description: "This is a switch description.",
    showLabel: true,
    showDescription: true,
    variant: "default",
    side: "left",
    state: "default",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "box"],
    },
    side: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    state: {
      control: "inline-radio",
      options: ["default", "focus", "disabled"],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ControlledExample: Story = {
  render: function ControlledSwitch() {
    const [on, setOn] = useState(true);
    return (
      <div className="flex flex-col gap-[var(--spacing-4)]">
        <Switch checked={on} onCheckedChange={setOn} label="Controlled switch" description="Uses checked + onCheckedChange." />
        <p className="font-body text-sm text-muted-foreground">State: {on ? "on" : "off"}</p>
      </div>
    );
  },
};

export const BoxVariant: Story = {
  args: {
    variant: "box",
    defaultChecked: false,
    state: "default",
  },
};

export const SwitchOnRight: Story = {
  args: {
    side: "right",
    defaultChecked: true,
  },
};

export const FocusState: Story = {
  args: {
    state: "focus",
    defaultChecked: false,
  },
};

export const DisabledOff: Story = {
  args: {
    state: "disabled",
    defaultChecked: false,
  },
};

export const DisabledOn: Story = {
  args: {
    state: "disabled",
    defaultChecked: true,
  },
};

export const LabelOnly: Story = {
  args: {
    showDescription: false,
  },
};

export const Matrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[720px] flex-col gap-[var(--spacing-6)]">
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <p className="font-body text-sm font-semibold text-foreground">Plain — left</p>
        <div className="flex flex-col gap-[var(--spacing-4)]">
          <Switch defaultChecked={false} label="Off" showDescription={false} />
          <Switch defaultChecked label="On" showDescription={false} />
          <Switch state="disabled" defaultChecked={false} label="Disabled off" showDescription={false} />
          <Switch state="disabled" defaultChecked label="Disabled on" showDescription={false} />
        </div>
      </div>
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <p className="font-body text-sm font-semibold text-foreground">Box — switch right</p>
        <Switch variant="box" side="right" defaultChecked={false} label="Off" />
        <Switch variant="box" side="right" defaultChecked label="On" />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
