import { Point } from '.';
import { TCell } from './Cell';

const GenerateSudoku = (): TCell[][] => {
	const sudoku: TCell[][] = [];

	//#region sudoku init
	for (let i = 0; i < 9; i++) {
		sudoku[i] = [];
		for (let j = 1; j < 10; j++) sudoku[i].push(j as TCell);
	}

	sudoku[0].sort(() => Math.random() - 0.5);
	sudoku[1] = sudoku[0].slice(3, 9).concat(sudoku[0].slice(0, 3));
	sudoku[2] = sudoku[0].slice(6, 9).concat(sudoku[0].slice(0, 6));

	sudoku[3] = sudoku[0].slice(1, 9).concat(sudoku[0].slice(0, 1));
	sudoku[4] = sudoku[3].slice(3, 9).concat(sudoku[3].slice(0, 3));
	sudoku[5] = sudoku[3].slice(6, 9).concat(sudoku[3].slice(0, 6));

	sudoku[6] = sudoku[3].slice(1, 9).concat(sudoku[3].slice(0, 1));
	sudoku[7] = sudoku[6].slice(3, 9).concat(sudoku[6].slice(0, 3));
	sudoku[8] = sudoku[6].slice(6, 9).concat(sudoku[6].slice(0, 6));
	//#endregion

	//#region function to random shift vertical elements
	const randomShiftV = (v: number, randomPoss: number[]): TCell[] => {
		const arr: TCell[] = [];
		for (let j = 0; j < 9; j += 3)
			for (let i = 0; i < 3; i++) arr.push(sudoku[v][j + randomPoss[i]]);
		return arr;
	};

	for (let i = 0; i < 3; i++) {
		const randomPossV: number[] = [0, 1, 2].sort(() => Math.random() - 0.5);
		for (let j = 0; j < 9; j += 3)
			sudoku[i + j] = randomShiftV(i + j, randomPossV);
	}
	//#endregion

	//#region function to random replace shift elements
	const randomShiftH = (v: number, randomPoss: number[]): TCell[] => {
		const arr: TCell[] = [];
		for (let i = 0; i < 3; i++) {
			const position = randomPoss[i] * 3;
			arr.push(...sudoku[v].slice(position, position + 3));
		}
		return arr;
	};

	for (let i = 0; i < 9; i += 3) {
		const randomPossH: number[] = [0, 1, 2].sort(() => Math.random() - 0.5);
		for (let j = 0; j < 3; j++)
			sudoku[i + j] = randomShiftH(i + j, randomPossH);
	}
	//#endregion

	return sudoku;
};

export const Generate = (): {
	cells: TCell[][];
	answers: { cells: TCell[][]; primary: Point[] };
} => {
	const primaryAnswers: Point[] = [];
	const cellsAnswers = GenerateSudoku();
	const cells: TCell[][] = [];
	for (let i = 0; i < 9; i++) cells[i] = Array(9).fill(null);

	const countElemntsForGet = (((Math.random() * 100) % 81) + 5) / 3;
	for (let i = 0; i < countElemntsForGet; i++) {
		const [v, h] = [
			Math.floor((Math.random() * 10) % 9),
			Math.floor((Math.random() * 10) % 9),
		];
		primaryAnswers.push({ v, h });
		cells[v][h] = cellsAnswers[v][h];
	}

	return { cells, answers: { cells: cellsAnswers, primary: primaryAnswers } };
};
