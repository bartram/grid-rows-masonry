# Grid Rows Masonry

## Overview

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Grid Rows Masonry** is a ponyfill for the [CSS masonry layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout), designed for [browsers that don’t yet support it](https://caniuse.com/mdn-css_properties_grid-template-rows_masonry). It simulates the effect of `grid-template-rows: masonry;` by reordering child elements and applying negative top margins, ensuring each item neatly aligns under the one above it while preserving the grid’s row gap.

## Installation

Install via npm:

```sh
npm install grid-rows-masonry
```

## Usage

1. Define a grid container with multiple columns:

```html
<div id="my-grid" style="display: grid; grid-template-columns: repeat(3, 1fr);">
  ...
</div>
```

2. Import the module and initialize it:

```javascript
import { Masonry } from "grid-rows-masonry";

const el = document.getElementById("my-grid");
const masonry = new Masonry(el);
```

3. To reset the layout, call the destroy() method:

```javascript
masonry.destroy();
```

## Usage with React

To use the Masonry React component exported from `grid-rows-masonry/react`:

1. Import the component:

```javascript
import { Masonry } from "grid-rows-masonry/react";
```

2. Use the component in your React application, ensuring to set the `display: grid` style:

```javascript
const MyGrid = () => {
  return (
    <Masonry style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      ...
    </Masonry>
  );
};
```

This component will automatically handle the masonry layout for its children.

## Example

Grid layout with the **Grid Rows Masonry** ponyfill applied.

![A masonry layout of ten images of mid-century modern furniture](https://github.com/bartram/grid-rows-masonry/raw/main/assets/demo-after.png)
