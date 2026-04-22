import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { TableCell } from "../components/TableCell";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

function TablePreview({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full max-w-2xl border-collapse bg-background text-foreground">
      <tbody>{children}</tbody>
    </table>
  );
}

const meta = {
  title: "Bricks/TableCell",
  component: TableCell,
  tags: ["autodocs"],
  args: {
    size: "default" as const,
    state: "default" as const,
    lastRow: false,
    rightTextAlign: false,
    boldText: false,
    showDescription: true,
    showRightIcon: false,
    contentVariant: "default" as const,
    text: "Table Cell Text",
    children: undefined,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "md", "lg"],
    },
    state: {
      control: "select",
      options: ["default", "hover"],
    },
    contentVariant: {
      control: "select",
      options: [
        "default",
        "badge",
        "switch",
        "avatar",
        "button",
        "dropdown",
        "progress",
        "image",
        "input",
        "toggleGroup",
      ],
    },
    rightTextAlign: { control: "boolean" },
    lastRow: { control: "boolean" },
    boldText: { control: "boolean" },
    showDescription: { control: "boolean" },
    showRightIcon: { control: "boolean" },
  },
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleCell = (args: React.ComponentProps<typeof TableCell>) => (
  <TablePreview>
    <tr>
      <TableCell {...args} />
    </tr>
  </TablePreview>
);

export const Default: Story = {
  render: (args) => singleCell(args),
};

export const BoldWithDescription: Story = {
  args: {
    boldText: true,
    text: "Table Cell Text",
    description: "Description Text",
  },
  render: (args) => singleCell(args),
};

export const RightAligned: Story = {
  args: {
    rightTextAlign: true,
    text: "Table Cell Text",
  },
  render: (args) => singleCell(args),
};

export const WithCopyIcon: Story = {
  args: {
    showRightIcon: true,
    text: "Table Cell Text",
  },
  render: (args) => singleCell(args),
};

export const HoverState: Story = {
  args: {
    state: "hover",
    text: "Table Cell Text",
  },
  render: (args) => singleCell(args),
};

export const LastRow: Story = {
  render: () => (
    <TablePreview>
      <tr>
        <TableCell text="Row with border" />
      </tr>
      <tr>
        <TableCell lastRow text="lastRow — no bottom border" />
      </tr>
    </TablePreview>
  ),
};

export const Sizes: Story = {
  render: () => (
    <TablePreview>
      <tr>
        <TableCell size="default" text="default — 52px" />
      </tr>
      <tr>
        <TableCell size="md" text="md — 72px" />
      </tr>
      <tr>
        <TableCell size="lg" lastRow text="lg — 96px" />
      </tr>
    </TablePreview>
  ),
};

export const WithBadge: Story = {
  args: {
    contentVariant: "badge",
  },
  render: (args) => (
    <TablePreview>
      <tr>
        <TableCell {...args} contentVariant="badge">
          <Badge>Badge</Badge>
        </TableCell>
      </tr>
    </TablePreview>
  ),
};

export const WithButton: Story = {
  args: {
    contentVariant: "button",
  },
  render: (args) => (
    <TablePreview>
      <tr>
        <TableCell {...args} contentVariant="button">
          <Button size="sm" type="button">
            Action
          </Button>
        </TableCell>
      </tr>
    </TablePreview>
  ),
};

/**
 * Mirrors the Figma “Table / Cell” matrix: size × state for plain text.
 */
export const FigmaTextMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body text-foreground">
      {(["default", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Size: {size}</p>
          <TablePreview>
            <tr>
              <TableCell size={size} state="default" text="Table Cell Text" />
              <TableCell size={size} state="default" rightTextAlign text="Right align" />
            </tr>
            <tr>
              <TableCell size={size} state="hover" lastRow text="Table Cell Text" />
              <TableCell
                size={size}
                state="hover"
                boldText
                lastRow
                text="Title"
                description="Desc"
              />
            </tr>
          </TablePreview>
        </div>
      ))}
    </div>
  ),
};
