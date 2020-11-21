export type ZEROONE = 0 | 1;

export function fill<T>(
  h: number,
  w: number,
  Fill: (cs: T[], i: number, j: number) => void
) {
  const cells = [];
  for (let i = 0; i < h; i++) {
    cells[i] = [];
    for (let j = 0; j < w; j++) Fill(cells[i], i, j);
  }
  return cells;
}

export const extend = (
  cells: ZEROONE[][],
  h: number,
  w: number
): ZEROONE[][] => {
  const { length } = cells;
  if (length > h) cells.splice(h, length);
  else if (length < h) for (let i = length; i < h; i++) cells[i] = [];

  for (let i = 0; i < h; i++) {
    const { length } = cells[i];

    if (length > w) cells[i].splice(w, length);
    else if (length < w) for (let j = length; j < w; j++) cells[i].push(0);
  }
  return cells;
};

export const generate = (h: number, w: number): ZEROONE[][] =>
  fill<ZEROONE>(h, w, (cs) => cs.push(0));

export const cellsToEmpty = (cells: ZEROONE[][]): ZEROONE[][] => {
  cells.forEach((cs) => cs.forEach((_, j) => (cs[j] = 0)));
  return cells;
};

const rand = (): ZEROONE => (Math.round(Math.random() * 10) % 2) as ZEROONE;

export const random = (h: number, w: number): ZEROONE[][] =>
  fill<ZEROONE>(h, w, (cs) => cs.push(rand()));

export const cellsToRandom = (cells: ZEROONE[][]): ZEROONE[][] => {
  cells.forEach((cs) => cs.forEach((_, j) => (cs[j] = rand())));
  return cells;
};
