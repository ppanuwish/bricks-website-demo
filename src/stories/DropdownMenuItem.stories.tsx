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
    shortcut: "⇧⌘P",
    showShortcut: true,
    checked: false,
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
    showShortcut: { control: "boolean" },
    checked: { control: "boolean" },
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

/** Figma `Variant=Default, State=Default` (330:8548). */
export const DefaultDefault: Story = {
  args: { variant: "default", state: "default", showShortcut: true },
};

/** Figma `Variant=Default, State=Hover` (330:8547). */
export const DefaultHover: Story = {
  args: { variant: "default", state: "hover", showShortcut: true },
};

/** Figma `Variant=Default, State=Disabled` (330:8543). */
export const DefaultDisabled: Story = {
  args: { variant: "default", state: "disabled", showShortcut: true },
};

/**
 * Figma `Variant=Checkbox` — unchecked shows the empty box; checked shows fill + tick
 * (same {@link CheckboxIndicator} as {@link Checkbox}).
 */
export const CheckboxUnchecked: Story = {
  args: { variant: "checkbox", checked: false, state: "default" },
};

export const CheckboxChecked: Story = {
  args: { variant: "checkbox", checked: true, state: "default" },
};

export const CheckboxUncheckedHover: Story = {
  args: { variant: "checkbox", checked: false, state: "hover" },
};

export const CheckboxHover: Story = {
  args: { variant: "checkbox", checked: true, state: "hover" },
};

export const CheckboxUncheckedDisabled: Story = {
  args: { variant: "checkbox", checked: false, state: "disabled" },
};

export const CheckboxDisabled: Story = {
  args: { variant: "checkbox", checked: true, state: "disabled" },
};

/** Figma `Variant=Radio` — filled dot when `checked`. */
export const RadioSelected: Story = {
  args: { variant: "radio", checked: true, state: "default" },
};

export const RadioUnselected: Story = {
  args: { variant: "radio", checked: false, state: "default" },
};

export const RadioHover: Story = {
  args: { variant: "radio", checked: true, state: "hover" },
};

/** Figma `Variant=Icon` with default `Icon / User` (5197:3037). */
export const IconDefault: Story = {
  args: { variant: "icon", state: "default" },
};

export const IconHover: Story = {
  args: { variant: "icon", state: "hover" },
};

export const IconDisabled: Story = {
  args: { variant: "icon", state: "disabled" },
};

/** Figma `Variant=Icon, State=Error` — destructive label + icon (17402:24651). */
export const IconError: Story = {
  args: { variant: "icon", state: "error" },
};

/**
 * Figma `Dropdown Menu / Item` (330:8549): variants × states (Default / Hover / Disabled)
 * plus destructive icon row.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[min(100vw-32px,980px)] flex-col gap-[var(--spacing-3)]">
      <p className="font-body text-xs font-medium text-muted-foreground">Default + shortcut</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="default" state="default" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" state="hover" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="default" state="disabled" showShortcut shortcut="⇧⌘P">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — unchecked</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="checkbox" checked={false} state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" checked={false} state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" checked={false} state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Checkbox — checked</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="checkbox" checked state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" checked state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="checkbox" checked state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Radio</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="radio" checked state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="radio" checked state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="radio" checked state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Icon</p>
      <div className="grid grid-cols-1 gap-[var(--spacing-2)] md:grid-cols-3 md:gap-[var(--spacing-4)]">
        <DropdownMenuItem variant="icon" state="default">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" state="hover">
          Dropdown Menu Item Text
        </DropdownMenuItem>
        <DropdownMenuItem variant="icon" state="disabled">
          Dropdown Menu Item Text
        </DropdownMenuItem>
      </div>

      <p className="font-body text-xs font-medium text-muted-foreground">Destructive (Icon / Error)</p>
      <DropdownMenuItem variant="icon" state="error">
        Dropdown Menu Item Text
      </DropdownMenuItem>
    </div>
  ),
};
