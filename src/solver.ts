import { complement, find, isEmpty, length, pipe } from "ramda";

import * as CellContents from "./cellContents";
import * as Maze from "./maze";

export const solution = (maze: Maze.Type): Array<Maze.Coordinate> => {
  const [xStart, yStart] = Maze.startingCell(maze);
  const finish = pipe(
    Maze.neighbors(xStart, yStart),
    find(([x, y]) => Maze.cellAt(x, y, maze) === CellContents.Type.End)
  )(maze);

  return finish ? [[xStart, yStart], finish] : [];
};

export const isSolvable = pipe(
  solution,
  complement(isEmpty)
);

export const steps = pipe(
  solution,
  length
);
