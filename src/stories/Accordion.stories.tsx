import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion";

const meta = {
  title: "Bricks/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-full bg-background p-4 text-foreground">
        <Story />
      </div>
    ),
  ],
  /* Satisfies StoryObj when using render(); ignored when render provides the tree */
  args: { children: null },
} satisfies Meta<typeof Accordion>;

const figmaWidthDecorator: Story["decorators"] = [
  (Story) => (
    <div className="mx-auto w-full max-w-[328px]">
      <Story />
    </div>
  ),
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  decorators: figmaWidthDecorator,
  render: () => (
    <Accordion type="single" defaultValue="a" collapsible>
      <AccordionItem value="a" variant="minimal">
        <AccordionTrigger>Trigger text</AccordionTrigger>
        <AccordionContent>This is an accordion content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" variant="minimal">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>More content for the second panel.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Filled: Story = {
  decorators: figmaWidthDecorator,
  render: () => (
    <Accordion type="single" defaultValue="a" collapsible>
      <AccordionItem value="a" variant="filled">
        <AccordionTrigger>Trigger text</AccordionTrigger>
        <AccordionContent>This is an accordion content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" variant="filled">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>More content for the second panel.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MinimalAndFilled: Story = {
  name: "Minimal & filled (Figma layout)",
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-8 sm:flex-row sm:gap-10">
      <div className="min-w-0 flex-1">
        <p className="mb-3 font-body text-xs font-medium text-muted-foreground">
          Minimal
        </p>
        <Accordion type="single" defaultValue="open" collapsible>
          <AccordionItem value="open" variant="minimal">
            <AccordionTrigger>Trigger text</AccordionTrigger>
            <AccordionContent>This is an accordion content.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="closed" variant="minimal">
            <AccordionTrigger>Trigger text</AccordionTrigger>
            <AccordionContent>This is an accordion content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-3 font-body text-xs font-medium text-muted-foreground">
          Filled
        </p>
        <Accordion type="single" defaultValue="open" collapsible>
          <AccordionItem value="open" variant="filled">
            <AccordionTrigger>Trigger text</AccordionTrigger>
            <AccordionContent>This is an accordion content.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="closed" variant="filled">
            <AccordionTrigger>Trigger text</AccordionTrigger>
            <AccordionContent>This is an accordion content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

export const Multiple: Story = {
  decorators: figmaWidthDecorator,
  render: () => (
    <Accordion type="multiple" defaultValue={["x"]}>
      <AccordionItem value="x" variant="minimal">
        <AccordionTrigger>First (starts open)</AccordionTrigger>
        <AccordionContent>Content one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="y" variant="minimal">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Content two.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
