import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbListItem,
  BreadcrumbSeparator,
  type BreadcrumbSegment,
} from "../components/Breadcrumb";
import { BreadcrumbItem } from "../components/BreadcrumbItem";

/** Figma `Breadcrumb` (node 109:947): Link → Ellipsis → Dropdown → Link ×2 → Current */
const figmaSegments: BreadcrumbSegment[] = [
  { type: "link", label: "Breadcrumb", href: "#" },
  { type: "ellipsis" },
  { type: "dropdown", label: "Breadcrumb" },
  { type: "link", label: "Breadcrumb", href: "#" },
  { type: "link", label: "Breadcrumb", href: "#" },
  { type: "current", label: "Breadcrumb" },
];

const meta = {
  title: "Bricks/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FigmaMd: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList size="md" items={figmaSegments} />
    </Breadcrumb>
  ),
};

export const FigmaSm: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList size="sm" items={figmaSegments} />
    </Breadcrumb>
  ),
};

/** Manual composition (shadcn-style). */
export const Composed: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList size="md">
        <BreadcrumbListItem>
          <BreadcrumbItem variant="link" href="#">
            Home
          </BreadcrumbItem>
        </BreadcrumbListItem>
        <BreadcrumbSeparator />
        <BreadcrumbListItem>
          <BreadcrumbItem variant="link" href="#">
            Section
          </BreadcrumbItem>
        </BreadcrumbListItem>
        <BreadcrumbSeparator />
        <BreadcrumbListItem>
          <BreadcrumbItem variant="current">Page</BreadcrumbItem>
        </BreadcrumbListItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
