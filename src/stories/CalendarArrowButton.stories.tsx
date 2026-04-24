import type { Meta, StoryObj } from "@storybook/react-vite";

import { CalendarArrowButton } from "../components/CalendarArrowButton";

const meta = {
  title: "Bricks/CalendarArrowButton",
  component: CalendarArrowButton,
  tags: ["autodocs"],
  args: {
    variant: "previous" as const,
    state: "default" as const,
    "aria-label": "Previous month",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["previous", "next"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focus", "disabled"],
    },
  },
} satisfies Meta<typeof CalendarArrowButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Next: Story = {
  args: {
    variant: "next",
    "aria-label": "Next month",
  },
};

export const Hover: Story = {
  args: { state: "hover" },
};

export const Focus: Story = {
  args: { state: "focus" },
};

export const Disabled: Story = {
  args: { state: "disabled" },
};

/** Figma `Calendar / Arrow Button` matrix: Previous / Next × Default / Hover / Focus / Disabled. */
export const FigmaStates: Story = {
  render: () => (
    <div className="flex flex-col gap-10 font-body">
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">Previous</p>
        <div className="flex flex-wrap items-end gap-6">
          {(["default", "hover", "focus", "disabled"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <CalendarArrowButton variant="previous" state={s} aria-label="Previous month" />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">Next</p>
        <div className="flex flex-wrap items-end gap-6">
          {(["default", "hover", "focus", "disabled"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <CalendarArrowButton variant="next" state={s} aria-label="Next month" />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
