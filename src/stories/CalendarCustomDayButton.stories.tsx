import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CalendarCustomDayButton,
  type CalendarCustomDayButtonState,
  type CalendarCustomDayButtonVariant,
} from "../components/CalendarCustomDayButton";

const meta = {
  title: "Bricks/CalendarCustomDayButton",
  component: CalendarCustomDayButton,
  tags: ["autodocs"],
  args: {
    children: "15",
    subtitle: "$100",
    variant: "default" as const,
    selected: false,
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
} satisfies Meta<typeof CalendarCustomDayButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Today: Story = {
  args: { variant: "current", children: "24", subtitle: "$2,400" },
};

export const Selected: Story = {
  args: { selected: true, children: "8", subtitle: "$120" },
};

export const Outside: Story = {
  args: { variant: "outside", children: "31", subtitle: "—" },
};

export const OutsideSelected: Story = {
  args: { variant: "outside", selected: true, children: "1", subtitle: "$99" },
};

/** Figma `Calendar / Custom Day Button` (node 17921:42281) — Variant × State matrix. */
export const FigmaStates: Story = {
  render: () => {
    const outsideStates: CalendarCustomDayButtonState[] = [
      "default",
      "hover",
      "pressed",
      "selected",
      "disabled",
    ];
    const defaultStates: CalendarCustomDayButtonState[] = [
      "default",
      "hover",
      "pressed",
      "disabled",
      "selected",
      "selectedFocus",
    ];

    const row = (label: string, variant: CalendarCustomDayButtonVariant, states: CalendarCustomDayButtonState[]) => (
      <div className="mb-8">
        <p className="mb-3 font-body text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex flex-wrap items-end gap-4">
          {states.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <CalendarCustomDayButton
                variant={variant}
                state={s}
                selected={s === "selected" || s === "selectedFocus"}
                subtitle="$100"
              >
                1
              </CalendarCustomDayButton>
              <span className="max-w-[4.5rem] text-center font-body text-[10px] text-muted-foreground">{s}</span>
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
                <CalendarCustomDayButton variant="current" state={s} subtitle="$100">
                  1
                </CalendarCustomDayButton>
                <span className="text-center font-body text-[10px] text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
