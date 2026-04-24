import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  DatePickerSelectRange,
  type DateRangeValue,
} from "../components/DatePickerSelectRange";

const meta = {
  title: "Bricks/DatePickerSelectRange",
  component: DatePickerSelectRange,
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
    size: "md" as const,
    weekStartsOn: "sunday" as const,
  },
} satisfies Meta<typeof DatePickerSelectRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizeSm: Story = {
  args: { size: "sm" },
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export const WithDefaultRange: Story = {
  render: function Render() {
    const from = new Date();
    from.setDate(10);
    from.setHours(0, 0, 0, 0);
    const to = new Date();
    to.setDate(20);
    to.setHours(0, 0, 0, 0);
    return (
      <DatePickerSelectRange
        defaultValue={{ from: startOfDay(from), to: startOfDay(to) }}
        size="md"
      />
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<DateRangeValue>({ from: null, to: null });
    return (
      <div className="flex flex-col items-center gap-4">
        <DatePickerSelectRange value={value} onRangeChange={setValue} size="md" />
        <p className="max-w-md text-center font-body text-sm text-muted-foreground">
          {value.from && value.to
            ? `${value.from.toDateString()} — ${value.to.toDateString()}`
            : value.from
              ? `${value.from.toDateString()} (pick end)`
              : "Pick a start date, then an end date."}
        </p>
      </div>
    );
  },
};

export const MondayWeek: Story = {
  args: { weekStartsOn: "monday", size: "md" },
};
