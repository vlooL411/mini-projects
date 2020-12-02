import fill from './fill';

export type ZEROONE = 0 | 1;

const rand = (): ZEROONE => (Math.round(Math.random() * 10) % 2) as ZEROONE;

export default class Generate {
	static zero = (h: number, w: number): ZEROONE[][] =>
		fill<ZEROONE>(h, w, cs => cs.push(0));

	static random = (h: number, w: number): ZEROONE[][] =>
		fill<ZEROONE>(h, w, cs => cs.push(rand()));

	static toZero = (cells: ZEROONE[][]): ZEROONE[][] => {
		cells.forEach(cs => cs.forEach((_, j) => (cs[j] = 0)));
		return cells;
	};

	static toRandom = (cells: ZEROONE[][]): ZEROONE[][] => {
		cells.forEach(cs => cs.forEach((_, j) => (cs[j] = rand())));
		return cells;
	};
}
