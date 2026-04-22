import type { ComponentProps, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemState,
  type RadioGroupItemVariant,
  type RadioGroupTextWeight,
} from "../components/RadioGroup";

const twoItems: ReactNode = (
  <>
    <RadioGroupItem
      value="1"
      label="Radio Button Text"
      description="This is a radio description."
    />
    <RadioGroupItem
      value="2"
      label="Radio Button Text"
      description="This is a radio description."
    />
  </>
);

const baseArgs: ComponentProps<typeof RadioGroup> = {
  label: "Label",
  defaultValue: "1",
  children: twoItems,
};

const meta = {
  title: "Bricks/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: baseArgs,
  decorators: [
    (S) => (
      <div className="w-[min(100vw-32px,400px)] p-[var(--spacing-4)]">
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { ...baseArgs, defaultValue: "1" },
  render: function Playground() {
    const [value, setValue] = useState("1");
    return (
      <RadioGroup label="Label" value={value} onValueChange={setValue}>
        <RadioGroupItem
          value="1"
          label="Radio Button Text"
          description="This is a radio description."
        />
        <RadioGroupItem
          value="2"
          label="Radio Button Text"
          description="This is a radio description."
        />
      </RadioGroup>
    );
  },
};

export const Uncontrolled: Story = {
  args: baseArgs,
  render: () => (
    <RadioGroup label="Group" defaultValue="x" aria-label="Example options">
      <RadioGroupItem value="x" label="Option A" description="Helper text for A." />
      <RadioGroupItem value="y" label="Option B" description="Helper text for B." />
    </RadioGroup>
  ),
};

export const DefaultAndBox: Story = {
  args: baseArgs,
  render: () => (
    <div className="flex w-full max-w-[480px] flex-col gap-[var(--spacing-6)]">
      <div>
        <p className="mb-[var(--spacing-3)] font-body text-sm font-semibold text-foreground">
          Type: default
        </p>
        <RadioGroup label="Label" defaultValue="1">
          <RadioGroupItem
            value="1"
            label="Radio Button Text"
            description="This is a radio description."
            variant="default"
          />
          <RadioGroupItem
            value="2"
            label="Radio Button Text"
            description="This is a radio description."
            variant="default"
          />
        </RadioGroup>
      </div>
      <div>
        <p className="mb-[var(--spacing-3)] font-body text-sm font-semibold text-foreground">
          Type: box
        </p>
        <RadioGroup label="Label" defaultValue="1">
          <RadioGroupItem
            value="1"
            label="Radio Button Text"
            description="This is a radio description."
            variant="box"
          />
          <RadioGroupItem
            value="2"
            label="Radio Button Text"
            description="This is a radio description."
            variant="box"
          />
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const TextWeight: Story = {
  args: baseArgs,
  render: () => (
    <div className="flex w-full max-w-[480px] flex-col gap-[var(--spacing-4)]">
      <RadioGroup label="Medium" defaultValue="m1">
        <RadioGroupItem
          value="m1"
          label="Radio Button Text"
          textWeight="medium"
          showDescription={false}
        />
        <RadioGroupItem
          value="m2"
          label="Radio Button Text"
          textWeight="medium"
          showDescription={false}
        />
      </RadioGroup>
      <RadioGroup label="Regular" defaultValue="r1">
        <RadioGroupItem
          value="r1"
          label="Radio Button Text"
          textWeight="regular"
          showDescription={false}
        />
        <RadioGroupItem
          value="r2"
          label="Radio Button Text"
          textWeight="regular"
          showDescription={false}
        />
      </RadioGroup>
    </div>
  ),
  parameters: { layout: "padded" },
};

const stateOptions: RadioGroupItemState[] = ["default", "focus", "disabled"];
const typeOptions: RadioGroupItemVariant[] = ["default", "box"];
const labelWeight: RadioGroupTextWeight[] = ["medium", "regular"];

export const FigmaMatrix: Story = {
  args: baseArgs,
  render: () => (
    <div className="flex w-full max-w-[900px] flex-col gap-10">
      {typeOptions.map((itemVariant) => (
        <div key={itemVariant} className="flex flex-col gap-4">
          <p className="font-body text-sm font-semibold text-foreground">
            Figma `Type` = {itemVariant}
          </p>
          {labelWeight.map((tw) => (
            <div key={`${itemVariant}-${tw}`} className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">Font: {tw}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stateOptions.map((st) => (
                  <div key={st} className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-muted-foreground">State: {st}</p>
                    <RadioGroup label="Label" defaultValue="on" aria-label="Matrix">
                      <RadioGroupItem
                        value="on"
                        label="Radio Button Text"
                        description="This is a radio description."
                        variant={itemVariant}
                        textWeight={tw}
                        state={st}
                      />
                      <RadioGroupItem
                        value="off"
                        label="Radio Button Text"
                        description="This is a radio description."
                        variant={itemVariant}
                        textWeight={tw}
                        state={st}
                      />
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

export const LabelOnly: Story = {
  args: baseArgs,
  render: () => (
    <RadioGroup label="No descriptions" defaultValue="1">
      <RadioGroupItem value="1" label="Option one" showDescription={false} />
      <RadioGroupItem value="2" label="Option two" showDescription={false} />
    </RadioGroup>
  ),
};
