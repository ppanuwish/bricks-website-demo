import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenuItem } from "../components/ContextMenuItem";

const meta = {
  title: "Bricks/ContextMenuItem",
  component: ContextMenuItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Context Menu Text",
    variant: "default",
    state: "default",
    level: "1",
    shortcut: "⇧⌘P",
    showShortcut: true,
    showIndicator: true,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "checkbox", "radio"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
    },
    level: {
      control: "inline-radio",
      options: ["1", "2"],
    },
    showShortcut: { control: "boolean" },
    showIndicator: { control: "boolean" },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-md border border-border bg-popover p-[var(--spacing-2)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Variant=Default, State=Default`, `Level=1` (419:4521). */
export const DefaultDefault: Story = {
  args: { variant: "default", level: "1", state: "default", showShortcut: true },
};

/** Figma `Variant=Default, State=Hover`. */
export const DefaultHover: Story = {
  args: { variant: "default", level: "1", state: "hover", showShortcut: true },
};

/** Figma `Variant=Default, State=Disabled`. */
export const DefaultDisabled: Story = {
  args: { variant: "default", level: "1", state: "disabled", showShortcut: true },
};

/** `Level=2` — wide left inset, no leading mark (plain inset row). */
export const DefaultLevel2: Story = {
  args: { variant: "default", level: "2", state: "default", showShortcut: true },
};

/** `Variant=Checkbox`, `Level=1` — short padding, no `Check` mark. */
export const CheckboxLevel1: Story = {
  args: { variant: "checkbox", level: "1", state: "default" },
};

/** `Variant=Checkbox`, `Level=2` — wide left + `Check`. */
export const CheckboxLevel2: Story = {
  args: { variant: "checkbox", level: "2", state: "default" },
};

export const CheckboxHover: Story = {
  args: { variant: "checkbox", level: "2", state: "hover" },
};

export const CheckboxDisabled: Story = {
  args: { variant: "checkbox", level: "2", state: "disabled" },
};

/** `showShortcut={false}` on a `Level=2` checkbox row. */
export const CheckboxNoShortcut: Story = {
  args: { variant: "checkbox", level: "2", state: "default", showShortcut: false },
};

/** `Variant=Radio`, `Level=1` — no `Circle` mark. */
export const RadioLevel1: Story = {
  args: { variant: "radio", level: "1", state: "default" },
};

/** `Variant=Radio`, `Level=2` — wide left + `Circle`. */
export const RadioLevel2: Story = {
  args: { variant: "radio", level: "2", state: "default" },
};

export const RadioHover: Story = {
  args: { variant: "radio", level: "2", state: "hover" },
};

export const RadioDisabled: Story = {
  args: { variant: "radio", level: "2", state: "disabled" },
};

export const RadioNoShortcut: Story = {
  args: { variant: "radio", level: "2", state: "default", showShortcut: false },
};

/**
 * Figma `Context Menu / Item` (419:4521): `Level` × variants × states.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[min(100vw-32px,980px)] flex-col gap-[var(--spacing-3)]">
      <p className="font-body text-xs font-medium text-muted-foreground">Default — Level 1 + shortcut</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="default" level="1" state="default" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="default" level="1" state="hover" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="default" level="1" state="disabled" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Default — Level 2 (inset)</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="default" level="2" state="hover" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="default" level="2" state="disabled" showShortcut shortcut="⇧⌘P">
          Context Menu Text
        </ContextMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — Level 2 (mark + wide)</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="checkbox" level="2" state="default">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="checkbox" level="2" state="hover">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="checkbox" level="2" state="disabled">
          Context Menu Text
        </ContextMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — Level 1 (no mark)</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="checkbox" level="1" state="default">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="checkbox" level="1" state="hover">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="checkbox" level="1" state="disabled">
          Context Menu Text
        </ContextMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Radio — Level 2</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="radio" level="2" state="default">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="radio" level="2" state="hover">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="radio" level="2" state="disabled">
          Context Menu Text
        </ContextMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Radio — Level 1</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <ContextMenuItem variant="radio" level="1" state="default">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="radio" level="1" state="hover">
          Context Menu Text
        </ContextMenuItem>
        <ContextMenuItem variant="radio" level="1" state="disabled">
          Context Menu Text
        </ContextMenuItem>
      </div>
    </div>
  ),
};
