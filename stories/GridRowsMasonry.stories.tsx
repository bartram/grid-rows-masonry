import type { Meta, StoryContext, StoryObj } from "@storybook/react";

import { BlockExample } from "./assets/BlockExample";
import { ImageExample } from "./assets/ImageExample";
import { CSSProperties } from "react";

export type GridRowsMasonryStoryArgs = {
  disabled?: boolean;
  position?: "absolute" | "relative" | "static";
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<GridRowsMasonryStoryArgs> = {
  title: "Grid Rows Masonry",
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      name: "Disabled",
      type: "boolean",
      control: "boolean",
    },
    position: {
      name: "Position",
      type: "string",
      control: "select",
      options: ["static", "absolute", "relative"],
    },
    gridTemplateColumns: {
      name: "Columns template",
      type: "string",
    },
  },
};

export default meta;

export const Demo: StoryObj = {
  name: "Demo with even columns",
  render: ImageExample,
};

export const DemoUneven: StoryObj = {
  name: "Demo with uneven columns",
  render: ImageExample,
  args: {
    gridTemplateColumns: "1fr 2.1fr 0.6fr",
  },
};

export const Example: StoryObj = {
  name: "Example with three columns",
  render: BlockExample,
};

export const RelativePosition: StoryObj = {
  name: "Example with `position: relative;`",
  render: BlockExample,
  args: {
    position: "relative",
  },
};

export const ChangeDisplay: StoryObj = {
  name: "Display change example",
  render: BlockExample,
  play: async ({ canvasElement }: StoryContext) => {
    setTimeout(() => {
      (canvasElement.firstChild as HTMLElement).style.display = "flex";
      (canvasElement.firstChild as HTMLElement).style.flexDirection = "column";
    });
  },
};
