export class GridRowsMasonry {
  grid: HTMLElement;
  children: HTMLElement[];

  constructor(grid: HTMLElement) {
    this.grid = grid;
    this.children = Array.from(grid.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
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
        // include the row gap for all but the first row
        const gap = rowIndex > 0 ? rowGap : 0;
        const offset = columnHeights[columnIndex] - child.offsetTop + gap;
        child.style.marginTop = `${offset}px`;
        columnHeights[columnIndex] += child.offsetHeight + gap;
      });
    });
  };

  destroy() {
    this.clearStyles();
    window.removeEventListener("resize", this.handleResize);
  }
}
