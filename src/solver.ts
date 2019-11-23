import {
  both,
  complement,
  concat,
  filter,
  head,
  isEmpty,
  map,
  pipe,
  tail,
  __,
} from "ramda";
import * as Cell from "./cell";
import * as Maze from "./maze";
import * as Path from "./path";

export const solution = (maze: Maze.Type): Path.Type => {
  const startingCell = Maze.startingCell(maze);
  let paths = [Path.make(startingCell)];

  while (!isEmpty(paths)) {
    const path = head(paths);

    if (Path.isComplete(path)) return path;

    const alreadyVisited = (cell: Cell.Type): boolean =>
      Path.hasVisited(cell, path);

    const cell = Path.currentCell(path);
    const neighbors = pipe(
      Maze.neighbors(cell),
      filter(both(Cell.isTraversable, complement(alreadyVisited)))
    )(maze);

    const nextPaths = map(n => Path.visit(n, path), neighbors);

    paths = pipe(
      tail,
      concat(__, nextPaths)
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
