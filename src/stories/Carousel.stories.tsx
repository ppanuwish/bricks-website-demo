import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  type CarouselBreakpoint,
  type CarouselOrientation,
} from "../components/Carousel";
import { CarouselItem } from "../components/CarouselItem";

function SlideImage({ label }: { label: string }) {
  return (
    <CarouselItem className="max-w-none h-full w-full" aspectRatioClassName="min-h-0">
      <div className="relative flex size-full flex-col items-center justify-center gap-[var(--spacing-2)] bg-muted/40">
        <img src={reactLogo} alt="" className="size-12 object-contain opacity-80" />
        <span className="font-body text-xs text-muted-foreground">{label}</span>
      </div>
    </CarouselItem>
  );
}

const meta = {
  title: "Bricks/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal" as const,
    breakpoint: "sm" as const,
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"] satisfies CarouselOrientation[],
    },
    breakpoint: {
      control: "select",
      options: ["sm", "md", "lg"] satisfies CarouselBreakpoint[],
    },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Carousel` (241:1368) — shell + arrows + `CarouselItem` slides. */
export const Default: Story = {
  render: (args) => (
    <div className="bg-background text-foreground">
      <Carousel {...args} className="mx-auto max-w-[480px]">
        <CarouselContent>
          {["A", "B", "C", "D", "E"].map((id) => (
            <CarouselSlide key={id}>
              <SlideImage label={`Slide ${id}`} />
            </CarouselSlide>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous slides" />
        <CarouselNext aria-label="Next slides" />
      </Carousel>
    </div>
  ),
};

export const HorizontalMd: Story = {
  name: "Horizontal · md (2 visible)",
  args: { orientation: "horizontal", breakpoint: "md" },
  render: Default.render,
};

export const HorizontalLg: Story = {
  name: "Horizontal · lg (3 visible)",
  args: { orientation: "horizontal", breakpoint: "lg" },
  render: Default.render,
};

export const VerticalSm: Story = {
  name: "Vertical · sm",
  args: { orientation: "vertical", breakpoint: "sm" },
  render: Default.render,
};

export const VerticalMd: Story = {
  name: "Vertical · md",
  args: { orientation: "vertical", breakpoint: "md" },
  render: Default.render,
};
