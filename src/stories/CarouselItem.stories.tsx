import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import { CarouselItem } from "../components/CarouselItem";
import type { AspectRatioRatio } from "../components/AspectRatio";

const ratios = [
  "1:1",
  "4:3",
  "16:9",
  "9:16",
] as const satisfies readonly AspectRatioRatio[];

const meta = {
  title: "Bricks/CarouselItem",
  component: CarouselItem,
  tags: ["autodocs"],
  args: {
    ratio: "1:1" as const,
  },
  argTypes: {
    ratio: {
      control: "select",
      options: [...ratios],
      description: "Figma `Aspect Ratio` variant (inner slot).",
    },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof CarouselItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma `Carousel / CarouselItem` (239:1214): 312px max, card + border + shadow/xs, 1:1 media. */
export const FigmaDefault: Story = {
  name: "Figma · default (312px, 1:1)",
  render: (args) => (
    <div className="w-full max-w-[312px] bg-background text-foreground">
      <CarouselItem {...args}>
        <img src={reactLogo} alt="" />
      </CarouselItem>
    </div>
  ),
};

export const SixteenNine: Story = {
  name: "16:9 ratio",
  args: { ratio: "16:9" },
  render: (args) => (
    <div className="w-full max-w-[312px] bg-background text-foreground">
      <CarouselItem {...args}>
        <img src={reactLogo} alt="" />
      </CarouselItem>
    </div>
  ),
};

export const PortraitNineSixteen: Story = {
  name: "9:16 ratio",
  args: { ratio: "9:16" },
  render: (args) => (
    <div className="w-full max-w-[312px] bg-background text-foreground">
      <CarouselItem {...args}>
        <img src={reactLogo} alt="" />
      </CarouselItem>
    </div>
  ),
};

export const RowPreview: Story = {
  name: "Multiple items (row)",
  render: () => (
    <div className="flex flex-wrap gap-[var(--spacing-4)] bg-background p-[var(--spacing-2)] text-foreground">
      {[1, 2, 3].map((i) => (
        <CarouselItem key={i}>
          <img src={reactLogo} alt="" />
        </CarouselItem>
      ))}
    </div>
  ),
};
