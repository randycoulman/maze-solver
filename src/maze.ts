import {
  curry,
  find,
  flatten,
  isEmpty,
  isNil,
  map,
  pipe,
  propEq,
  reject,
  split,
  trim,
  __,
} from "ramda";

import * as Cell from "./cell";

type Row = Array<Cell.Type>;
type Maze = Array<Cell.Type>;

const parseRow = (y: number, row: string): Row => {
  const tokens = pipe(
    trim,
    split("")
  )(row);

  return tokens.map((token, x) => Cell.parse(x, y, token));
};

export const parse = (description: string): Maze => {
  const tokenRows = pipe(
    split("\n"),
    reject(isEmpty)
  )(description);
  const rows = tokenRows.map((row, y) => parseRow(y, row));

  return flatten(rows);
};

export const cellAt = curry((location: Cell.Location, maze: Maze):
  | Cell.Type
  | undefined => find(propEq("location", location), maze));

export const neighbors = curry(
  (cell: Cell.Type, maze: Maze): Array<Cell.Type> =>
    pipe(
      Cell.neighborLocations,
      map(cellAt(__, maze)),
      reject(isNil)
    )(cell) as Array<Cell.Type>
);

export const startingCell = (maze: Maze): Cell.Type => {
  const cell = find(Cell.isStart, maze);

  if (isNil(cell)) {
    throw new Error("Invalid maze! No starting cell found.");
  }

  return cell;
};

export type Type = Maze;
