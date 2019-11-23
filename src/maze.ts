import {
  curry,
  find,
  flatten,
  isEmpty,
  isNil,
  pipe,
  propEq,
  reject,
  split,
  trim,
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

export const startingCell = (maze: Maze): Cell.Type => {
  const cell = find(Cell.isStart, maze);

  if (isNil(cell)) {
    throw new Error("Invalid maze! No starting cell found.");
  }

  return cell;
};

export type Type = Maze;
