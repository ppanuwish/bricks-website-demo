import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComboboxMenuItem } from "../components/ComboboxMenuItem";
import { ComboboxSearch } from "../components/ComboboxSearch";

const meta = {
  title: "Bricks/ComboboxSearch",
  component: ComboboxSearch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    placeholder: "Search",
    state: "default",
  },
  argTypes: {
    state: { control: "select", options: ["default", "focus", "disabled"] },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,300px)] rounded-[var(--radius-md)] border border-border bg-popover p-[var(--spacing-1)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FigmaDefault: Story = {
  name: "Figma (Combobox / Search, 17379:199237)",
  args: {
    placeholder: "Search",
  },
  decorators: [
    (S) => (
      <div className="w-[300px] rounded-[var(--radius-md)] border border-border bg-background p-[var(--spacing-1)] shadow-sm">
        <S />
      </div>
    ),
  ],
};

export const PinnedFocus: Story = {
  name: "Focus (pinned)",
  args: { state: "focus" },
};

export const PinnedDisabled: Story = {
  name: "Disabled (pinned)",
  args: { state: "disabled" },
};

export const Controlled: Story = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <ComboboxSearch
        value={q}
        onChange={(e) => setQ(e.currentTarget.value)}
        placeholder="Search"
        aria-label="Filter options"
      />
    );
  },
};

/**
 * `ComboboxSearch` (bottom rule) with `ComboboxMenuItem` rows, matching a combobox panel stack.
 */
export const WithList: Story = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <div className="w-[min(100vw-32px,300px)] overflow-clip rounded-[var(--radius-md)] border border-border bg-popover shadow-sm">
        <ComboboxSearch
          className="max-w-none"
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          placeholder="Search"
        />
        <div className="p-[var(--spacing-1)]">
          <ComboboxMenuItem type="simple">Backlog</ComboboxMenuItem>
          <ComboboxMenuItem type="simple">In progress</ComboboxMenuItem>
        </div>
      </div>
    );
  },
  decorators: [(S) => <S />],
};
