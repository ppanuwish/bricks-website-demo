import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CalendarDayButton,
  type CalendarDayButtonState,
  type CalendarDayButtonVariant,
} from "../components/CalendarDayButton";

const meta = {
  title: "Bricks/CalendarDayButton",
  component: CalendarDayButton,
  tags: ["autodocs"],
  args: {
    children: "15",
    variant: "default" as const,
    selected: false,
    state: undefined,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "current", "outside"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "pressed", "disabled", "selected", "selectedFocus"],
    },
  },
} satisfies Meta<typeof CalendarDayButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Today: Story = {
  args: { variant: "current", children: "24" },
};

export const Selected: Story = {
  args: { selected: true, children: "8" },
};

export const Outside: Story = {
  args: { variant: "outside", children: "31" },
};

export const OutsideSelected: Story = {
  args: { variant: "outside", selected: true, children: "1" },
};

/** Figma `Calendar / Day Button` (node 234:27) — Variant × State matrix. */
export const FigmaStates: Story = {
  render: () => {
    const outsideStates: CalendarDayButtonState[] = [
      "default",
      "hover",
      "pressed",
      "selected",
      "disabled",
    ];
    const defaultStates: CalendarDayButtonState[] = [
      "default",
      "hover",
      "pressed",
      "disabled",
      "selected",
      "selectedFocus",
    ];

    const row = (label: string, variant: CalendarDayButtonVariant, states: CalendarDayButtonState[]) => (
      <div className="mb-8">
        <p className="mb-3 font-body text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex flex-wrap items-end gap-4">
          {states.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <CalendarDayButton variant={variant} state={s} selected={s === "selected" || s === "selectedFocus"}>
                1
              </CalendarDayButton>
              <span className="text-center font-body text-[10px] text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col gap-2 font-body">
        {row("Variant=Outside", "outside", outsideStates)}
        {row("Variant=Default", "default", defaultStates)}
        <div className="mb-2">
          <p className="mb-3 font-body text-xs font-medium text-muted-foreground">Variant=Current</p>
          <div className="flex flex-wrap items-end gap-4">
            {(["default", "hover"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <CalendarDayButton variant="current" state={s}>
                  1
                </CalendarDayButton>
                <span className="text-center font-body text-[10px] text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
