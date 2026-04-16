import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/AlertDialog";

const meta = {
  title: "Bricks/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    onCancel: fn(),
    onContinue: fn(),
  },
  argTypes: {
    breakpoint: {
      control: "inline-radio",
      options: ["md", "sm"],
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderDialog(args: Story["args"]) {
  const isSm = args?.breakpoint === "sm";
  const title = (args?.title as string | undefined) ?? "Title Text";
  const description =
    (args?.description as string | undefined) ??
    "This is an alert dialog description.";
  const continueText = (args?.continueText as string | undefined) ?? "Continue";
  const cancelText = (args?.cancelText as string | undefined) ?? "Cancel";
  return (
    <AlertDialog breakpoint={isSm ? "sm" : "md"}>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        {isSm ? (
          <>
            <AlertDialogAction fullWidth onClick={args?.onContinue}>
              {continueText}
            </AlertDialogAction>
            <AlertDialogCancel fullWidth onClick={args?.onCancel}>
              {cancelText}
            </AlertDialogCancel>
          </>
        ) : (
          <>
            <AlertDialogCancel onClick={args?.onCancel}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={args?.onContinue}>{continueText}</AlertDialogAction>
          </>
        )}
      </AlertDialogFooter>
    </AlertDialog>
  );
}

export const Medium: Story = {
  name: "Breakpoint md",
  decorators: [
    (S) => (
      <div className="w-full max-w-[512px] bg-background">
        <S />
      </div>
    ),
  ],
  args: {
    breakpoint: "md",
    title: "Title Text",
    description: "This is an alert dialog description.",
    cancelText: "Cancel",
    continueText: "Continue",
  },
  render: renderDialog,
};

export const Small: Story = {
  name: "Breakpoint sm",
  decorators: [
    (S) => (
      <div className="w-full max-w-[512px] bg-background">
        <S />
      </div>
    ),
  ],
  args: {
    breakpoint: "sm",
    title: "Title Text",
    description: "This is an alert dialog description.",
    cancelText: "Cancel",
    continueText: "Continue",
  },
  render: renderDialog,
};

export const CustomCopy: Story = {
  args: {
    breakpoint: "md",
    title: "Delete this project?",
    description:
      "This action cannot be undone. This will permanently delete your project and all associated data.",
    cancelText: "Keep project",
    continueText: "Delete project",
  },
  render: renderDialog,
};

export const SideBySideSpec: Story = {
  name: "Figma layout (md + sm)",
  render: (args) => (
    <div className="flex w-full max-w-[552px] flex-col gap-8 bg-background p-5">
      {renderDialog({ ...args, breakpoint: "md" })}
      {renderDialog({ ...args, breakpoint: "sm" })}
    </div>
  ),
};
