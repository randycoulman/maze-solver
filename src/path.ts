import {
  F,
  append,
  dec,
  includes,
  ifElse,
  isNil,
  last,
  length,
  map,
  max,
  pipe,
  pluck,
  reject,
} from "ramda";
import * as Cell from "./cell";
import * as Maze from "./maze";

type Path = Array<Cell.Type>;

export const make = (...cells: Array<Cell.Type>): Path => cells;

export const currentCell = last;

export const hasVisited = includes;

export const isComplete = pipe(
  currentCell,
  ifElse(isNil, F, Cell.isEnd)
);

export const locations = pluck("location");

export const stepCount: (path: Path) => number = pipe(
  length,
  dec,
  max(0 as number)
);

export const successors = (maze: Maze.Type, path: Path): Array<Path> =>
  pipe(
    currentCell,
    (cell: Cell.Type): Array<Cell.Type> =>
      Cell.traversableNeighbors(maze, cell),
    reject(neighbor => hasVisited(neighbor, path)),
    map(neighbor => visit(neighbor, path))
  )(path);

export const visit = append;

export type Type = Path;
