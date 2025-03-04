import { GridRowsMasonry as Class } from "../index";
import {
  ComponentProps,
  createElement,
  ElementType,
  useEffect,
  useRef,
} from "react";

type MasonryProps<C extends ElementType = "div"> = {
  component?: C;
} & ComponentProps<C>;

export const GridRowsMasonry = (props: MasonryProps) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const masonry = new Class(ref.current);
      return () => masonry.destroy();
    }
  }, []);

  const { component = "div" } = props;
  return createElement(component, { ...props, ref });
};
