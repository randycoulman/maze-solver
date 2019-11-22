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

  it("solves a single-step maze", () => {
    const maze = Maze.parse(`
      ####
      #AB#
      ####
    `);

    expect(Solver.solution(maze)).toEqual([[1, 1], [2, 1]]);
  });

  it("solves a simple multi-step maze", () => {
    const maze = Maze.parse(`
      #####
      #A B#
      #####
    `);

    expect(Solver.solution(maze)).toEqual([[1, 1], [2, 1], [3, 1]]);
  });

  it("finds the shortest path", () => {
    const maze = Maze.parse(`
      ######
      #    #
      # ## #
      # AB #
      ######
    `);

    expect(Solver.solution(maze)).toEqual([[2, 3], [3, 3]]);
  });
});
