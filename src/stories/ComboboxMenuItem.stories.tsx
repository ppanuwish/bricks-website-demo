import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import reactLogo from "../assets/react.svg";
import { ComboboxMenuItem } from "../components/ComboboxMenuItem";

const meta = {
  title: "Bricks/ComboboxMenuItem",
  component: ComboboxMenuItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Backlog",
    type: "simple",
    state: "default",
    selected: false,
  },
  argTypes: {
    type: { control: "select", options: ["simple", "icon", "avatar", "checkbox"] },
    state: { control: "select", options: ["default", "hover"] },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,300px)] rounded-[var(--radius-md)] border border-border bg-popover p-[var(--spacing-4)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconType: Story = {
  args: { type: "icon" },
};

export const AvatarType: Story = {
  args: { type: "avatar", avatarSrc: reactLogo, avatarAlt: "User" },
};

export const CheckboxType: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <ComboboxMenuItem type="checkbox" selected={on} onCheckedChange={setOn}>
        Backlog
      </ComboboxMenuItem>
    );
  },
};

export const SelectedWithCheck: Story = {
  args: { type: "simple", selected: true },
};

export const HoverPinned: Story = {
  args: { state: "hover" },
};

/**
 * Figma `Combobox / Menu / Item` (17379:199232): default vs hover, four types. Checkbox column shows
 * checked; others use trailing `Icon / Check` only when `selected` is on.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-3)]">
      <div className="grid w-full min-w-0 max-w-[280px] grid-cols-1 gap-y-[var(--spacing-1)] sm:max-w-full sm:grid-cols-2 sm:grid-rows-2 sm:gap-[var(--spacing-4)] lg:grid-cols-4">
        <ComboboxMenuItem type="checkbox" selected onCheckedChange={() => undefined}>
          Backlog
        </ComboboxMenuItem>
        <ComboboxMenuItem type="simple">Backlog</ComboboxMenuItem>
        <ComboboxMenuItem type="icon">Backlog</ComboboxMenuItem>
        <ComboboxMenuItem type="avatar" avatarSrc={reactLogo} avatarAlt="">
          Backlog
        </ComboboxMenuItem>
      </div>
      <div className="grid w-full min-w-0 max-w-[280px] grid-cols-1 gap-y-[var(--spacing-1)] sm:max-w-full sm:grid-cols-2 sm:grid-rows-2 sm:gap-[var(--spacing-4)] lg:grid-cols-4">
        <ComboboxMenuItem type="checkbox" selected state="hover" onCheckedChange={() => undefined}>
          Backlog
        </ComboboxMenuItem>
        <ComboboxMenuItem type="simple" state="hover">
          Backlog
        </ComboboxMenuItem>
        <ComboboxMenuItem type="icon" state="hover">
          Backlog
        </ComboboxMenuItem>
        <ComboboxMenuItem type="avatar" avatarSrc={reactLogo} avatarAlt="" state="hover">
          Backlog
        </ComboboxMenuItem>
      </div>
    </div>
  ),
};

export const FigmaWithTrailingCheck: Story = {
  name: "Figma matrix (selected + check)",
  render: () => (
    <div className="grid w-full max-w-[280px] grid-cols-1 gap-y-[var(--spacing-1)] sm:max-w-full sm:grid-cols-2 sm:grid-rows-2 sm:gap-[var(--spacing-4)] lg:grid-cols-4">
      <ComboboxMenuItem type="simple" selected>
        Backlog
      </ComboboxMenuItem>
      <ComboboxMenuItem type="icon" selected>
        Backlog
      </ComboboxMenuItem>
      <ComboboxMenuItem type="avatar" avatarSrc={reactLogo} avatarAlt="" selected>
        Backlog
      </ComboboxMenuItem>
      <ComboboxMenuItem type="checkbox" selected onCheckedChange={() => undefined}>
        Backlog
      </ComboboxMenuItem>
    </div>
  ),
};
