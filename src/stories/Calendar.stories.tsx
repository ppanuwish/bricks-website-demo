import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Calendar } from "../components/Calendar";

const meta = {
  title: "Bricks/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="bg-background p-8">
        <S />
      </div>
    ),
  ],
  args: {
    locale: "en-US",
    disabled: false,
    variant: "simple" as const,
    weekStartsOn: "sunday" as const,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "simple",
        "one-column",
        "with-presets",
        "with-time",
        "custom-days",
        "two-columns",
        "three-columns",
      ],
    },
    weekStartsOn: { control: "select", options: ["sunday", "monday"] },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {};

export const OneColumn: Story = {
  args: { variant: "one-column" },
};

export const MondayStart: Story = {
  args: { variant: "simple", weekStartsOn: "monday" },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar value={value} onChange={setValue} variant="simple" />
        <p className="font-body text-xs text-muted-foreground">
          {value ? value.toDateString() : "No date selected"}
        </p>
      </div>
    );
  },
};

export const TwoColumns: Story = {
  args: { variant: "two-columns" },
};

export const ThreeColumns: Story = {
  args: { variant: "three-columns" },
};

export const CustomDays: Story = {
  args: {
    variant: "custom-days",
    customDaySubtitle: (cell: Date) => `$${cell.getDate()}0`,
  },
};

export const WithTime: Story = {
  args: {
    variant: "with-time",
    timeSlot: (
      <div className="flex items-center justify-between gap-3 font-body text-sm text-foreground">
        <span className="text-muted-foreground">Time</span>
        <span>10:00</span>
      </div>
    ),
  },
};

export const WithPresets: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    const add = (offset: number) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + offset);
      setValue(d);
    };
    return (
      <Calendar
        variant="with-presets"
        value={value}
        onChange={setValue}
        presets={
          <div className="flex flex-col gap-1 font-body">
            <button
              type="button"
              className="rounded-md px-2 py-1.5 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => add(0)}
            >
              Today
            </button>
            <button
              type="button"
              className="rounded-md px-2 py-1.5 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => add(1)}
            >
              Tomorrow
            </button>
            <button
              type="button"
              className="rounded-md px-2 py-1.5 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => add(7)}
            >
              In a week
            </button>
          </div>
        }
      />
    );
  },
};
