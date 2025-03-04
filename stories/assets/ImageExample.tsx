import { Masonry } from "../../src/react";
import type { MasonryStoryArgs } from "../Masonry.stories";
import classes from "./ImageExample.module.css";

export const ImageExample = (props: MasonryStoryArgs) => {
  const { disabled, ...style } = props;
  return (
    <Masonry className={classes.root} disabled={disabled} style={{ ...style }}>
      <img src="./images/armchair.jpeg" />
      <img src="./images/coffee-table.jpeg" />
      <img src="./images/planter.jpeg" />
      <img src="./images/credenza.jpeg" />
      <img src="./images/bed.jpeg" />
      <img src="./images/dining-table.jpeg" />
      <img src="./images/sofa.jpeg" />
      <img src="./images/side-table.jpeg" />
      <img src="./images/lamp.jpeg" />
      <img src="./images/desk.jpeg" />
      <img src="./images/ottoman.jpeg" />
    </Masonry>
  );
};
