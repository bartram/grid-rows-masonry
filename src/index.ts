type Options = {
  reorder: boolean;
};

const defaultOptions: Options = {
  reorder: true,
};

export class GridRowsMasonry {
  grid: HTMLElement;
  children: HTMLElement[];
  observer: ResizeObserver;
  options: Options;

  constructor(grid: HTMLElement, options: Partial<Options> = {}) {
    this.grid = grid;
    this.children = Array.from(grid.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    this.options = { ...defaultOptions, ...options };

    this.observer = new ResizeObserver(this.handleResize);
    this.observer.observe(this.grid);
  }

  private clearStyles = () => {
    this.children.forEach((child) => {
      child.style.marginTop = "";
    });
  };

  private handleResize = () => {
    this.clearStyles();
    const gridStyle = window.getComputedStyle(this.grid);
    if (gridStyle.gridTemplateRows === "masonry") {
      // `masonry` is already supported, so no need for the ponyfill
      return;
    }
    const numColumns = gridStyle.gridTemplateColumns.split(" ").length;
    if (numColumns <= 1) {
      // no need for masonry if there's only one column
      return;
    }
    const rowGap = parseFloat(gridStyle.rowGap);
    const rows: HTMLElement[][] = [];
    const columnHeights: number[] = new Array(numColumns).fill(0);
    this.children
      .filter((child) => !!child.offsetParent)
      .forEach((child, index) => {
        const rowIndex = Math.floor(index / numColumns);
        rows[rowIndex] ??= [];
        rows[rowIndex].push(child);
      });
    rows.forEach((row, rowIndex) => {
      row.forEach((child, columnIndex) => {
        let targetColumnIndex = columnIndex;

        // find the index of the column with the smallest height
        if (this.options.reorder) {
          targetColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        }

        // include the row gap for all but the first row
        const gap = rowIndex > 0 ? rowGap : 0;
        const offset = columnHeights[targetColumnIndex] - child.offsetTop + gap;
        child.style.marginTop = `${offset}px`;
        child.style.gridColumnStart = `${targetColumnIndex + 1}`;
        columnHeights[targetColumnIndex] += child.offsetHeight + gap;
      });
    });
  };

  destroy() {
    this.clearStyles();
    this.observer.disconnect();
  }
}
