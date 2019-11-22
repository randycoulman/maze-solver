import * as Cell from "../cell";

describe("cell contents", () => {
  describe("parsing", () => {
    it("recognizes walls", () => {
      const cell = Cell.parse("#");

      expect(Cell.isWall(cell)).toBe(true);
    });

    it("recognizes halls", () => {
      const cell = Cell.parse(" ");

      expect(Cell.isHall(cell)).toBe(true);
    });

    it("recognizes the starting cell", () => {
      const cell = Cell.parse("A");

      expect(Cell.isStart(cell)).toBe(true);
    });

    it("recognizes the ending cell", () => {
      const cell = Cell.parse("B");

      expect(Cell.isEnd(cell)).toBe(true);
    });

    it("raises an error for unrecognized tokens", () => {
      expect(() => Cell.parse("X")).toThrow(/Invalid/);
    });
  });

  describe("traversability", () => {
    test("missing cells are not traversable", () => {
      expect(Cell.isTraversable(null)).toBe(false);
    });

    test("walls are not traversable", () => {
      const cell = Cell.make(Cell.Contents.Wall);

      expect(Cell.isTraversable(cell)).toBe(false);
    });

    test("halls are traversable", () => {
      const cell = Cell.make(Cell.Contents.Hall);

      expect(Cell.isTraversable(cell)).toBe(true);
    });

    test("the starting cell is traversable", () => {
      const cell = Cell.make(Cell.Contents.Start);

      expect(Cell.isTraversable(cell)).toBe(true);
    });

    test("the ending cell is traversable", () => {
      const cell = Cell.make(Cell.Contents.End);

      expect(Cell.isTraversable(cell)).toBe(true);
    });
  });
});
