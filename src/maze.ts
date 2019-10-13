import * as CellContents from "./cellContents";

type Maze = CellContents.Type[][];

export const parse = (description: string): Maze =>
  description
    .split("\n")
    .map(s => s.trim())
    .filter(s => s !== "")
    .map(s => s.split("").map(s => CellContents.parse(s)));

export const isSolvable = (_maze: Maze): boolean => true;

export const steps = (_maze: Maze): number => 0;

export const cellAt = (
  x: number,
  y: number,
  maze: Maze
): CellContents.Type | undefined => maze[y] && maze[y][x];

export type Type = Maze;
