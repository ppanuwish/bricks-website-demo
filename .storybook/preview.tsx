import type { Preview } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "surface", value: "#f1f1f1" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
};

export default preview;
