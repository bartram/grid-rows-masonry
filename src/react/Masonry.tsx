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
  disabled?: boolean;
} & ComponentProps<C>;

export const Masonry = (props: MasonryProps) => {
  const { component = "div", disabled = false } = props;
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && !disabled) {
      const masonry = new Class(ref.current);
      return () => masonry.destroy();
    }
  }, [disabled]);

  return createElement(component, { ...props, ref });
};
