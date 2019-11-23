import {
  append,
  both,
  complement,
  concat,
  dec,
  filter,
  head,
  includes,
  isEmpty,
  last,
  length,
  map,
  max,
  pipe,
  tail,
  __,
} from "ramda";

import * as Cell from "./cell";
import * as Maze from "./maze";

type Path = Array<Cell.Type>;

export const solution = (maze: Maze.Type): Path => {
  let paths = [[Maze.startingCell(maze)]];

  while (!isEmpty(paths)) {
    const path = head(paths);
    const cell = last(path);

    if (Cell.isEnd(cell)) return path;

    const alreadyVisited = (cell: Cell.Type): boolean => includes(cell, path);

    const neighbors = pipe(
      Maze.neighbors(cell),
      filter(both(Cell.isTraversable, complement(alreadyVisited)))
    )(maze);

    const nextPaths = map(n => append(n, path), neighbors);

    paths = pipe(
      tail,
      concat(__, nextPaths)
    )(paths);
  }

  return [];
};

export const isSolvable = pipe(
  solution,
  complement(isEmpty)
);

export const steps = pipe(
  solution,
  length,
  dec,
  max(0 as number)
);
