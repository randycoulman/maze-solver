import { curry, isEmpty, map, path, pipe, reject, split, trim } from "ramda";

import * as CellContents from "./cellContents";

type Row = Array<CellContents.Type>;
type Maze = Array<Row>;

export type Coordinate = [number, number];

const parseRow = (row: string): Row =>
  pipe(
    trim,
    split(""),
    map(CellContents.parse)
  )(row);

export const parse = (description: string): Maze =>
  pipe(
    split("\n"),
    map(parseRow),
    reject(isEmpty)
  )(description);

export const cellAt = curry((x: number, y: number, maze: Maze):
  | CellContents.Type
  | undefined => path([y, x], maze));

export const neighbors = curry(
  (x: number, y: number, _maze: Maze): Array<Coordinate> => [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
);

export const startingCell = (maze: Maze): Coordinate => {
  let x: number | undefined;
  const y = maze.findIndex(row => {
    x = row.findIndex(cell => cell === CellContents.Type.Start);
    return x !== -1;
  });

  if (x === -1 || y === -1)
    throw new Error("Invalid maze! No starting cell found.");

  return [x!, y];
};

export type Type = Maze;
