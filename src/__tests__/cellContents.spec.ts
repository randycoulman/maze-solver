import * as CellContents from "../cellContents";

import Contents = CellContents.Type;

describe("cell contents", () => {
  describe("parsing", () => {
    test("recognizes walls", () => {
      expect(CellContents.parse("#")).toBe(Contents.Wall);
    });

    test("recognizes halls", () => {
      expect(CellContents.parse(" ")).toBe(Contents.Hall);
    });

    test("recognizes the starting cell", () => {
      expect(CellContents.parse("A")).toBe(Contents.Start);
    });

    test("recognizes the ending cell", () => {
      expect(CellContents.parse("B")).toBe(Contents.End);
    });

    test("raises an error for unrecognized tokens", () => {
      expect(() => CellContents.parse("X")).toThrow(/Invalid/);
    });
  });
});
