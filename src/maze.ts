import { isEmpty, map, path, pipe, reject, split, trim } from "ramda";

import * as CellContents from "./cellContents";

type Row = CellContents.Type[];
type Maze = Row[];

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

export const isSolvable = (_maze: Maze): boolean => true;

export const steps = (_maze: Maze): number => 0;

export const cellAt = (
  x: number,
  y: number,
  maze: Maze
): CellContents.Type | undefined => path([y, x], maze);

export type Type = Maze;
