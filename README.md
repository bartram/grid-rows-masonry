# Grid Rows Masonry

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A ponyfill for `grid-template-rows: masonry;`. When used with a DOM element that uses a grid layout with columns, this will apply negative top margin to each element in a column so that it appears neatly tucked under the element in the same column in the row above, simulating the behavior of the (not-widely-supported) [`masonry`](https://caniuse.com/mdn-css_properties_grid-template-rows_masonry) CSS value.

## Usage

Import the module into your code, and pass a DOM element to the `GridRowsMasonry` constructor.

```
const el = document.body.getElementById("my-grid");
const masonry = new GridRowsMasonry(el);
```

Each GridRowsMasonry instance has a `destory()` method which can be used to reset the layout to its default.

To use the module with React:

```
const ref = useRef<Element>(null);
useEffect(() => {
    if (ref.current) {
        const masonry = new GridRowsMasonry(ref.current);
        return () => masonry.destroy();
    }
}, []);
```
