import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import { Combobox } from "../components/Combobox";

const meta = {
  title: "Bricks/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    type: "default",
    state: "default",
    label: "Label",
    showLabel: true,
    showDescription: true,
    description: "This is a combobox description.",
    placeholder: "Placeholder",
    showAvatar: true,
  },
  argTypes: {
    type: { control: "select", options: ["default", "withGroupLabel"] },
    state: { control: "select", options: ["default", "hover", "focus", "disabled"] },
  },
  decorators: [
    (S) => (
      <div className="flex min-h-[200px] w-full max-w-[360px] items-start justify-center p-[var(--spacing-6)] font-body">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarSrc: reactLogo,
    avatarAlt: "User",
  },
};

export const WithGroupLabel: Story = {
  args: {
    type: "withGroupLabel",
    groupLabel: "Group Label",
  },
};

export const WithValue: Story = {
  name: "With value (selected text)",
  args: {
    value: "Backlog",
    placeholder: "Placeholder",
    avatarSrc: reactLogo,
  },
};

export const HoverPinned: Story = {
  name: "Hover (pinned)",
  args: { state: "hover" },
};

export const FocusPinned: Story = {
  name: "Focus (pinned)",
  args: { state: "focus" },
};

export const DisabledPinned: Story = {
  name: "Disabled (pinned)",
  args: { state: "disabled" },
};

/**
 * Figma `Combobox` (430:4114): 2 types × 4 states (left column = Default, right = With Group Label).
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="grid w-full max-w-[min(100vw,560px)] grid-cols-1 gap-x-12 gap-y-10 font-body sm:grid-cols-2">
      <Combobox
        type="default"
        state="default"
        showAvatar
        avatarSrc={reactLogo}
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="withGroupLabel"
        state="default"
        groupLabel="Group Label"
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="default"
        state="hover"
        showAvatar
        avatarSrc={reactLogo}
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="withGroupLabel"
        state="hover"
        groupLabel="Group Label"
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="default"
        state="focus"
        showAvatar
        avatarSrc={reactLogo}
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="withGroupLabel"
        state="focus"
        groupLabel="Group Label"
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="default"
        state="disabled"
        showAvatar
        avatarSrc={reactLogo}
        placeholder="Placeholder"
        description="This is a combobox description."
      />
      <Combobox
        type="withGroupLabel"
        state="disabled"
        groupLabel="Group Label"
        placeholder="Placeholder"
        description="This is a combobox description."
      />
    </div>
  ),
  parameters: { layout: "fullscreen" },
  decorators: [(S) => <S />],
};

export const NoAvatar: Story = {
  args: {
    showAvatar: false,
  },
};
