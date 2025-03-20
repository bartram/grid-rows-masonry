import { render, screen } from "@testing-library/react";
import { Masonry } from "./Masonry";
import { test } from "vitest";

test("should accept JSX.Elements as children", () => {
  render(
    <Masonry style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <div>Column 1</div>
      <div>Column 2</div>
      <div>Column 3</div>
    </Masonry>,
  );
  expect(screen.getByText("Column 1")).toBeInTheDocument();
  expect(screen.getByText("Column 2")).toBeInTheDocument();
  expect(screen.getByText("Column 3")).toBeInTheDocument();
});
