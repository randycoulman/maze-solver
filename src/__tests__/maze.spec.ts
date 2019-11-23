import { pluck } from "ramda";

import * as Cell from "../cell";
import * as Maze from "../maze";

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
      const cell = Maze.cellAt([0, 0], maze!);

      expect(Cell.isWall(cell)).toBe(true);
    });

    it("has halls", () => {
      const cell = Maze.cellAt([2, 1], maze!);

      expect(Cell.isHall(cell)).toBe(true);
    });

    it("has a start point", () => {
      const cell = Maze.cellAt([1, 1], maze!);

      expect(Cell.isStart(cell)).toBe(true);
    });

    it("has an end point", () => {
      const cell = Maze.cellAt([3, 1], maze!);

      expect(Cell.isEnd(cell)).toBe(true);
    });

    it("knows its start point", () => {
      const start = Maze.startingCell(maze!);
      const expected = Maze.cellAt([1, 1], maze!);

      expect(start).toEqual(expected);
    });

    it("finds neighbors of a cell", () => {
      const cell = Maze.cellAt([2, 1], maze!);
      const neighbors = Maze.neighbors(cell!, maze!);

      expect(pluck("location", neighbors)).toEqual([
        [1, 1],
        [3, 1],
        [2, 0],
        [2, 2],
      ]);
    });

    it("returns undefined for off-grid cell indexes", () => {
      expect(Maze.cellAt([-1, -1], maze!)).toBeUndefined();
      expect(Maze.cellAt([2, 3], maze!)).toBeUndefined();
      expect(Maze.cellAt([5, 1], maze!)).toBeUndefined();
    });
  });
});
