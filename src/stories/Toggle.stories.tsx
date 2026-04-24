import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Italic } from "lucide-react";
import { Toggle } from "../components/Toggle";

const meta = {
  title: "Bricks/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
  args: {
    children: "Text",
    showIcon: true,
    variant: "default",
    size: "default",
    state: "default",
    defaultPressed: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    state: {
      control: "select",
      options: ["default", "hover", "focus", "pressed", "disabled"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ControlledExample: Story = {
  render: function ToggleControlled() {
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col gap-[var(--spacing-4)]">
        <Toggle pressed={on} onPressedChange={setOn} children="Text" />
        <p className="font-body text-sm text-muted-foreground" data-testid="state-label">
          Pressed: {on ? "on" : "off"}
        </p>
      </div>
    );
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: <Italic className="h-4 w-4 shrink-0" />,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const IconOnly: Story = {
  args: {
    children: null,
  },
  render: (args) => <Toggle {...args} aria-label="Bold" />,
};

export const Matrix: Story = {
  render: () => {
    const sizes = ["sm", "default", "lg"] as const;
    return (
      <div className="flex w-full max-w-[800px] flex-col gap-[var(--spacing-6)]">
        <p className="font-body text-sm text-muted-foreground">Default variant (Figma rows: off, hover, focus, on, disabled)</p>
        <div className="grid grid-cols-3 gap-[var(--spacing-3)] place-items-center">
          {sizes.map((size) => (
            <p key={size} className="col-span-1 text-center font-body text-xs text-muted-foreground">
              {size}
            </p>
          ))}
          {sizes.map((size) => (
            <Toggle key={`d-off-${size}`} size={size} variant="default" defaultPressed={false} state="default" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`d-h-${size}`} size={size} variant="default" state="hover" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`d-f-${size}`} size={size} variant="default" state="focus" defaultPressed={false} children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`d-on-${size}`} size={size} variant="default" state="pressed" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`d-dis-${size}`} size={size} variant="default" state="disabled" defaultPressed={false} children="Text" />
          ))}
        </div>
        <p className="font-body text-sm text-muted-foreground">Outline variant</p>
        <div className="grid grid-cols-3 gap-[var(--spacing-3)] place-items-center">
          {sizes.map((size) => (
            <Toggle key={`o-off-${size}`} size={size} variant="outline" defaultPressed={false} state="default" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`o-h-${size}`} size={size} variant="outline" state="hover" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`o-f-${size}`} size={size} variant="outline" state="focus" defaultPressed={false} children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`o-on-${size}`} size={size} variant="outline" state="pressed" children="Text" />
          ))}
          {sizes.map((size) => (
            <Toggle key={`o-dis-${size}`} size={size} variant="outline" state="disabled" defaultPressed={false} children="Text" />
          ))}
        </div>
      </div>
    );
  },
  parameters: { layout: "padded" },
};
