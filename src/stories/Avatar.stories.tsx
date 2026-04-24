import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";

const meta = {
  title: "Bricks/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    size: "12" as const,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["5", "6", "8", "10", "12"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={reactLogo} alt="Sample user" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const ImageErrorUsesFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://invalid.example/404.jpg" alt="" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const AllSizesImage: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {(["12", "10", "8", "6", "5"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={reactLogo} alt={`Size ${size}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const AllSizesFallback: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {(["12", "10", "8", "6", "5"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
