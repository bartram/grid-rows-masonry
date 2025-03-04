import { GridRowsMasonry } from "../../src/react";
import type { GridRowsMasonryStoryArgs } from "../GridRowsMasonry.stories";
import classes from "./BlockExample.module.css";

export const BlockExample = (props: GridRowsMasonryStoryArgs) => {
  const { disabled, ...style } = props;
  return (
    <GridRowsMasonry
      className={classes.root}
      disabled={disabled}
      style={{ ...style }}
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
    </GridRowsMasonry>
  );
};
