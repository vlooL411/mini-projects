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
	for (let i = 0; i < cells.length; i++)
		for (let j = 0; j < cells[i].length; j++) {
			let neighbors = 0;
			operations.forEach(([x, y]) => {
				const newI = i + x;
				const newJ = j + y;
				if (
					newI >= 0 &&
					newI < cells.length &&
					newJ >= 0 &&
					newJ < cells[i].length
				)
					neighbors += cs[newI][newJ];
			});

			if (neighbors < 2 || neighbors > 3) cs[i][j] = 0;
			else if (cs[i][j] == 0 && neighbors === 3) cs[i][j] = 1;
		}

	setCells(cs);
};

export default simulation;
