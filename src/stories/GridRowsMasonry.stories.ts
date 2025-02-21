import type { Meta, StoryObj } from "@storybook/html";

import exampleHtml from "./example.html?raw";
import example2Html from "./example2.html?raw";
import { GridRowsMasonry } from "../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Grid Rows Masonry",
  tags: ["autodocs"],
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: StoryObj = {
  render: () => exampleHtml,
  play: async ({ canvasElement }) => {
    new GridRowsMasonry(canvasElement.firstChild as HTMLElement);
  },
};

export const Example2: StoryObj = {
  render: () => example2Html,
  play: async ({ canvasElement }) => {
    new GridRowsMasonry(canvasElement.firstChild as HTMLElement);
  },
};
