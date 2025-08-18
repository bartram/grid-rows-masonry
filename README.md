# Grid Rows Masonry

_Use `grid-template-rows: masonry` today._

[![npm version](https://img.shields.io/npm/v/grid-rows-masonry)](https://www.npmjs.com/package/grid-rows-masonry)
[![npm downloads](https://img.shields.io/npm/dw/grid-rows-masonry)](https://www.npmjs.com/package/grid-rows-masonry)
[![License: ISC](https://img.shields.io/badge/license-ISC-informational)](./LICENSE)
![Tests](https://img.shields.io/github/actions/workflow/status/bartram/grid-rows-masonry/pr-check.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub stars](https://img.shields.io/github/stars/bartram/grid-rows-masonry?style=social)](https://github.com/bartram/grid-rows-masonry/stargazers)

`Grid Rows Masonry` is a **ponyfill** for the [CSS masonry layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout), to bring the feature to [browsers that don’t yet support it](https://caniuse.com/mdn-css_properties_grid-template-rows_masonry). It reflows items using a lightweight algorithm that respects your CSS Grid columns and gaps without absolute positioning and without changing the order of elements in the DOM.

---

## Why this over legacy “masonry” libs?

- **Future-forward:** mirrors the emerging CSS masonry model; easy to retire when native support lands.
- **Tiny & dependency-free:** zero deps, fast to initialize.
- **Works anywhere:** vanilla JS or React.

---

## Quick start

### 1) Install

#### npm

```bash
npm install grid-rows-masonry
```

#### pnpm

```bash
pnpm add grid-rows-masonry
```

#### yarn

```bash
yarn add grid-rows-masonry
```

### 2) Usage

#### Vanilla JS

```html
<div
  id="my-grid"
  style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: masonry; gap: 20px"
>
  <!-- your variable-height items -->
</div>

<script type="module">
  import { Masonry } from "grid-rows-masonry";

  const el = document.getElementById("my-grid");
  const masonry = new Masonry(el);

  // later, if you need to remove all modifications:
  // masonry.destroy();
</script>
```

#### React

```tsx
import { Masonry } from "grid-rows-masonry/react";

export default function Gallery() {
  return (
    <Masonry
      style={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "masonry",
      }}
    >
      {/* children with variable heights */}
    </Masonry>
  );
}
```

---

## Comparison

| Package                                             | Type                          | Key Features                                                                                                                | Differentiators                                                                                   |
| --------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Grid Rows Masonry**                               | Ponyfill (vanilla + React)    | Simulates `grid-template-rows: masonry`; zero dependencies; lightweight; works with CSS Grid.                               | Future-forward CSS Grid approach; minimal overhead; no reliance on virtualization or CSS flexbox. |
| **masonry-layout**                                  | Vanilla JS library (Desandro) | Classic masonry layout; long-established; works with containers, item selectors. ([npm][1], [GitHub][2])                    | Mature and popular, but heavyweight and reliance on manual initializations.                       |
| **react-layout-masonry**                            | React component               | Flexible & customizable; no dependencies; modern React-friendly API. ([npm][3])                                             | Built for React, but less focus on CSS Grid polyfill approach.                                    |
| **masonic**                                         | React virtualized component   | Virtualized rendering; high performance with large lists; hooks/utils exposed; supports TypeScript. ([npm][4], [GitHub][5]) | Best for massive item sets—adds complexity, dependencies, and virtualization.                     |
| **react-responsive-masonry**                        | React, CSS Flexbox            | Responsive columns and gutter breakpoints; lightweight and CSS-driven. ([npm][6])                                           | Pure flexbox; good for responsiveness but deviates from Grid spec and lacks ponyfill behavior.    |
| **react-masonry**                                   | React component               | Simple layout stacking by measuring and positioning elements; minimal React dependency. ([npm][7])                          | Straightforward but lacks modern CSS features or Grid integration.                                |
| **CSS Grid masonry polyfill** (`@prof-dev/masonry`) | Vanilla JS polyfill           | Detects browser support for `grid-template-rows: masonry`, falls back to simulation; CSS Grid-based. ([GitHub][8])          | Similar concept, but does not reorder items.                                                      |
| **react-plock**                                     | React component               | Ultra tiny (<1 kB gzipped), balanced layout, responsive, tree-shakeable. ([GitHub][9])                                      | Extremely lightweight and performance-oriented, but focuses on React only.                        |

[1]: https://www.npmjs.com/package/masonry-layout?utm_source=chatgpt.com "masonry-layout"
[2]: https://github.com/desandro/masonry "desandro/masonry: :love_hotel: Cascading grid layout plugin"
[3]: https://www.npmjs.com/package/react-layout-masonry?utm_source=chatgpt.com "react-layout-masonry"
[4]: https://www.npmjs.com/package/masonic "masonic"
[5]: https://github.com/jaredLunde/masonic "jaredLunde/masonic: 🧱 High-performance masonry layouts ..."
[6]: https://www.npmjs.com/package/react-responsive-masonry "react-responsive-masonry"
[7]: https://www.npmjs.com/package/react-masonry "react-masonry"
[8]: https://github.com/Profesor08/masonry "Profesor08/masonry: This library helps to make masonry grid layout using css grid"
[9]: https://github.com/askides/react-plock "askides/react-plock: The 1kB Masonry Grid for React."

---

## Live demos

- [**Vanilla CodeSandbox**](https://codesandbox.io/p/sandbox/5qhrq7)
- [**React CodeSandbox**](https://codesandbox.io/p/sandbox/grid-rows-masonry-react-example-r3sjf8)

---

## API

### `new Masonry(root: HTMLElement)`

Initializes the ponyfill on a Grid container (`display: grid`) with 2+ columns.

**Methods**

- `destroy(): void` — restores original DOM order / margins.

---

## Best practices

- Define **columns & gaps in CSS**; the ponyfill only computes vertical placement.
- No need to reinitialize when content changes–the library responds to mutations of the grid element, and updates the layout.

---

## Used by

Are you using `grid-rows-masonry`? Open a PR to add your logo/link here!

> Dependents list: <https://github.com/bartram/grid-rows-masonry/network/dependents>

---

## FAQ

**Does this change DOM order?**  
No. It uses `grid-column-start` to change the column placement of elements to ensure the best fit, but DOM elements are never added or removed.

**Will it conflict with native masonry later?**  
No. When native `grid-template-rows: masonry` is supported by the user's browser, it will feature-detect and skip initialization.

---

## Contributing

Issues and PRs welcome!

---

## License

ISC © Bartram Nason
