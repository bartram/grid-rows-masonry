import { Masonry as MasonryClass } from "../masonry";
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
      const masonry = new MasonryClass(ref.current);
      return () => masonry.destroy();
    }
  }, [disabled]);

  return createElement(component, { ...props, ref });
};
