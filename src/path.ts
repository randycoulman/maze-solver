import {
  F,
  append,
  dec,
  includes,
  ifElse,
  isNil,
  last,
  length,
  max,
  pipe,
  pluck,
} from "ramda";
import * as Cell from "./cell";

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

export const visit = append;

export type Type = Path;
