import * as Cell from "../cell";

describe("cell contents", () => {
  describe("creation", () => {
    test("knows its position and contents", () => {
      const cell = Cell.make(1, 5, Cell.Contents.Wall);

      expect(Cell.isWall(cell)).toBe(true);
      expect(cell.location).toEqual([1, 5]);
    });
  });

  describe("parsing", () => {
    it("recognizes walls", () => {
      const cell = Cell.parse(1, 2, "#");

      expect(Cell.isWall(cell)).toBe(true);
    });

    it("recognizes halls", () => {
      const cell = Cell.parse(1, 2, " ");

      expect(Cell.isHall(cell)).toBe(true);
    });

    it("recognizes the starting cell", () => {
      const cell = Cell.parse(1, 2, "A");

      expect(Cell.isStart(cell)).toBe(true);
    });

    it("recognizes the ending cell", () => {
      const cell = Cell.parse(1, 2, "B");

      expect(Cell.isEnd(cell)).toBe(true);
    });

    it("raises an error for unrecognized tokens", () => {
      expect(() => Cell.parse(1, 2, "X")).toThrow(/Invalid/);
    });
  });

  describe("traversability", () => {
    test("missing cells are not traversable", () => {
      expect(Cell.isTraversable(null)).toBe(false);
    });

    test("walls are not traversable", () => {
      const cell = Cell.make(1, 3, Cell.Contents.Wall);

      expect(Cell.isTraversable(cell)).toBe(false);
    });

    test("halls are traversable", () => {
      const cell = Cell.make(1, 3, Cell.Contents.Hall);

      expect(Cell.isTraversable(cell)).toBe(true);
    });

    test("the starting cell is traversable", () => {
      const cell = Cell.make(1, 3, Cell.Contents.Start);

      expect(Cell.isTraversable(cell)).toBe(true);
    });

    test("the ending cell is traversable", () => {
      const cell = Cell.make(1, 3, Cell.Contents.End);

      expect(Cell.isTraversable(cell)).toBe(true);
    });
  });
});
