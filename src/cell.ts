import { complement, either, find, isNil, keys, pipe, propEq } from "ramda";

export enum Contents {
  End = "B",
  Hall = " ",
  Wall = "#",
  Start = "A",
}

export type Location = [number, number];

interface Cell {
  contents: Contents;
  location: Location;
}

export const make = (x: number, y: number, contents: Contents): Cell => ({
  contents,
  location: [x, y],
});

export const parse = (x: number, y: number, token: string): Cell => {
  type Key = keyof typeof Contents;
  const key = pipe(
    keys,
    find(k => Contents[k as Key] === token)
  )(Contents);

  if (!key) throw new Error(`Invalid cell token: ${token}`);

  return make(x, y, Contents[key as Key]);
};

const contains = propEq("contents");

export const isEnd = contains(Contents.End);
export const isHall = contains(Contents.Hall);
export const isStart = contains(Contents.Start);
export const isWall = contains(Contents.Wall);

export const isTraversable = complement(either(isNil, isWall));

export const neighborLocations = (cell: Cell): Array<Location> => {
  const [x, y] = cell.location;

  return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
};

export type Type = Cell;
