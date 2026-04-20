import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../components/Form";

const meta = {
  title: "Bricks/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="max-w-full bg-background p-4">
        <S />
      </div>
    ),
  ],
  args: {
    layout: "basic",
    breakpoint: "desktop",
    title: "Title Text",
    description: "This is a card description.",
    primaryActionText: "Deploy",
    secondaryActionText: "Cancel",
  },
  argTypes: {
    layout: {
      control: "select",
      options: [
        "basic",
        "select-switch",
        "combobox-textarea",
        "date-checkbox",
        "textarea-checkbox",
        "split-choice",
        "split-simple",
      ],
    },
    breakpoint: {
      control: "inline-radio",
      options: ["desktop", "mobile"],
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Basic: Story = {
  args: {
    layout: "basic",
    primaryActionText: "Deploy",
  },
};

export const SelectAndSwitch: Story = {
  args: {
    layout: "select-switch",
  },
};

export const ComboboxAndTextarea: Story = {
  args: {
    layout: "combobox-textarea",
  },
};

export const DateAndCheckbox: Story = {
  args: {
    layout: "date-checkbox",
  },
};

export const TextareaAndCheckbox: Story = {
  args: {
    layout: "textarea-checkbox",
  },
};

export const SplitChoiceDesktop: Story = {
  args: {
    layout: "split-choice",
    breakpoint: "desktop",
  },
};

export const SplitChoiceMobile: Story = {
  args: {
    layout: "split-choice",
    breakpoint: "mobile",
  },
};

export const SplitSimpleDesktop: Story = {
  args: {
    layout: "split-simple",
    breakpoint: "desktop",
  },
};

export const SplitSimpleMobile: Story = {
  args: {
    layout: "split-simple",
    breakpoint: "mobile",
  },
};
