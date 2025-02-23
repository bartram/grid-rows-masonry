import type { Meta, StoryObj } from "@storybook/html";

import demoHtml from "./assets/demo.html?raw";
import exampleHtml from "./assets/example.html?raw";
import { GridRowsMasonry } from "../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Grid Rows Masonry",
  tags: ["autodocs"],
  render: (args) => {
    const element = document.createElement("div");
    element.innerHTML = args.content;
    const masonryLayout = element.querySelector<HTMLElement>(".masonry-layout");
    if (masonryLayout) {
      if (args.columns) {
        masonryLayout.style.gridTemplateColumns = args.columns;
      }
      if (args.enabled) {
        new GridRowsMasonry(masonryLayout as HTMLElement);
      }
    }
    return element;
  },
  args: {
    content: exampleHtml,
    enabled: true,
  },
  argTypes: {
    content: {
      type: "string",
      table: {
        disable: true,
      },
    },
    enabled: {
      name: "Enabled",
      type: "boolean",
      control: "boolean",
    },
    position: {
      name: "Position",
      type: "string",
      control: "select",
      options: ["static", "absolute", "relative"],
    },
    columns: {
      name: "Columns template",
      type: "string",
    },
  },
};

export default meta;

export const Demo: StoryObj = {
  name: "Demo with even columns",
  args: {
    content: demoHtml,
  },
};

export const DemoUneven: StoryObj = {
  name: "Demo with uneven columns",
  args: {
    content: demoHtml,
    columns: "1fr 2.1fr 0.6fr",
  },
};

export const Example: StoryObj = {
  name: "Example with three columns",
};

export const RelativePosition: StoryObj = {
  name: "Example with `position: relative;`",
  args: {
    position: "relative",
  },
};

export const AbsolutePosition: StoryObj = {
  name: "Example with `position: absolute;`",
  args: {
    position: "absolute",
  },
};

export const ChangeDisplay: StoryObj = {
  name: "Display change example",
  play: async ({ canvasElement }) => {
    setTimeout(() => {
      const masonryLayout =
        canvasElement.querySelector<HTMLElement>(".masonry-layout");
      if (masonryLayout) {
        masonryLayout.style.display = "flex";
        masonryLayout.style.flexDirection = "column";
      }
    }, 200);
  },
};
