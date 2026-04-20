import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  InputOTP,
  InputOTPField,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  type InputOTPState,
} from "../components/InputOTP";

function Slots6({ maxLength = 6 }: { maxLength?: number }) {
  return (
    <>
      {Array.from({ length: maxLength }, (_, i) => (
        <InputOTPSlot key={i} index={i} />
      ))}
    </>
  );
}

const meta = {
  title: "Bricks/Input OTP",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (S) => (
      <div className="bg-background p-6">
        <S />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <InputOTP maxLength={6} value={value} onValueChange={setValue}>
        <InputOTPGroup>
          <Slots6 />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const WithFieldLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <InputOTPField
        otpProps={{ maxLength: 6, value, onValueChange: setValue }}
        label="Verification code"
        description="We sent a 6-digit code to your phone."
      >
        <InputOTPGroup>
          <Slots6 />
        </InputOTPGroup>
      </InputOTPField>
    );
  },
};

export const WithSeparator: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <InputOTP maxLength={6} value={value} onValueChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSeparator />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const Invalid: Story = {
  render: function Render() {
    const [value, setValue] = useState("12");
    return (
      <InputOTP maxLength={6} value={value} onValueChange={setValue} invalid>
        <InputOTPGroup>
          <Slots6 />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const FigmaStateGrid: Story = {
  name: "Figma states (OTP)",
  render: () => {
    const states = [
      "default",
      "hover",
      "focus",
      "active",
      "disabled",
      "error",
      "error-focus",
      "filled",
    ] as const satisfies readonly InputOTPState[];

    const valueFor = (s: InputOTPState) => {
      if (s === "filled") return "123456";
      if (s === "focus" || s === "error-focus") return "12";
      if (s === "active") return "1";
      return "";
    };

    return (
      <div className="grid max-w-[920px] grid-cols-2 gap-x-10 gap-y-8 bg-background p-4">
        {states.map((s) => (
          <div key={s} className="flex flex-col gap-2">
            <p className="font-body text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {s}
            </p>
            <InputOTP maxLength={6} value={valueFor(s)} state={s}>
              <InputOTPGroup>
                <Slots6 />
              </InputOTPGroup>
            </InputOTP>
          </div>
        ))}
      </div>
    );
  },
};
