import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import { AspectRatio, type AspectRatioRatio } from "../components/AspectRatio";

const ratios = [
  "1:1",
  "4:3",
  "3:4",
  "5:4",
  "4:5",
  "3:2",
  "2:3",
  "16:10",
  "10:16",
  "16:9",
  "9:16",
  "2:1",
  "1:2",
  "1.618:1",
  "1:1.618",
  "21:9",
  "9:21",
] as const satisfies readonly AspectRatioRatio[];

const meta = {
  title: "Bricks/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  args: {
    ratio: "16:9" as const,
  },
  argTypes: {
    ratio: {
      control: "select",
      options: [...ratios],
    },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single frame with theme radius + muted surface (Figma 28:1540). */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-md">
      <AspectRatio {...args}>
        <img src={reactLogo} alt="" />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: { ratio: "1:1" },
  render: (args) => (
    <div className="w-full max-w-xs">
      <AspectRatio {...args}>
        <img src={reactLogo} alt="" />
      </AspectRatio>
    </div>
  ),
};

export const VideoSixteenNine: Story = {
  name: "16:9 (video)",
  args: { ratio: "16:9" },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <AspectRatio {...args}>
        <img src={reactLogo} alt="" />
      </AspectRatio>
    </div>
  ),
};

export const Ultrawide: Story = {
  name: "21:9",
  args: { ratio: "21:9" },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <AspectRatio {...args}>
        <img src={reactLogo} alt="" />
      </AspectRatio>
    </div>
  ),
};

export const PortraitNineSixteen: Story = {
  name: "9:16 (portrait)",
  args: { ratio: "9:16" },
  render: (args) => (
    <div className="w-56">
      <AspectRatio {...args}>
        <img src={reactLogo} alt="" />
      </AspectRatio>
    </div>
  ),
};

/** All Figma `ratio` variants at a fixed column width (preview grid). */
export const FigmaAllRatios: Story = {
  name: "Figma · all ratio variants",
  render: () => (
    <div className="grid w-full max-w-5xl grid-cols-2 gap-[var(--spacing-4)] sm:grid-cols-3 md:grid-cols-4">
      {ratios.map((ratio) => (
        <div key={ratio} className="flex min-w-0 flex-col gap-[var(--spacing-2)]">
          <p className="font-body text-xs leading-4 text-muted-foreground">{ratio}</p>
          <AspectRatio ratio={ratio} className="w-full max-w-[240px]">
            <img src={reactLogo} alt="" />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};
