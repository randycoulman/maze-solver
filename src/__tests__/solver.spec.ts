import * as Maze from "../maze";
import * as Solver from "../solver";

describe("solver", () => {
  it("can't solve a degenerate maze", () => {
    const maze = Maze.parse(`
      #####
      #A#B#
      #####
    `);

    expect(Solver.solution(maze)).toEqual([]);
  });

  it("solves a simple maze", () => {
    const maze = Maze.parse(`
      ####
      #AB#
      ####
    `);

    expect(Solver.solution(maze)).toEqual([[1, 1], [2, 1]]);
  });
});
