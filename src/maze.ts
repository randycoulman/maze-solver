import {
  curry,
  equals,
  find,
  flatten,
  isEmpty,
  isNil,
  map,
  pipe,
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

export const cellAt = curry((x: number, y: number, maze: Maze):
  | Cell.Type
  | undefined => find(cell => equals(cell.location, [x, y]), maze));

export const neighbors = curry(
  (cell: Cell.Type, maze: Maze): Array<Cell.Type> => {
    const [x, y] = cell.location;
    const neighborLocations = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    const neighbors = map(([x, y]) => cellAt(x, y, maze), neighborLocations);

    return reject(isNil, neighbors) as Array<Cell.Type>;
  }
);

export const startingCell = (maze: Maze): Cell.Type => {
  const cell = find(Cell.isStart, maze);

  if (isNil(cell)) {
    throw new Error("Invalid maze! No starting cell found.");
  }

  return cell;
};

export type Type = Maze;
