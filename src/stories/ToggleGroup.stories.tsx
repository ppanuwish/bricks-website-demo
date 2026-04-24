import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../components/ToggleGroup";

const meta = {
  title: "Bricks/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 132:946: three default toggles (icon-only), `gap: var(--spacing-1)` */
export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="bold" aria-label="Text formatting" className="justify-center">
      <ToggleGroupItem value="bold" aria-label="Bold" showIcon>
        {null}
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic" showIcon={false} icon={<Italic className="h-4 w-4 shrink-0" strokeWidth={2.5} />}>
        {null}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        aria-label="Underline"
        showIcon={false}
        icon={<Underline className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
      >
        {null}
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const FigmaDefault: Story = {
  name: "Figma (3× Bold, icon only)",
  render: () => (
    <ToggleGroup type="single" defaultValue="b1" aria-label="Bold toggles" className="justify-center">
      <ToggleGroupItem value="b1" aria-label="Bold 1" showIcon>
        {null}
      </ToggleGroupItem>
      <ToggleGroupItem value="b2" aria-label="Bold 2" showIcon>
        {null}
      </ToggleGroupItem>
      <ToggleGroupItem value="b3" aria-label="Bold 3" showIcon>
        {null}
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleWithLabels: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment" className="w-full max-w-sm justify-start">
      <ToggleGroupItem value="left" showIcon={false}>
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" showIcon={false}>
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" showIcon={false}>
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleControlled: Story = {
  render: function SingleControlled() {
    const [v, setV] = useState("b");
    return (
      <div className="flex w-full max-w-sm flex-col gap-[var(--spacing-4)]">
        <ToggleGroup type="single" value={v} onValueChange={setV} aria-label="Format">
          <ToggleGroupItem value="a" showIcon={false}>
            A
          </ToggleGroupItem>
          <ToggleGroupItem value="b" showIcon={false}>
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="c" showIcon={false}>
            C
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="font-body text-sm text-muted-foreground">Value: {v || "(empty)"}</p>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: function Multiple() {
    const [v, setV] = useState<string[]>(["bold", "italic"]);
    return (
      <div className="flex w-full max-w-sm flex-col gap-[var(--spacing-4)]">
        <ToggleGroup type="multiple" value={v} onValueChange={setV} aria-label="Text styling">
          <ToggleGroupItem value="bold" showIcon>
            {null}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            showIcon={false}
            icon={<Italic className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />}
          >
            {null}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            showIcon={false}
            icon={<Underline className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />}
          >
            {null}
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="font-body text-sm text-muted-foreground">Selected: {v.join(", ") || "—"}</p>
      </div>
    );
  },
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="one" variant="outline" aria-label="Outline group" className="justify-center">
      <ToggleGroupItem value="one" showIcon>
        One
      </ToggleGroupItem>
      <ToggleGroupItem value="two" showIcon>
        Two
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup
      type="single"
      defaultValue="1"
      orientation="vertical"
      className="items-stretch"
      aria-label="Vertical"
    >
      <ToggleGroupItem value="1">First</ToggleGroupItem>
      <ToggleGroupItem value="2">Second</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="a" disabled aria-label="Disabled" className="justify-center">
      <ToggleGroupItem value="a" showIcon>
        {null}
      </ToggleGroupItem>
      <ToggleGroupItem value="b" showIcon>
        {null}
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
