import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComboboxCommandMenu } from "../components/ComboboxCommandMenu";

const meta = {
  title: "Bricks/ComboboxCommandMenu",
  component: ComboboxCommandMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    variant: "simple",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["simple", "avatars", "groups", "multiselect"],
    },
    showSearch: { control: "boolean" },
  },
  decorators: [
    (S) => (
      <div className="flex min-h-[320px] w-full max-w-[360px] items-start justify-center p-[var(--spacing-4)] font-body">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxCommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Varaint=Simple` (17379:199778). */
export const Simple: Story = {
  args: { variant: "simple" },
};

/** Figma `Varaint=Avatars` (17379:199776). */
export const Avatars: Story = {
  args: { variant: "avatars" },
};

/** Figma `Varaint=Groups` (17379:199775). */
export const Groups: Story = {
  args: { variant: "groups" },
  parameters: { layout: "padded" },
  decorators: [
    (S) => (
      <div className="flex w-full max-w-[400px] items-start justify-center p-[var(--spacing-6)] font-body">
        <S />
      </div>
    ),
  ],
};

/** Figma `Varaint=Multiselect` (17379:199777). */
export const Multiselect: Story = {
  args: { variant: "multiselect" },
};

export const AllVariants: Story = {
  name: "Figma set (4 variants on canvas)",
  render: () => (
    <div className="grid w-full max-w-[min(100vw,1100px)] grid-cols-1 gap-10 p-[var(--spacing-4)] md:grid-cols-2">
      <ComboboxCommandMenu variant="simple" data-variant="simple" />
      <ComboboxCommandMenu variant="avatars" data-variant="avatars" />
      <ComboboxCommandMenu
        className="md:col-span-2 md:mx-auto"
        variant="groups"
        data-variant="groups"
      />
      <ComboboxCommandMenu
        className="md:col-span-2 md:mx-auto"
        variant="multiselect"
        data-variant="multiselect"
      />
    </div>
  ),
  parameters: { layout: "fullscreen" },
  decorators: [(S) => <S />],
};

export const SearchBarOnly: Story = {
  name: "Search off (list only, custom layout example)",
  args: { showSearch: false, variant: "simple" },
};

export const CustomSearchPlaceholder: Story = {
  args: {
    variant: "simple",
    searchProps: { placeholder: "Filter issues…" },
  },
};
