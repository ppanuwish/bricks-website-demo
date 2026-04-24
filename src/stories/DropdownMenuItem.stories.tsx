import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuItem } from "../components/DropdownMenuItem";

const meta = {
  title: "Bricks/DropdownMenuItem",
  component: DropdownMenuItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Dropdown Menu Item Text",
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
      options: ["default", "checkbox", "radio", "icon"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "disabled", "error"],
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
} satisfies Meta<typeof DropdownMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Variant=Default, State=Default`, `Level=1` (330:8548). */
export const DefaultDefault: Story = {
  args: { variant: "default", level: "1", state: "default", showShortcut: true },
};

/** Figma `Variant=Default, State=Hover` (330:8547). */
export const DefaultHover: Story = {
  args: { variant: "default", level: "1", state: "hover", showShortcut: true },
};

/** Figma `Variant=Default, State=Disabled` (330:8543). */
export const DefaultDisabled: Story = {
  args: { variant: "default", level: "1", state: "disabled", showShortcut: true },
};

/** `Level=2` — wide left inset (plain row). */
export const DefaultLevel2: Story = {
  args: { variant: "default", level: "2", state: "default", showShortcut: true },
};

/** `Variant=Checkbox`, `Level=1` — no `Check` mark. */
export const CheckboxLevel1: Story = {
  args: { variant: "checkbox", level: "1", state: "default" },
};

/** `Variant=Checkbox`, `Level=2` — `Check` + wide left. */
export const CheckboxLevel2: Story = {
  args: { variant: "checkbox", level: "2", state: "default" },
};

export const CheckboxHover: Story = {
  args: { variant: "checkbox", level: "2", state: "hover" },
};

export const CheckboxDisabled: Story = {
  args: { variant: "checkbox", level: "2", state: "disabled" },
};

export const CheckboxNoShortcut: Story = {
  args: { variant: "checkbox", level: "2", state: "default", showShortcut: false },
};

/** `Variant=Radio`, `Level=1`. */
export const RadioLevel1: Story = {
  args: { variant: "radio", level: "1", state: "default" },
};

/** `Variant=Radio`, `Level=2` — `Circle` + wide left. */
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

/** `Variant=Icon`, `Level=1` (5197:3037). */
export const IconDefault: Story = {
  args: { variant: "icon", level: "1", state: "default" },
};

export const IconHover: Story = {
  args: { variant: "icon", level: "1", state: "hover" },
};

export const IconDisabled: Story = {
  args: { variant: "icon", level: "1", state: "disabled" },
};

/** `Variant=Icon`, `Level=2` — wide left + user icon. */
export const IconLevel2: Story = {
  args: { variant: "icon", level: "2", state: "default" },
};

/** Figma `Variant=Icon, State=Error` — destructive label + icon (17402:24651). */
export const IconError: Story = {
  args: { variant: "icon", level: "1", state: "error" },
};

export const IconNoShortcut: Story = {
  args: { variant: "icon", level: "1", state: "default", showShortcut: false },
};

/**
 * Figma `Dropdown Menu / Item` (330:8549): `Level` × variants × states plus destructive icon row.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[min(100vw-32px,980px)] flex-col gap-[var(--spacing-3)]">
      <p className="font-body text-xs font-medium text-muted-foreground">Default — Level 1 + shortcut</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="default" level="1" state="default" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" level="1" state="hover" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" level="1" state="disabled" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Default — Level 2</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="default" level="2" state="default" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" level="2" state="hover" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" level="2" state="disabled" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — Level 2</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="checkbox" level="2" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" level="2" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" level="2" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — Level 1</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="checkbox" level="1" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" level="1" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" level="1" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Radio — Level 2</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="radio" level="2" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="radio" level="2" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="radio" level="2" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Icon — Level 1</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="icon" level="1" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" level="1" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" level="1" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Icon — Level 2</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="icon" level="2" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" level="2" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" level="2" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Destructive (Icon / Error)</p>
      <DropdownMenuItem variant="icon" level="1" state="error">
        Dropdown Menu Item Text
      </DropdownMenuItem>
    </div>
  ),
};
