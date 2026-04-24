import type { Meta, StoryObj } from "@storybook/react-vite";

import { CarouselArrowButton } from "../components/CarouselArrowButton";

const meta = {
  title: "Bricks/CarouselArrowButton",
  component: CarouselArrowButton,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal" as const,
    variant: "previous" as const,
    state: "default" as const,
    "aria-label": "Previous slide",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["previous", "next"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focus", "disabled"],
    },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof CarouselArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Next: Story = {
  args: {
    variant: "next",
    "aria-label": "Next slide",
  },
};

/** Both directions on one screen — use **State** in controls for hover / focus / disabled on both. */
export const TryPreviousAndNext: Story = {
  name: "Try · previous & next",
  args: {
    state: "default",
  },
  parameters: {
    controls: { exclude: ["variant", "orientation"] },
  },
  render: (args) => (
    <div className="flex flex-col gap-10 bg-background p-[var(--spacing-4)] font-body text-foreground">
      <div>
        <p className="mb-1 font-body text-sm font-medium text-foreground">Horizontal</p>
        <p className="mb-4 text-xs text-muted-foreground">ArrowLeft (previous) · ArrowRight (next)</p>
        <div className="flex flex-wrap items-center gap-[var(--spacing-4)]">
          <CarouselArrowButton
            {...args}
            orientation="horizontal"
            variant="previous"
            aria-label="Go to previous"
          />
          <CarouselArrowButton
            {...args}
            orientation="horizontal"
            variant="next"
            aria-label="Go to next"
          />
        </div>
      </div>
      <div>
        <p className="mb-1 font-body text-sm font-medium text-foreground">Vertical</p>
        <p className="mb-4 text-xs text-muted-foreground">ArrowUp (previous) · ArrowDown (next)</p>
        <div className="flex w-max flex-col items-center gap-[var(--spacing-4)]">
          <CarouselArrowButton
            {...args}
            orientation="vertical"
            variant="previous"
            aria-label="Go to previous"
          />
          <CarouselArrowButton
            {...args}
            orientation="vertical"
            variant="next"
            aria-label="Go to next"
          />
        </div>
      </div>
    </div>
  ),
};

export const VerticalPrevious: Story = {
  name: "Vertical · previous",
  args: {
    orientation: "vertical",
    variant: "previous",
    "aria-label": "Previous slide",
  },
};

export const VerticalNext: Story = {
  name: "Vertical · next",
  args: {
    orientation: "vertical",
    variant: "next",
    "aria-label": "Next slide",
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

/**
 * Figma `Carousel / CarouselArrowButton` matrix: Horizontal / Vertical × Previous / Next ×
 * Default / Hover / Focus / Disabled.
 */
export const FigmaStates: Story = {
  render: () => {
    const states = ["default", "hover", "focus", "disabled"] as const;
    return (
      <div className="flex flex-col gap-10 bg-background p-[var(--spacing-2)] font-body text-foreground">
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">Horizontal</p>
          <div className="flex flex-col gap-6">
            {(["previous", "next"] as const).map((v) => (
              <div key={v}>
                <p className="mb-2 text-xs text-muted-foreground">{v}</p>
                <div className="flex flex-wrap items-end gap-6">
                  {states.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <CarouselArrowButton
                        orientation="horizontal"
                        variant={v}
                        state={s}
                        aria-label={v === "previous" ? "Previous" : "Next"}
                      />
                      <span className="text-xs text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">Vertical</p>
          <div className="flex flex-col gap-6">
            {(["previous", "next"] as const).map((v) => (
              <div key={v}>
                <p className="mb-2 text-xs text-muted-foreground">{v}</p>
                <div className="flex flex-wrap items-end gap-6">
                  {states.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <CarouselArrowButton
                        orientation="vertical"
                        variant={v}
                        state={s}
                        aria-label={v === "previous" ? "Previous" : "Next"}
                      />
                      <span className="text-xs text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
