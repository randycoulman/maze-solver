import * as Maze from "../maze";
import * as Path from "../path";
import * as Solver from "../solver";

describe("solver", () => {
  it("can't solve a degenerate maze", () => {
    const maze = Maze.parse(`
      #####
      #A#B#
      #####
    `);

    const solution = Solver.solution(maze);

    expect(Path.locations(solution)).toEqual([]);
  });

  it("solves a single-step maze", () => {
    const maze = Maze.parse(`
      ####
      #AB#
      ####
    `);
    const solution = Solver.solution(maze);

    expect(Path.locations(solution)).toEqual([[1, 1], [2, 1]]);
  });

  it("solves a simple multi-step maze", () => {
    const maze = Maze.parse(`
      #####
      #A B#
      #####
    `);

    const solution = Solver.solution(maze);

    expect(Path.locations(solution)).toEqual([[1, 1], [2, 1], [3, 1]]);
  });

  it("finds the shortest path", () => {
    const maze = Maze.parse(`
      ######
      #    #
      # ## #
      # AB #
      ######
    `);

    const solution = Solver.solution(maze);

    expect(Path.locations(solution)).toEqual([[2, 3], [3, 3]]);
  });
});
