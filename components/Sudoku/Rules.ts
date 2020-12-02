import { Point } from '.';
import { TCell } from './Cell';

export default class Rules {
	//danger
	static isDanger = (i: number, j: number, cells: TCell[][]): boolean => {
		//cell null, don't required check
		if (!cells[i][j]) return false;
		//check rules
		return (
			Rules.Square(i, j, cells) ||
			Rules.Vertical(i, j, cells) ||
			Rules.Horizontal(i, j, cells)
		);
		//false => element set till without danger
	};

	//light vertical
	static isLightV = (i: number, j: number, { v, h }: Point): boolean => {
		const [ii, jj, vv, hh] = [i, j, v, h].map(el => el % 3);
		return ii == vv && jj == hh;
	};

	//light Horizontal
	static isLightH = (i: number, j: number, { v, h }: Point): boolean => {
		const [ii, jj, vv, hh] = [i, j, v, h].map(el => Math.floor(el / 3));
		return jj == hh && ii == vv;
	};

	//ligh vertical || gorizontal
	static isLight = (i: number, j: number, point: Point): boolean =>
		Rules.isLightV(i, j, point) || Rules.isLightH(i, j, point);

	//check final game
	static Win = (cells: TCell[][], answerCells: TCell[][]): boolean =>
		cells.some((cs, i) => cs.some((cell, j) => cell != answerCells[i][j]));

	//in the square
	static Square = (i: number, j: number, cells: TCell[][]): boolean => {
		let elemsInSquad = 0;
		for (let h = 0; h < cells.length; h++)
			if (cells[i][j] == cells[i][h] && ++elemsInSquad > 1) return true;

		return false;
	};

	//on the vertical
	static Vertical = (i: number, j: number, cells: TCell[][]): boolean => {
		let elemsInV = 0;
		for (let v = i % 3; v < cells.length; v += 3)
			for (let h = j % 3; h < cells.length; h += 3)
				if (cells[i][j] == cells[v][h] && ++elemsInV > 1) return true;

		return false;
	};

	//on the horizontal
	static Horizontal = (i: number, j: number, cells: TCell[][]): boolean => {
		let elemsInH = 0;
		const [ii, jj] = [i, j].map(el => Math.floor(el / 3) * 3 + 3);

		for (let v = ii; v < ii; v++)
			for (let h = jj; h < jj; h++)
				if (cells[i][j] == cells[v][h] && ++elemsInH > 1) return true;

		return false;
	};
}
