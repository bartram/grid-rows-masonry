export class Masonry {
  grid: HTMLElement;
  resizeObserver: ResizeObserver;
  mutationObserver: MutationObserver;
  lastUpdateTimestamp: DOMHighResTimeStamp = 0;

  constructor(grid: HTMLElement) {
    this.grid = grid;
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(this.updateLayout);
    });
    this.mutationObserver = new MutationObserver((records) => {
      requestAnimationFrame(this.updateLayout);
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
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
  };

  private clearStyles = () => {
    this.getChildren().forEach((child) => {
      child.style.marginTop = "";
      child.style.gridColumnStart = "";
    });
  };

  private updateLayout = (timestamp: DOMHighResTimeStamp) => {
    if (timestamp === this.lastUpdateTimestamp) {
      // Skip update if update already ran in this animation frame
      return;
    }
    this.lastUpdateTimestamp = timestamp;
    this.clearStyles();
    const gridStyle = window.getComputedStyle(this.grid);

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

    const parentPaddingTop = parseFloat(gridStyle.paddingTop) || 0;
    const parentTop = this.grid.getBoundingClientRect().top + parentPaddingTop;

    const numColumns = gridStyle.gridTemplateColumns.split(" ").length;
    if (numColumns <= 1) {
      // no need for masonry if there's only one column
      return;
    }
    const rowGap = parseFloat(gridStyle.rowGap) || 0;
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
      row.forEach((child) => {
        // include the row gap for all but the first row
        const gap = rowIndex > 0 ? rowGap : 0;

        // find the index of the column with the smallest height
        const targetColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights),
        );

        // reorder the columns before setting the margin
        child.style.gridColumnStart = `${targetColumnIndex + 1}`;

        // calculate the diff for this child element from the bounding rect of the parent
        const { top: childTop, height: childHeight } =
          child.getBoundingClientRect();
        const childStyle = window.getComputedStyle(child);
        const childMarginTop = parseFloat(childStyle.marginTop) || 0;
        const childMarginBottom = parseFloat(childStyle.marginBottom) || 0;

        // Find the difference between the child's top and the parent's top
        const offsetTop = childTop - childMarginTop - parentTop;
        // Set the child's top margin to the difference between the current column height and
        // the child's offset, plus the child's inherit top margin and the row gap
        const marginTop =
          columnHeights[targetColumnIndex] - offsetTop + childMarginTop + gap;
        // Round the margin to the nearest pixel to avoid unnecessary layout thrashing
        // @todo this could be optimized to round to a multiple of the screen's pixel ratio
        child.style.marginTop = `${Math.round(marginTop)}px`;

        // Add the height of this child element, its margin, and the row gap to the column height
        columnHeights[targetColumnIndex] +=
          childMarginTop + childHeight + childMarginBottom + gap;
      });
    });
  };

  destroy() {
    this.clearStyles();
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
  }
}

export const GridRowsMasonry = Masonry;
