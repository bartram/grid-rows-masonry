import { HTMLAttributes } from "react";
import { Masonry } from "../../src/react";
import type { MasonryStoryArgs } from "../Masonry.stories";
import classes from "./BlockExample.module.css";

export const BlockExample = (
  props: MasonryStoryArgs & HTMLAttributes<HTMLDivElement>,
) => {
  const { disabled, position, gridTemplateColumns, style } = props;
  return (
    <Masonry
      className={classes.root}
      disabled={disabled}
      style={{ position, gridTemplateColumns, ...style }}
    >
      <div style={{ height: 100, backgroundColor: "red" }} />
      <div style={{ height: 220, backgroundColor: "green" }} />
      <div style={{ height: 40, backgroundColor: "blue" }} />
      <div style={{ height: 380, backgroundColor: "yellow" }} />
      <div style={{ height: 90, backgroundColor: "orange" }} />
      <div style={{ height: 65, backgroundColor: "purple" }} />
      <div style={{ height: 400, backgroundColor: "pink" }} />
      <div style={{ height: 120, backgroundColor: "cyan" }} />
      <div style={{ height: 150, backgroundColor: "magenta" }} />
    </Masonry>
  );
};
