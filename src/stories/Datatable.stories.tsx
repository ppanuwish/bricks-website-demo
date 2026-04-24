import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "../components/Button";
import { Datatable } from "../components/Datatable";

const meta = {
  title: "Bricks/Datatable",
  component: Datatable,
  tags: ["autodocs"],
  args: {
    size: "default" as const,
    rowCount: 5,
    maxTableHeight: 372,
    captionText: "Caption text",
    showCaptionBar: true,
    showFilterInput: true,
    showFilterAction: true,
  },
  argTypes: {
    size: { control: "select", options: ["default", "md", "lg"] },
    rowCount: { control: { type: "number", min: 0, max: 20, step: 1 } },
    maxTableHeight: { control: { type: "number" } },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[min(100%,833px)] p-4 font-body text-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Datatable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Figma: `Data Table` (327:695) — filters, bordered scroll region, 5 data rows, caption + pagination.
 */
export const Figma: Story = {
  render: (args) => <Datatable {...args} />,
};

export const WithPagination: Story = {
  args: {
    onPreviousPage: () => {},
    onNextPage: () => {},
    previousPageDisabled: false,
    nextPageDisabled: false,
  },
  render: (args) => <Datatable {...args} />,
};

export const TableDensityMd: Story = {
  args: {
    size: "md",
  },
  render: (args) => <Datatable {...args} />,
};

export const NoFilters: Story = {
  args: {
    showFilterInput: false,
    showFilterAction: false,
  },
  render: (args) => <Datatable {...args} />,
};

export const CustomFiltersRow: Story = {
  render: () => (
    <Datatable
      filters={
        <div className="flex w-full items-center justify-between py-[var(--spacing-4)] text-sm text-muted-foreground">
          <span>Custom filter slot</span>
          <Button type="button" variant="outline" size="sm" theme="c-law">
            Filter
          </Button>
        </div>
      }
    />
  ),
};
