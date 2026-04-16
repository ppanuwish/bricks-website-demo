import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        MemoryRouter,
        { initialEntries: ["/"] },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;