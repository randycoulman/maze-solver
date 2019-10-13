import * as Maze from "../maze";

const { CellType } = Maze;

describe("maze", () => {
  describe("indexing", () => {
    const MAZE = `
    #####
    #A B#
    #####
    `;

    let maze: Maze.Type | null = null;

    beforeEach(() => {
      maze = Maze.parse(MAZE);
    });

    it("has walls", () => {
      const cell = Maze.cellAt(0, 0, maze!);

      expect(cell).toBe(CellType.Wall);
    });

    it("has halls", () => {
      const cell = Maze.cellAt(2, 1, maze!);

      expect(cell).toBe(CellType.Hall);
    });

    it("has a start point", () => {
      const cell = Maze.cellAt(1, 1, maze!);

      expect(cell).toBe(CellType.Start);
    });

    it("has an end point", () => {
      const cell = Maze.cellAt(3, 1, maze!);

      expect(cell).toBe(CellType.End);
    });

    it("returns undefined for off-grid cell indexes", () => {
      expect(Maze.cellAt(-1, -1, maze!)).toBeUndefined();
      expect(Maze.cellAt(2, 3, maze!)).toBeUndefined();
      expect(Maze.cellAt(5, 1, maze!)).toBeUndefined();
    });
  });
});
