import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePickerSelect } from "../components/DatePickerSelect";

const meta = {
  title: "Bricks/DatePickerSelect",
  component: DatePickerSelect,
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
    placeholder: "Pick a date",
    disabled: false,
  },
} satisfies Meta<typeof DatePickerSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const DefaultTomorrow: Story = {
  render: () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return <DatePickerSelect defaultValue={d} locale="en-US" placeholder="Pick a date" />;
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerSelect
        value={value}
        onChange={setValue}
        placeholder="Pick a date"
        locale="en-US"
      />
    );
  },
};
