import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandHeading,
  CommandList,
  CommandSeparator,
} from "../components/Command";
import { CommandInput } from "../components/CommandInput";
import { CommandItem } from "../components/CommandItem";

const meta = {
  title: "Bricks/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    variant: "suggestions",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["suggestions", "empty"] },
  },
  decorators: [
    (S) => (
      <div className="flex w-[min(100vw-32px,540px)] justify-center p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Command {...args}>
      <CommandInput className="max-w-none shrink-0" placeholder="Type a command or search" />
      <CommandList>
        <CommandGroup>
          <CommandHeading>Heading Text</CommandHeading>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/** Figma `Variant=Suggestions` (204:1143): input, two groups with heading + icon rows, separator. */
export const Suggestions: Story = {
  args: { variant: "suggestions" },
  render: (args) => (
    <Command {...args}>
      <CommandInput className="max-w-none shrink-0" placeholder="Type a command or search" />
      <CommandList>
        <CommandGroup>
          <CommandHeading>Heading Text</CommandHeading>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandHeading>Heading Text</CommandHeading>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
          <CommandItem variant="icon" className="max-w-none w-full" showShortcut shortcut="⌘P">
            Command Item Text
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/** Figma `Variant=Empty` (204:1142): input + centered empty copy. */
export const Empty: Story = {
  args: { variant: "empty" },
  render: (args) => (
    <Command {...args}>
      <CommandInput className="max-w-none shrink-0" placeholder="Placeholder" />
      <CommandEmpty />
    </Command>
  ),
};
