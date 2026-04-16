import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "../components/Alert";

const meta = {
  title: "Bricks/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
  subcomponents: {
    AlertIcon,
    AlertContent,
    AlertTitle,
    AlertDescription,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTitle = "Alert Title";
const sampleDescription = "This is an alert description.";

export const DefaultLong: Story = {
  name: "Default · long (640px)",
  decorators: [
    (S) => (
      <div className="w-full max-w-[640px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Alert variant="default">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
        <AlertDescription>{sampleDescription}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const DefaultShort: Story = {
  name: "Default · short (320px)",
  decorators: [
    (S) => (
      <div className="w-full max-w-[320px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Alert variant="default">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
        <AlertDescription>{sampleDescription}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const DestructiveLong: Story = {
  name: "Destructive · long",
  decorators: [
    (S) => (
      <div className="w-full max-w-[640px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Alert variant="destructive">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
        <AlertDescription>{sampleDescription}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const DestructiveShort: Story = {
  name: "Destructive · short",
  decorators: [
    (S) => (
      <div className="w-full max-w-[320px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Alert variant="destructive">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
        <AlertDescription>{sampleDescription}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert variant="default" className="max-w-[640px]">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
      </AlertContent>
    </Alert>
  ),
};

export const WithAction: Story = {
  name: "With action (Undo)",
  decorators: [
    (S) => (
      <div className="w-full max-w-[640px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Alert
      variant="default"
      action={
        <Button variant="outline" size="sm" className="h-6 px-3 py-2 text-xs">
          Undo
        </Button>
      }
    >
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{sampleTitle}</AlertTitle>
        <AlertDescription>{sampleDescription}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Alert variant="default" className="max-w-[640px]">
      <AlertIcon>
        <span className="flex size-4 shrink-0 items-center justify-center font-body text-xs font-semibold text-foreground">
          !
        </span>
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Custom icon slot</AlertTitle>
        <AlertDescription>Pass any node as children of AlertIcon.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};
