export enum CellType {
  End = "B",
  Hall = " ",
  Wall = "#",
  Start = "A",
}

type Maze = CellType[][];

const parseCellType = (s: string): CellType => {
  type CellTypeKey = keyof typeof CellType;
  const key = Object.keys(CellType).find(k => CellType[k as CellTypeKey] === s);

  if (!key) throw new Error(`Invalid cell symbol: ${s}`);

  return CellType[key as CellTypeKey];
};

export const parse = (description: string): Maze =>
  description
    .split("\n")
    .map(s => s.trim())
    .filter(s => s !== "")
    .map(s => s.split("").map(s => parseCellType(s)));

export const isSolvable = (_maze: Maze): boolean => true;

export const steps = (_maze: Maze): number => 0;

export const cellAt = (
  x: number,
  y: number,
  maze: Maze
): CellType | undefined => maze[y] && maze[y][x];

export type Type = Maze;
