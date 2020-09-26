import { Point } from ".";
import { TCell } from "./Cell";

const GenerateSudoku = (): TCell[][] => {
  const sudoku: TCell[][] = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, (_, j) => (j + 1) as TCell)
  );

  sudoku[0].sort(() => Math.random() - 0.5);
  sudoku[1] = sudoku[0].slice(3, 9).concat(sudoku[0].slice(0, 3));
  sudoku[2] = sudoku[0].slice(6, 9).concat(sudoku[0].slice(0, 6));

  sudoku[3] = sudoku[0].slice(1, 9).concat(sudoku[0].slice(0, 1));
  sudoku[4] = sudoku[3].slice(3, 9).concat(sudoku[3].slice(0, 3));
  sudoku[5] = sudoku[3].slice(6, 9).concat(sudoku[3].slice(0, 6));

  sudoku[6] = sudoku[3].slice(1, 9).concat(sudoku[3].slice(0, 1));
  sudoku[7] = sudoku[6].slice(3, 9).concat(sudoku[6].slice(0, 3));
  sudoku[8] = sudoku[6].slice(6, 9).concat(sudoku[6].slice(0, 6));

  //function to random replace vertical elements
  const randomElsV = (v: number, randomPoss: number[]): TCell[] => {
    let arr: TCell[] = [];
    for (let j = 0; j < 9; j += 3) {
      arr.push(sudoku[v][j + randomPoss[0]]);
      arr.push(sudoku[v][j + randomPoss[1]]);
      arr.push(sudoku[v][j + randomPoss[2]]);
    }
    return arr;
  };
  //function to random replace horizontal elements
  const randomElsH = (v: number, randomPoss: number[]): TCell[] => {
    let arr: TCell[] = [];
    arr.push(...sudoku[v].slice(randomPoss[0] * 3, randomPoss[0] * 3 + 3));
    arr.push(...sudoku[v].slice(randomPoss[1] * 3, randomPoss[1] * 3 + 3));
    arr.push(...sudoku[v].slice(randomPoss[2] * 3, randomPoss[2] * 3 + 3));
    return arr;
  };

  for (let i = 0; i < 3; i++) {
    const randomPossV: number[] = [0, 1, 2].sort(() => Math.random() - 0.5);
    sudoku[i] = randomElsV(i, randomPossV);
    sudoku[i + 3] = randomElsV(i + 3, randomPossV);
    sudoku[i + 6] = randomElsV(i + 6, randomPossV);
  }
  for (let i = 0; i < 9; i += 3) {
    const randomPossH: number[] = [0, 1, 2].sort(() => Math.random() - 0.5);
    sudoku[i] = randomElsH(i, randomPossH);
    sudoku[i + 1] = randomElsH(i + 1, randomPossH);
    sudoku[i + 2] = randomElsH(i + 2, randomPossH);
  }

  return sudoku;
};

export const Generate = (): {
  cells: TCell[][];
  answers: TCell[][];
  primaryAnswers: Point[];
} => {
  const primaryAnswers: Point[] = [];
  const answers = GenerateSudoku();
  const cells: TCell[][] = Array.from({ length: 9 }, (_) =>
    Array(9).fill(null)
  );

  const countElemntsForGet = (((Math.random() * 100) % 81) + 5) / 3;
  for (let i = 0; i < countElemntsForGet; i++) {
    const [v, h] = [
      Math.floor((Math.random() * 10) % 9),
      Math.floor((Math.random() * 10) % 9),
    ];
    primaryAnswers.push({ v, h });
    cells[v][h] = answers[v][h];
  }

  return { cells, answers, primaryAnswers };
};
