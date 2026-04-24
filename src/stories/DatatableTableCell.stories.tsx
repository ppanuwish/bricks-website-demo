import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DatatableTableCell } from "../components/DatatableTableCell";
import { TableSizeContext, type TableCellSize } from "../components/TableCell";

const sizes: TableCellSize[] = ["default", "md", "lg"];

function DataTableFrame({ children, tableSize = "default" as const }: { children: React.ReactNode; tableSize?: TableCellSize }) {
  return (
    <TableSizeContext.Provider value={tableSize}>
      <div className="w-full max-w-2xl rounded border border-border bg-background text-foreground">
        <table className="w-full border-collapse">
          <tbody>{children}</tbody>
        </table>
      </div>
    </TableSizeContext.Provider>
  );
}

const meta = {
  title: "Bricks/DatatableTableCell",
  component: DatatableTableCell,
  tags: ["autodocs"],
  args: {
    variant: "checkbox" as const,
    state: "default" as const,
    lastRow: false,
  },
  argTypes: {
    variant: { control: "select", options: ["checkbox", "action"] },
    state: { control: "select", options: ["default", "hover"] },
    lastRow: { control: "boolean" },
  },
} satisfies Meta<typeof DatatableTableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxDefault: Story = {
  args: {
    variant: "checkbox",
    state: "default",
  },
  render: (args) => (
    <DataTableFrame>
      <tr>
        <DatatableTableCell {...args} />
      </tr>
    </DataTableFrame>
  ),
};

export const ActionDefault: Story = {
  args: {
    variant: "action",
    state: "default",
  },
  render: (args) => (
    <DataTableFrame>
      <tr>
        <DatatableTableCell {...args} />
      </tr>
    </DataTableFrame>
  ),
};

/**
 * Figma (266:2929) — 2×2: Checkbox × (Default | Hover) and Action × (Default | Hover).
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 font-body text-foreground">
      {sizes.map((tableSize) => (
        <div key={tableSize}>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Table size (row height): {tableSize}</p>
          <DataTableFrame tableSize={tableSize}>
            <tr>
              <DatatableTableCell variant="checkbox" state="default" size={tableSize} />
              <DatatableTableCell variant="checkbox" state="hover" size={tableSize} />
            </tr>
            <tr>
              <DatatableTableCell variant="action" state="default" size={tableSize} lastRow />
              <DatatableTableCell variant="action" state="hover" size={tableSize} lastRow />
            </tr>
          </DataTableFrame>
        </div>
      ))}
    </div>
  ),
};

export const LastRow: Story = {
  render: () => (
    <DataTableFrame>
      <tr>
        <DatatableTableCell variant="action" state="default" lastRow={false} />
        <td className="border-b border-border px-2 text-sm">Row with border</td>
      </tr>
      <tr>
        <DatatableTableCell variant="action" state="default" lastRow />
        <td className="px-2 text-sm">No bottom border on `lastRow`</td>
      </tr>
    </DataTableFrame>
  ),
};
