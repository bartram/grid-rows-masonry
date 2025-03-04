export class GridRowsMasonry {
  grid: HTMLElement;
  resizeObserver: ResizeObserver;
  mutationObserver: MutationObserver;

  constructor(grid: HTMLElement) {
    this.grid = grid;
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLayout();
    });
    this.mutationObserver = new MutationObserver((records) => {
      this.updateLayout();
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          this.resizeObserver.observe(node as HTMLElement);
        });
      });
    });

    this.resizeObserver.observe(this.grid);
    this.getChildren().forEach((child) => {
      this.resizeObserver.observe(child);
    });
    this.mutationObserver.observe(this.grid, {
      childList: true,
    });
  }

  private getChildren = () => {
    return Array.from(this.grid.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
  };

  private clearStyles = () => {
    this.getChildren().forEach((child) => {
      child.style.marginTop = "";
      child.style.gridColumnStart = "";
    });
  };

  private updateLayout = () => {
    this.clearStyles();
    const gridStyle = window.getComputedStyle(this.grid);
    const parentTop = this.grid.getBoundingClientRect().top;

    if (gridStyle.display !== "grid") {
      // display is not grid, so no need for masonry
      console.warn("Display must be grid for masonry layout to work");
      return;
    }
    if (gridStyle.gridTemplateRows === "masonry") {
      // `masonry` is already supported, so no need for the ponyfill
      console.warn("Masonry layout is already supported natively");
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

    this.getChildren()
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

        // find the index of the column with the smallest height
        let targetColumnIndex = columnIndex;
        targetColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

        // reorder the columns before setting the margin
        child.style.gridColumnStart = `${targetColumnIndex + 1}`;

        // calculate the diff for this child element from the bounding rect of the parent
        const childTop = child.getBoundingClientRect().top;
        const offsetTop = childTop - parentTop;

        const marginTop = columnHeights[targetColumnIndex] - offsetTop + gap;
        child.style.marginTop = `${marginTop}px`;

        // add the height of this child element to the column height
        columnHeights[targetColumnIndex] += child.offsetHeight + gap;
      });
    });
  };

  destroy() {
    this.clearStyles();
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
  }
}
