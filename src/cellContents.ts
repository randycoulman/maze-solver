import { find, keys, pipe } from "ramda";

enum CellContents {
  End = "B",
  Hall = " ",
  Wall = "#",
  Start = "A",
}

export const parse = (token: string): CellContents => {
  type Key = keyof typeof CellContents;
  const key = pipe(
    keys,
    find(k => CellContents[k as Key] === token)
  )(CellContents);

  if (!key) throw new Error(`Invalid cell token: ${token}`);

  return CellContents[key as Key];
};

export import Type = CellContents;
