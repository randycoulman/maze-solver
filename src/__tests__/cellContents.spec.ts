import * as CellContents from "../cellContents";

import Contents = CellContents.Type;

describe("cell contents", () => {
  describe("parsing", () => {
    it("recognizes walls", () => {
      expect(CellContents.parse("#")).toBe(Contents.Wall);
    });

    it("recognizes halls", () => {
      expect(CellContents.parse(" ")).toBe(Contents.Hall);
    });

    it("recognizes the starting cell", () => {
      expect(CellContents.parse("A")).toBe(Contents.Start);
    });

    it("recognizes the ending cell", () => {
      expect(CellContents.parse("B")).toBe(Contents.End);
    });

    it("raises an error for unrecognized tokens", () => {
      expect(() => CellContents.parse("X")).toThrow(/Invalid/);
    });
  });
});
