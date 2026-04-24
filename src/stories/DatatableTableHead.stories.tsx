import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { DatatableTableHead } from "../components/DatatableTableHead";

function HeadTableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-2xl rounded border border-border bg-background text-foreground">
      <table className="w-full border-collapse">
        <thead>{children}</thead>
      </table>
    </div>
  );
}

const meta = {
  title: "Bricks/DatatableTableHead",
  component: DatatableTableHead,
  tags: ["autodocs"],
  args: {
    variant: "checkbox" as const,
    state: "default" as const,
  },
  argTypes: {
    variant: { control: "select", options: ["checkbox", "action", "button"] },
    state: { control: "select", options: ["default", "hover"] },
  },
} satisfies Meta<typeof DatatableTableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    variant: "checkbox",
    state: "default",
  },
  render: (args) => (
    <HeadTableFrame>
      <tr>
        <DatatableTableHead {...args} />
      </tr>
    </HeadTableFrame>
  ),
};

export const Action: Story = {
  args: {
    variant: "action",
    state: "default",
  },
  render: (args) => (
    <HeadTableFrame>
      <tr>
        <DatatableTableHead {...args} />
      </tr>
    </HeadTableFrame>
  ),
};

export const ButtonSort: Story = {
  args: {
    variant: "button",
    state: "default",
    text: "Button",
  },
  render: (args) => (
    <HeadTableFrame>
      <tr>
        <DatatableTableHead {...args} />
      </tr>
    </HeadTableFrame>
  ),
};

/**
 * Figma (267:2755) — column types × (Default | Hover): Checkbox, Action, Button.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 font-body text-foreground">
      <p className="text-xs text-muted-foreground">Each row: default + hover (forced `state`) — header height 40px (`h-10`).</p>
      <HeadTableFrame>
        <tr>
          <DatatableTableHead variant="checkbox" state="default" />
          <DatatableTableHead variant="checkbox" state="hover" />
        </tr>
        <tr>
          <DatatableTableHead variant="action" state="default" />
          <DatatableTableHead variant="action" state="hover" />
        </tr>
        <tr>
          <DatatableTableHead variant="button" state="default" text="Button" />
          <DatatableTableHead variant="button" state="hover" text="Button" />
        </tr>
      </HeadTableFrame>
    </div>
  ),
};

export const WithDataRowAlignment: Story = {
  name: "With body row (cell alignment check)",
  render: () => (
    <div className="w-full max-w-2xl rounded border border-border bg-background text-foreground">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <DatatableTableHead variant="checkbox" />
            <DatatableTableHead variant="button" text="Name" className="min-w-[200px]" />
            <DatatableTableHead variant="action" />
          </tr>
        </thead>
        <tbody>
          <tr className="h-[52px] border-b border-border">
            <td className="w-[38px] min-w-[38px] max-w-[38px] border-b border-border" />
            <td className="border-b border-border px-2 align-middle">Example</td>
            <td className="w-[64px] min-w-[64px] max-w-[64px] border-b border-border" />
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
