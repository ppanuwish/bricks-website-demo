import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";

/** Figma dev-frame style (node 17374:183180 slot placeholders). */
function DesignSlotPlaceholder() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden border border-dashed border-purple-500/50 bg-purple-500/10 p-[var(--spacing-6)]">
      <p className="min-w-0 flex-1 truncate text-center font-body text-sm leading-5 text-foreground">
        Slot (swap it with your content)
      </p>
    </div>
  );
}

const meta = {
  title: "Bricks/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma `Card` composition: header + two slot regions (content + footer). */
export const FigmaDefault: Story = {
  name: "Figma · default (420px)",
  decorators: [
    (S) => (
      <div className="w-full max-w-[420px] bg-background text-foreground">
        <S />
      </div>
    ),
  ],
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Title Text</CardTitle>
        <CardDescription>This is a card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <DesignSlotPlaceholder />
      </CardContent>
      <CardFooter>
        <DesignSlotPlaceholder />
      </CardFooter>
    </Card>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Card className="max-w-[420px]">
      <CardHeader>
        <CardTitle>Title only</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-body text-sm leading-5 text-muted-foreground">
          Content without a description in the header.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithActions: Story = {
  name: "With footer actions",
  render: () => (
    <Card className="max-w-[420px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose how you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-body text-sm leading-5 text-muted-foreground">
          Email summaries are sent once per day. You can change this anytime in settings.
        </p>
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap items-center gap-[var(--spacing-2)]">
        <Button type="button" variant="default" size="sm">
          Save
        </Button>
        <Button type="button" variant="outline" size="sm">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};
