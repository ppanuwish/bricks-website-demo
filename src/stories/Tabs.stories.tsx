import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsList, TabsTrigger } from "../components/Tabs";

const twoTabList = (
  <TabsList aria-label="Example tabs">
    <TabsTrigger value="1">Tabs Text</TabsTrigger>
    <TabsTrigger value="2">Tabs Text</TabsTrigger>
  </TabsList>
);

const meta = {
  title: "Bricks/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    defaultValue: "1",
    className: "max-w-[400px]",
    children: twoTabList,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeTabs: Story = {
  args: {
    defaultValue: "1",
    children: (
      <TabsList aria-label="Three tabs">
        <TabsTrigger value="1">Tabs Text</TabsTrigger>
        <TabsTrigger value="2">Tabs Text</TabsTrigger>
        <TabsTrigger value="3">Tabs Text</TabsTrigger>
      </TabsList>
    ),
  },
};

export const EightTabs: Story = {
  args: {
    defaultValue: "1",
    children: (
      <TabsList aria-label="Eight tabs">
        {["1", "2", "3", "4", "5", "6", "7", "8"].map((id) => (
          <TabsTrigger key={id} value={id}>
            Tabs Text
          </TabsTrigger>
        ))}
      </TabsList>
    ),
  },
};

export const Controlled: Story = {
  args: {
    defaultValue: "1",
    className: "max-w-[400px]",
    children: twoTabList,
  },
  render: function ControlledStory() {
    const [value, setValue] = useState("2");
    return (
      <div className="flex w-full max-w-[400px] flex-col gap-4 font-body">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList aria-label="Controlled tabs">
            <TabsTrigger value="1">Tabs Text</TabsTrigger>
            <TabsTrigger value="2">Tabs Text</TabsTrigger>
            <TabsTrigger value="3">Tabs Text</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-center text-xs text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};
