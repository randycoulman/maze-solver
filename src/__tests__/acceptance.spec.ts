import * as Maze from "../maze";
import * as Solver from "../solver";

describe("acceptance test", () => {
  const MAZE1 = `
  #####################################
  # #   #     #A        #     #       #
  # # # # # # ####### # ### # ####### #
  # # #   # #         #     # #       #
  # ##### # ################# # #######
  #     # #       #   #     # #   #   #
  ##### ##### ### ### # ### # # # # # #
  #   #     #   # #   #  B# # # #   # #
  # # ##### ##### # # ### # # ####### #
  # #     # #   # # #   # # # #       #
  # ### ### # # # # ##### # # # ##### #
  #   #       #   #       #     #     #
  #####################################
  `;
  //  Maze 1 should SUCCEED

  const MAZE2 = `
  #####################################
  # #       #             #     #     #
  # ### ### # ########### ### # ##### #
  # #   # #   #   #   #   #   #       #
  # # ###A##### # # # # ### ###########
  #   #   #     #   # # #   #         #
  ####### # ### ####### # ### ####### #
  #       # #   #       # #       #   #
  # ####### # # # ####### # ##### # # #
  #       # # # #   #       #   # # # #
  # ##### # # ##### ######### # ### # #
  #     #   #                 #     #B#
  #####################################
  `;
  // Maze 2 should SUCCEED

  const MAZE3 = `
  #####################################
  # #   #           #                 #
  # ### # ####### # # # ############# #
  #   #   #     # #   # #     #     # #
  ### ##### ### ####### # ##### ### # #
  # #       # #  A  #   #       #   # #
  # ######### ##### # ####### ### ### #
  #               ###       # # # #   #
  # ### ### ####### ####### # # # # ###
  # # # #   #     #B#   #   # # #   # #
  # # # ##### ### # # # # ### # ##### #
  #   #         #     #   #           #
  #####################################
  `;
  // Maze 3 should FAIL

  test("good mazes", () => {
    const maze1 = Maze.parse(MAZE1);
    const maze2 = Maze.parse(MAZE2);

    expect(Solver.isSolvable(maze1)).toBe(true);
    expect(Solver.isSolvable(maze2)).toBe(true);
  });

  test("bad mazes", () => {
    const maze3 = Maze.parse(MAZE3);

    expect(Solver.isSolvable(maze3)).toBe(false);
  });

  test("maze steps", () => {
    const maze1 = Maze.parse(MAZE1);
    const maze2 = Maze.parse(MAZE2);
    const maze3 = Maze.parse(MAZE3);

    expect(Solver.steps(maze1)).toBe(44);
    expect(Solver.steps(maze2)).toBe(75);
    expect(Solver.steps(maze3)).toBe(0);
  });
});
