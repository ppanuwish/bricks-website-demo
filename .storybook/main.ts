import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
    });
  },
};

export default config;