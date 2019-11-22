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
  isNil,
  last,
  length,
  map,
  max,
  pipe,
  tail,
  __,
} from "ramda";

import * as CellContents from "./cellContents";
import * as Maze from "./maze";

type Path = Array<Maze.Coordinate>;

export const solution = (maze: Maze.Type): Path => {
  const canVisit = ([x, y]: Maze.Coordinate): boolean => {
    const cell = Maze.cellAt(x, y, maze);

    if (isNil(cell) || cell == CellContents.Type.Wall) return false;

    return true;
  };

  let paths = [[Maze.startingCell(maze)]];

  while (!isEmpty(paths)) {
    const path = head(paths);
    const [x, y] = last(path);

    if (Maze.cellAt(x, y, maze) === CellContents.Type.End) {
      return path;
    }

    const alreadyVisited = (location: Maze.Coordinate): boolean =>
      includes(location, path);

    const neighbors = pipe(
      Maze.neighbors(x, y),
      filter(both(canVisit, complement(alreadyVisited)))
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
