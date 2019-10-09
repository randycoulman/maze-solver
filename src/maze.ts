interface Maze {
  name?: string;
}

export const parse = (_description: string): Maze => ({});

export const isSolvable = (_maze: Maze): boolean => true;

export const steps = (_maze: Maze): number => 0;

export type Type = Maze;
