import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandItem } from "../components/CommandItem";

const meta = {
  title: "Bricks/CommandItem",
  component: CommandItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: "Command Item Text",
    variant: "default",
    state: "default",
    selected: false,
    showShortcut: false,
    shortcut: "⌘P",
    disabled: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "icon"] },
    state: { control: "select", options: ["default", "hover", "disabled"] },
    selected: { control: "boolean" },
    showShortcut: { control: "boolean" },
  },
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,360px)] rounded-md border border-border bg-popover p-[var(--spacing-2)] text-popover-foreground shadow-sm">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof CommandItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Variant=Default, State=Default, Selected=No` (430:6290). */
export const DefaultUnselected: Story = {
  args: { variant: "default", selected: false, state: "default" },
};

/** Figma `Variant=Default, State=Default, Selected=Yes` (345:8656). */
export const DefaultSelected: Story = {
  args: { variant: "default", selected: true, state: "default" },
};

/** Figma `Variant=Default, State=Hover, Selected=No` (430:6302). */
export const DefaultHover: Story = {
  args: { variant: "default", selected: false, state: "hover" },
};

/** Figma `Variant=Default, State=Hover, Selected=Yes` (345:8649). */
export const DefaultHoverSelected: Story = {
  args: { variant: "default", selected: true, state: "hover" },
};

/** Figma `Variant=Default, State=Disabled, Selected=No` (430:6296). */
export const DefaultDisabled: Story = {
  args: { variant: "default", selected: false, state: "disabled" },
};

/** Figma `Variant=Default, State=Disabled, Selected=Yes` (345:8655). */
export const DefaultDisabledSelected: Story = {
  args: { variant: "default", selected: true, state: "disabled" },
};

/** `showShortcut` works with `variant="default"` (not only icon). */
export const DefaultWithShortcut: Story = {
  args: { variant: "default", showShortcut: true, shortcut: "⌘K", selected: false },
};

/** Figma `Variant=Icon, State=Default, Selected=No` (345:8647). */
export const IconDefault: Story = {
  args: { variant: "icon", state: "default", showShortcut: true },
};

/** Figma `Variant=Icon, State=Hover, Selected=No` (345:8648). */
export const IconHover: Story = {
  args: { variant: "icon", state: "hover", showShortcut: true },
};

/** Figma `Variant=Icon, State=Disabled, Selected=No` (345:8651). */
export const IconDisabled: Story = {
  args: { variant: "icon", state: "disabled", showShortcut: true },
};

/**
 * Figma `Command / Item / Default` (345:8657): three states × default (text ± check) vs icon + shortcut.
 */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex w-full max-w-[min(100vw-32px,980px)] flex-col gap-[var(--spacing-2)]">
      {(
        [
          { state: "default" as const },
          { state: "hover" as const },
          { state: "disabled" as const },
        ] as const
      ).map(({ state }) => (
        <div
          key={state}
          className="grid grid-cols-1 gap-[var(--spacing-1)] md:grid-cols-3 md:gap-[var(--spacing-3)]"
        >
          <CommandItem variant="default" selected state={state}>
            Command Item Text
          </CommandItem>
          <CommandItem variant="default" state={state}>
            Command Item Text
          </CommandItem>
          <CommandItem variant="icon" state={state} showShortcut={true} shortcut="⌘P">
            Command Item Text
          </CommandItem>
        </div>
      ))}
    </div>
  ),
};
