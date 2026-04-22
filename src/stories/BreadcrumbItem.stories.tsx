import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreadcrumbItem } from "../components/BreadcrumbItem";

const meta = {
  title: "Bricks/BreadcrumbItem",
  component: BreadcrumbItem,
  tags: ["autodocs"],
  args: {
    children: "Breadcrumb",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["link", "current", "dropdown", "ellipsis"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focus", "disabled"],
    },
  },
} satisfies Meta<typeof BreadcrumbItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: { variant: "link", href: "#" },
};

export const LinkCurrent: Story = {
  args: { variant: "current" },
};

export const Dropdown: Story = {
  args: { variant: "dropdown" },
};

export const Ellipsis: Story = {
  args: { variant: "ellipsis", children: undefined },
};

/** Figma matrix: variants × default & hover (use Controls for focus/disabled). */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Dropdown</p>
        <div className="flex flex-wrap gap-8">
          <BreadcrumbItem variant="dropdown" state="default" />
          <BreadcrumbItem variant="dropdown" state="hover" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Link / Link current</p>
        <div className="flex flex-wrap gap-8">
          <BreadcrumbItem variant="link" state="default" href="#" />
          <BreadcrumbItem variant="link" state="hover" href="#" />
          <BreadcrumbItem variant="current" state="default" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Ellipsis</p>
        <div className="flex flex-wrap gap-8">
          <BreadcrumbItem variant="ellipsis" state="default" />
          <BreadcrumbItem variant="ellipsis" state="hover" />
        </div>
      </div>
    </div>
  ),
};
