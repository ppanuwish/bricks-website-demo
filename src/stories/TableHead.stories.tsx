import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { TableHead } from "../components/TableHead";
import { TableCell } from "../components/TableCell";

function TableHeadPreview({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full max-w-2xl border-collapse bg-background text-foreground">
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>
  );
}

function TableWithBody({
  head,
  bodyRow,
}: {
  head: React.ReactNode;
  bodyRow: React.ReactNode;
}) {
  return (
    <table className="w-full max-w-2xl border-collapse bg-background text-foreground">
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody>
        <tr>{bodyRow}</tr>
      </tbody>
    </table>
  );
}

const meta = {
  title: "Bricks/TableHead",
  component: TableHead,
  tags: ["autodocs"],
  args: {
    rightTextAlign: false,
    showText: true,
    state: "default" as const,
    text: "Head Text",
    children: undefined,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover"],
    },
    rightTextAlign: { control: "boolean" },
    showText: { control: "boolean" },
  },
} satisfies Meta<typeof TableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleHead = (args: React.ComponentProps<typeof TableHead>) => (
  <TableHeadPreview>
    <TableHead {...args} />
  </TableHeadPreview>
);

export const Default: Story = {
  render: (args) => singleHead(args),
};

export const RightAligned: Story = {
  args: {
    rightTextAlign: true,
    text: "Head Text",
  },
  render: (args) => singleHead(args),
};

export const HoverState: Story = {
  args: {
    state: "hover",
    text: "Head Text",
  },
  render: (args) => singleHead(args),
};

export const RightAlignedHover: Story = {
  args: {
    rightTextAlign: true,
    state: "hover",
    text: "Head Text",
  },
  render: (args) => singleHead(args),
};

/** Figma: `showText` off — same shell for custom content (e.g. sort control). */
export const WithoutTextSlot: Story = {
  args: {
    showText: false,
    text: undefined,
  },
  render: (args) => (
    <TableHeadPreview>
      <TableHead {...args} showText={false}>
        <span className="text-xs text-muted-foreground">Custom</span>
      </TableHead>
    </TableHeadPreview>
  ),
};

/**
 * Figma 2×2: Right Text Align × State, next to a body cell for context.
 * Reuses `TableCell` to show header + data alignment.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 font-body text-foreground">
      <p className="text-xs text-muted-foreground">Default state</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        <TableWithBody
          head={
            <>
              <TableHead text="Head Text" />
              <TableHead rightTextAlign text="Head Text" />
            </>
          }
          bodyRow={
            <>
              <TableCell text="Table Cell Text" lastRow />
              <TableCell text="Table Cell Text" rightTextAlign lastRow />
            </>
          }
        />
      </div>
      <p className="text-xs text-muted-foreground">Hover state (Storybook)</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        <TableWithBody
          head={
            <>
              <TableHead state="hover" text="Head Text" />
              <TableHead state="hover" rightTextAlign text="Head Text" />
            </>
          }
          bodyRow={
            <>
              <TableCell state="default" text="Table Cell Text" lastRow />
              <TableCell state="default" text="Table Cell Text" rightTextAlign lastRow />
            </>
          }
        />
      </div>
    </div>
  ),
};
