import { find, keys, pipe, propEq } from "ramda";

enum Contents {
  End = "B",
  Hall = " ",
  Wall = "#",
  Start = "A",
}

interface Cell {
  contents: Contents;
}

export const make = (contents: Contents): Cell => ({
  contents,
});

export const parse = (token: string): Cell => {
  type Key = keyof typeof Contents;
  const key = pipe(
    keys,
    find(k => Contents[k as Key] === token)
  )(Contents);

  if (!key) throw new Error(`Invalid cell token: ${token}`);

  return make(Contents[key as Key]);
};

const contains = propEq("contents");

export const isEnd = contains(Contents.End);
export const isHall = contains(Contents.Hall);
export const isStart = contains(Contents.Start);
export const isWall = contains(Contents.Wall);

export type Type = Cell;
