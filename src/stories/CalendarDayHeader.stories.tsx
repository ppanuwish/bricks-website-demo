import type { Meta, StoryObj } from "@storybook/react-vite";

import { CalendarDayHeader } from "../components/CalendarDayHeader";

const meta = {
  title: "Bricks/CalendarDayHeader",
  component: CalendarDayHeader,
  tags: ["autodocs"],
  args: {
    children: "Su",
  },
} satisfies Meta<typeof CalendarDayHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma default instance label. */
export const Default: Story = {};

export const Monday: Story = {
  args: { children: "Mo" },
};

/** Sunday-first row matching `DatePickerSelect` (`WEEKDAY_LABELS_SU`). */
export const WeekRowSundayFirst: Story = {
  render: () => (
    <div className="flex w-[224px] font-body">
      {(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const).map((d) => (
        <CalendarDayHeader key={d}>{d}</CalendarDayHeader>
      ))}
    </div>
  ),
};

/** Monday-first row matching `DatePickerInput` (`WEEKDAYS`). */
export const WeekRowMondayFirst: Story = {
  render: () => (
    <div className="grid w-[280px] grid-cols-7 gap-y-1">
      {(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const).map((d) => (
        <CalendarDayHeader key={d} className="justify-self-center">
          {d}
        </CalendarDayHeader>
      ))}
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    children: "Fr",
    className: "rounded-sm bg-muted/50",
  },
};
