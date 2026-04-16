import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import {
  ThemeStorybookBridge,
  storybookModeFromGlobal,
  storybookThemeFromGlobal,
} from "./ThemeStorybookBridge";
import "../src/styles/theme.css";
import "../src/index.css";

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Design tokens (html data-theme)",
      defaultValue: "bricks",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "bricks", title: "Bricks" },
          { value: "c-law", title: "C Law" },
          { value: "nia", title: "NIA" },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "Light or dark surface mode",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        MemoryRouter,
        { initialEntries: ["/"] },
        createElement(
          ThemeProvider,
          null,
          createElement(
            ThemeStorybookBridge,
            {
              theme: storybookThemeFromGlobal(context.globals.brand),
              mode: storybookModeFromGlobal(context.globals.colorMode),
            },
            createElement(Story),
          ),
        ),
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