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
});
