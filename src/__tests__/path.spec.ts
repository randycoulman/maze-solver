import { last } from "ramda";

import * as Cell from "../cell";
import * as Path from "../path";

describe("path", () => {
  describe("when in progress", () => {
    let cells: Array<Cell.Type> | null = null;
    let path: Path.Type | null = null;

    beforeEach(() => {
      cells = [
        Cell.make(1, 2, Cell.Contents.Start),
        Cell.make(2, 2, Cell.Contents.Hall),
        Cell.make(2, 3, Cell.Contents.Hall),
      ];

      path = Path.make(...cells!);
    });

    it("treats its last cell as current", () => {
      const cell = Path.currentCell(path!);

      expect(cell).toBe(last(cells!));
    });

    it("has visited a cell it already contains", () => {
      const cell = cells![1];

      expect(Path.hasVisited(cell, path!)).toBe(true);
    });

    it("has not visited a cell it doesn't contain", () => {
      const cell = Cell.make(5, 6, Cell.Contents.Hall);

      expect(Path.hasVisited(cell, path!)).toBe(false);
    });

    it("is not complete", () => {
      expect(Path.isComplete(path!)).toBe(false);
    });

    it("counts steps between cells", () => {
      expect(Path.stepCount(path!)).toBe(path!.length - 1);
    });

    it("knows the locations of its visited cells", () => {
      const locations = Path.locations(path!);

      expect(locations).toEqual([[1, 2], [2, 2], [2, 3]]);
    });

    it("can be extended by visiting another cell", () => {
      const newCell = Cell.make(2, 4, Cell.Contents.End);
      const extended = Path.visit(newCell, path!);

      expect(Path.currentCell(extended)).toBe(newCell);
      expect(extended).not.toBe(path!);
    });
  });

  describe("when at the end", () => {
    it("is complete", () => {
      const cells = [
        Cell.make(1, 2, Cell.Contents.Start),
        Cell.make(2, 2, Cell.Contents.Hall),
        Cell.make(2, 3, Cell.Contents.Hall),
        Cell.make(2, 4, Cell.Contents.End),
      ];

      const path = Path.make(...cells!);

      expect(Path.isComplete(path)).toBe(true);
    });
  });

  describe("when empty", () => {
    it("is not complete", () => {
      const path = Path.make();

      expect(Path.isComplete(path)).toBe(false);
    });

    it("has no steps", () => {
      const path = Path.make();

      expect(Path.stepCount(path)).toBe(0);
    });
  });
});
