import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "../components/SectionHeader";

const meta = {
  title: "Bricks/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    tag: "Product",
    title: "Build workflows your teams already understand",
    sub: "Reuse familiar tools and patterns so adoption stays fast and training stays light.",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CenteredOnDarkSection: Story = {
  args: {
    center: true,
    sub: "Header uses bg-background on a dark band.",
  },
  decorators: [
    (S) => (
      <div className="bg-bricks-darkgray px-6 py-16">
        <S />
      </div>
    ),
  ],
};

export const WithoutTag: Story = {
  args: { tag: undefined },
};
