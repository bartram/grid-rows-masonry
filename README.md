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
import { GridRowsMasonry } from "grid-rows-masonry";

const el = document.getElementById("my-grid");
const masonry = new GridRowsMasonry(el);
```

3. To reset the layout, call the destroy() method:

```javascript
masonry.destroy();
```

To use the module with React:

```javascript
import { useEffect, useRef } from "react";
import { GridRowsMasonry } from "grid-rows-masonry";

const MyMasonryGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const masonry = new GridRowsMasonry(ref.current);
      return () => masonry.destroy();
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
    >
      ...
    </div>
  );
};
```

## Example

### Before

Grid layout without the **Grid Rows Masonry** ponyfill applied.

![A grid of ten images of mid-century modern furniture without the masonry layout applied.](https://github.com/bartram/grid-rows-masonry/raw/main/assets/demo-before.png)

### After

Grid layout with the **Grid Rows Masonry** ponyfill applied.

![A masonry layout of ten images of mid-century modern furniture](https://github.com/bartram/grid-rows-masonry/raw/main/assets/demo-after.png)
