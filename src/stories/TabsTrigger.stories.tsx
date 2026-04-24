import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabsTrigger } from "../components/TabsTrigger";

const meta = {
  title: "Bricks/TabsTrigger",
  component: TabsTrigger,
  tags: ["autodocs"],
  args: {
    children: "Tabs Text",
    active: false,
    state: "default" as const,
    badge: false,
    showIcon: false,
    type: "button" as const,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focus", "disabled"],
    },
  },
} satisfies Meta<typeof TabsTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const Focus: Story = {
  args: { active: true, state: "focus" },
};

export const Disabled: Story = {
  args: { active: false, state: "disabled" },
};

export const WithBadge: Story = {
  args: { active: true, badge: true, badgeContent: "8" },
};

export const WithIcon: Story = {
  args: { active: true, showIcon: true },
};

export const FigmaStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body">
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <TabsTrigger active state="default">
            Tabs Text
          </TabsTrigger>
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <TabsTrigger active state="focus">
            Tabs Text
          </TabsTrigger>
          <span className="text-xs text-muted-foreground">Focus</span>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <TabsTrigger active={false} state="default">
            Tabs Text
          </TabsTrigger>
          <span className="text-xs text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <TabsTrigger active={false} state="disabled">
            Tabs Text
          </TabsTrigger>
          <span className="text-xs text-muted-foreground">Disabled</span>
        </div>
      </div>
    </div>
  ),
};
