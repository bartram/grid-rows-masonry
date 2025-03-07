import type { Meta, StoryContext, StoryObj } from "@storybook/react";
import { BlockExample } from "./assets/BlockExample";
import { ImageExample } from "./assets/ImageExample";
import { ChildMarginExample } from "./assets/ChildMarginExample";
import { CSSProperties } from "react";

export type MasonryStoryArgs = {
  disabled?: boolean;
  position?: "absolute" | "relative" | "static";
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<MasonryStoryArgs> = {
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
      const grid = canvasElement.firstChild as HTMLElement;
      grid.style.display = "flex";
      grid.style.flexDirection = "column";
    });
  },
};

export const AddChild: StoryObj = {
  name: "Add child",
  render: BlockExample,
  play: async ({ canvasElement }: StoryContext) => {
    setTimeout(() => {
      const grid = canvasElement.firstChild as HTMLElement;
      const child = document.createElement("div");
      child.style.height = "100px";
      child.style.backgroundColor = "blue";
      grid.appendChild(child);
    });
  },
};

export const RemoveChild: StoryObj = {
  name: "Remove child",
  render: BlockExample,
  play: async ({ canvasElement }: StoryContext) => {
    setTimeout(() => {
      const grid = canvasElement.firstChild as HTMLElement;
      const child = grid.childNodes[3] as HTMLElement;
      grid.removeChild(child);
    });
  },
};

export const ResizeChild: StoryObj = {
  name: "Resize child",
  render: BlockExample,
  play: async ({ canvasElement }: StoryContext) => {
    setTimeout(() => {
      const grid = canvasElement.firstChild as HTMLElement;
      const child = grid.childNodes[2] as HTMLElement;
      // child is initially 40px, resize to 120px
      child.style.height = "120px";
    });
  },
};

export const ChildMargin: StoryObj = {
  name: "Child with margin",
  render: ChildMarginExample,
};
