import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";
import {
  Tooltip,
  TooltipBubble,
  TooltipContent,
  TooltipTrigger,
  type TooltipSide,
} from "../components/Tooltip";

type TooltipPlaygroundProps = {
  delayDuration: number;
  defaultOpen: boolean;
  side: TooltipSide;
  label: string;
};

function TooltipPlayground({
  delayDuration,
  defaultOpen,
  side,
  label,
}: TooltipPlaygroundProps) {
  return (
    <Tooltip defaultOpen={defaultOpen} delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <Button type="button" variant="outline">
          Hover or focus
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}

const meta = {
  title: "Bricks/Tooltip",
  component: TooltipPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Figma **Tooltip** (node `17103:809`): `bg-primary` / `text-primary-foreground`, `text-xs` / `leading-4`, horizontal padding `spacing-3`, vertical padding **6px** (`py-1.5`), `max-w-96` (384px), `rounded-[var(--radius-md)]`, and a **primary** diamond arrow for `side` top / right / bottom / left. See [shadcn Tooltip](https://ui.shadcn.com/docs/components/tooltip).",
      },
    },
  },
  args: {
    delayDuration: 300,
    defaultOpen: false,
    side: "top" as TooltipSide,
    label: "This is a tooltip",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    delayDuration: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    defaultOpen: { control: "boolean" },
  },
} satisfies Meta<typeof TooltipPlayground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSecondaryButton: Story = {
  args: {
    delayDuration: 200,
    side: "bottom",
    label: "Save your changes to the server.",
  },
  render: (args) => (
    <Tooltip defaultOpen={args.defaultOpen} delayDuration={args.delayDuration}>
      <TooltipTrigger asChild>
        <Button type="button" variant="secondary">
          Save
        </Button>
      </TooltipTrigger>
      <TooltipContent side={args.side}>{args.label}</TooltipContent>
    </Tooltip>
  ),
};

/** Static column aligned with Figma `Side` variants (arrow points toward the anchor). */
export const FigmaSides: Story = {
  args: {
    delayDuration: 300,
    defaultOpen: false,
    side: "top",
    label: "This is a tooltip",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="box-border w-full px-4 py-10 font-body">
      <div className="mx-auto flex w-max max-w-none flex-col items-center gap-10">
        {(
          [
            ["top", "Side=Top · arrow on bottom edge"],
            ["bottom", "Side=Bottom · arrow on top edge"],
            ["left", "Side=Left · arrow on right edge"],
            ["right", "Side=Right · arrow on left edge"],
          ] as const
        ).map(([side, caption]) => (
          <div key={side} className="flex flex-col items-center gap-2">
            <TooltipBubble side={side}>This is a tooltip</TooltipBubble>
            <span className="text-center text-xs text-muted-foreground">{caption}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
