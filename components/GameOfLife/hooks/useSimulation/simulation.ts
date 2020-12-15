import { ZEROONE } from '../../lib';

type Operation = -1 | ZEROONE;

const operations: [Operation, Operation][] = [
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
];

const simulation = (
	cells: ZEROONE[][],
	setCells: (cs: ZEROONE[][]) => void,
	state: { skip?: boolean },
): void => {
	if (state.skip) return;

	const cs = [...cells];
	cs.forEach((currentCells, i) =>
		currentCells.forEach((cell, j) => {
			let neighbors = 0;
			operations.forEach(([x, y]) => {
				const [newI, newJ] = [i + x, j + y];
				if (
					newI >= 0 &&
					newI < cs.length &&
					newJ >= 0 &&
					newJ < currentCells.length
				)
					neighbors += cs[newI][newJ];
			});

			if (neighbors < 2 || neighbors > 3) currentCells[j] = 0;
			else if (cell == 0 && neighbors === 3) currentCells[j] = 1;
		}),
	);

	setCells(cs);
};

export default simulation;
