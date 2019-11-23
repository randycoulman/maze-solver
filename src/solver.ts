import { concat, head, isEmpty, pipe, tail, __ } from "ramda";
import * as Maze from "./maze";
import * as Path from "./path";

export const solution = (maze: Maze.Type): Path.Type => {
  const startingCell = Maze.startingCell(maze);
  let paths = [Path.make(startingCell)];

  while (!isEmpty(paths)) {
    const path = head(paths);

    if (Path.isComplete(path)) return path;

    paths = pipe(
      tail,
      concat(__, Path.successors(maze, path))
    )(paths);
  }

  return [];
};

export const isSolvable = pipe(
  solution,
  Path.isComplete
);

export const steps = pipe(
  solution,
  Path.stepCount
);
